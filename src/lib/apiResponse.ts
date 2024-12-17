import { NextApiResponse } from "next";

export interface ApiResponse {
    status: string;
    requestId: string;
    data?: Record<string, any>;
    message: string;
}

export function sendApiResponse(
    res: NextApiResponse,
    status: 'success' | 'error',
    message: string,
    data?: Record<string, any>,
    code?: number,
) {
    return res.status(code || 200).json({ status, message, data });
}