import { NextApiRequest, NextApiResponse } from 'next';

import { withRatelimitMiddleware } from '@lib/ratelimitMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const stations = await fetch('http://localhost:3000/data/stations').then(res => res.json());
    const messages = await fetch('http://localhost:3000/data/messages').then(res => res.json());

    return res.status(200).json({ stations, messages });
}

export default withRatelimitMiddleware(handler);