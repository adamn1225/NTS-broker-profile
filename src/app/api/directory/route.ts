import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface Dimensions {
    Length: string;
    Width: string;
    Height: string;
}

interface Excavator {
    "Manufacturer/Model": string;
    Weight: string;
    dimensions: Dimensions;
    manufacturer: string;
    model: string;
    slug: string;
}

export async function GET(req: NextRequest) {
    try {
        const jsonFilePath = path.join(process.cwd(), 'public', 'organized_equipmentdata.json');
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        const data: { "equipment-data": Excavator[] } = JSON.parse(jsonData);

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error reading or parsing JSON file:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}