import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch('https://api.vatacars.com/data/network');
        const data = await response.json();

        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching from the external API:', error);
        res.status(500).json({ error: 'Error fetching data from the external API' });
    }
};

export default handler;