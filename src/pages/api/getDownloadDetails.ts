import { sendApiResponse } from '@lib/apiResponse';
import { NextApiRequest, NextApiResponse } from 'next';

async function fetchReleases() {
    const url = 'https://api.github.com/repos/vatACARS/hub/releases';

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_PAT}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`GitHub API error: ${response.status} - ${response.statusText}. Response: ${errorText}`);
    }

    const data = await response.json();

    return data.map((release: any) => ({
        id: release.id,
        tagName: release.tag_name,
        name: release.name,
        body: release.body,
        createdAt: release.created_at,
        publishedAt: release.published_at,
        draft: release.draft,
        prerelease: release.prerelease,
        url: release.html_url,
    }));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const releases = await fetchReleases();
        return sendApiResponse(res, "success", "", { releases });
    } catch (error) {
        return sendApiResponse(res, "error", "Internal Server Error", {}, 500);
    }
}