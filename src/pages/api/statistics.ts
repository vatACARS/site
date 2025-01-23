import { NextApiRequest, NextApiResponse } from 'next';

import { withRatelimitMiddleware } from '@lib/ratelimitMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const connected = await fetch('https://api.vatacars.com/data/connected').then(res => res.json());
    const stations = await fetch('https://api.vatacars.com/data/stations').then(res => res.json());
    const messages = await fetch('https://api.vatacars.com/data/messages').then(res => res.json());

    return res.status(200).json({ connected, stations, messages });
}

export default withRatelimitMiddleware(handler);