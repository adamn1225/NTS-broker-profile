import { notFound } from 'next/navigation';
import { Equipment } from '../../../types';
import Head from 'next/head';
import fs from 'fs/promises';
import path from 'path';
import RequestQuoteFormClient from '@components/RequestQuoteFormClient';

interface Props {
    params: Promise<{ slug: string }>;
}

const EquipmentPage = async ({ params }: Props) => {
    const { slug } = await params;

    // Read the data from the local file
    const jsonFilePath = path.join(process.cwd(), 'public', 'organized_equipmentdata.json');
    const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
    const data = JSON.parse(jsonData)["equipment-data"];

    if (!data) {
        console.error('Data is undefined or null');
        notFound();
    }

    // Find the equipment by slug
    const equipment = data.find((item: Equipment & { slug: string }) => item.slug === slug);

    if (!equipment) {
        console.error(`Equipment not found for slug: ${slug}`);
        notFound();
    }

    return (
        <div className='h-full'>
            <Head>
                <title>{equipment.manufacturer} {equipment.model} - Equipment Details</title>
                <meta name="description" content={`Details and specifications for ${equipment.manufacturer} ${equipment.model}.`} />
                <link rel="canonical" href={`https://shipping-connect/equipment/${equipment.slug}`} />
            </Head>
            <RequestQuoteFormClient equipment={equipment} />
        </div>
    );
};

export async function generateStaticParams() {
    // Read the data from the local file
    const jsonFilePath = path.join(process.cwd(), 'public', 'organized_equipmentdata.json');
    const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
    const data = JSON.parse(jsonData)["equipment-data"];

    if (!data) {
        console.error('Data is undefined or null');
        return [];
    }

    // Generate paths for each slug
    const paths = data.map((item: Equipment & { slug: string }) => ({
        slug: item.slug,
    }));

    return paths;
}

export default EquipmentPage;