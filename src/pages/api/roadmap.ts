import { NextApiRequest, NextApiResponse } from 'next';

async function fetchAllItems() {
  let allItems = [];
  let hasNextPage = true;
  let cursor = null;

  while (hasNextPage) {
    const query = `
          query ($cursor: String) {
            organization(login: "vatACARS") {
              projectV2(number: 1) {
                items(first: 100, after: $cursor, orderBy: {field: POSITION, direction: ASC}) {
                  nodes {
                    id
                    content {
                      ... on Issue {
                        title
                        body
                        url
                        number
                        createdAt
                        labels(first: 10) {
                          nodes {
                            name
                          }
                        }
                      }
                    }
                    fieldValues(first: 8) {
                      nodes {
                        ... on ProjectV2ItemFieldSingleSelectValue {
                          name
                          field {
                            ... on ProjectV2SingleSelectField {
                              name
                            }
                          }
                        }
                        ... on ProjectV2ItemFieldTextValue {
                          text
                          field {
                            ... on ProjectV2Field {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                }
              }
            }
          }
        `;

    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables: { cursor }
      }),
    });

    const data = await response.json();

    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    const items = data.data.organization.projectV2.items;
    allItems = [...allItems, ...items.nodes];
    hasNextPage = items.pageInfo.hasNextPage;
    cursor = items.pageInfo.endCursor;
  }

  return allItems;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const allItems = (await fetchAllItems())
      .filter(item => item.content)
      .map(item => {
        const fields: { [key: string]: string } = {};

        item.fieldValues.nodes.forEach(node => {
          if (node.field?.name) {
            const fieldName = node.field.name.toLowerCase();
            fields[fieldName] = node.text || node.name || '';
          }
        });

        const labels = item.content?.labels?.nodes?.map(label => label.name) || [];

        return {
          id: item.id,
          title: item.content?.title || fields.title || '',
          description: item.content?.body || fields.description || '',
          status: fields.status || 'Not Started',
          labels,
          issueNumber: item.content?.number,
          createdAt: item.content?.createdAt,
          url: item.content?.url || `https://github.com/orgs/vatACARS/projects/1`
        };
      })
      .filter(item => item.title && item.status && item.labels.some(label => ['show on site'].includes(label)))
      .sort((a, b) => {
        const statusOrder = {
          'To Do': 0,
          'In Progress': 1,
          'Testing': 2,
          'Ready': 3,
          'Done': 4
        };
        return statusOrder[a.status] - statusOrder[b.status];
      });

    return res.status(200).json({ items: allItems });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch project data' });
  }
}