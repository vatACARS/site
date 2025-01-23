import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const filePath = path.join(process.cwd(), 'public/data', 'airports.csv');

const csvData = fs.readFileSync(filePath, 'utf-8');

const parsedData = Papa.parse(csvData, {
    header: true,
    dynamicTyping: true,
});

const filteredData = parsedData.data.filter((a: any) => {
    return typeof a.ident === 'string' && a.iso_country === "AU";
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        res.status(200).json(filteredData);
    } catch (error) {
        res.status(500).json({ error: 'Failed to load CSV data' });
    }
};