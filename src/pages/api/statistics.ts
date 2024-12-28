import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const stations = await fetch('http://localhost:3000/data/stations').then(res => res.json());
    const messages = await fetch('http://localhost:3000/data/messages').then(res => res.json());

    return res.status(200).json({ stations, messages });
}