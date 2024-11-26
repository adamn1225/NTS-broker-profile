import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Dimensions {
    Length: string;
    Width: string | string[];
    Height: string;
}

interface Excavator {
    "Manufacturer/Model": string;
    Weight: string;
    dimensions: Dimensions;
    [key: string]: any; // Allow for additional properties
}

export async function GET(req: NextRequest) {
    try {
        const jsonFilePath = path.join(process.cwd(), 'public', 'equipmentdata.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const data: { "vera-equipment-data": Excavator[] } = JSON.parse(jsonData);

        // Parse the data to separate manufacturers and models
        const parsedData = data["vera-equipment-data"].reduce((acc, item) => {
            const parts = item["Manufacturer/Model"].split(' ');
            const model = parts.pop();
            const manufacturer = parts.join(' ');

            if (!acc[manufacturer]) {
                acc[manufacturer] = [];
            }

            acc[manufacturer].push({ ...item, model });
            return acc;
        }, {} as Record<string, Excavator[]>);

        return NextResponse.json(parsedData);
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}