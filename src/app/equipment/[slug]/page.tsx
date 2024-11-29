import { notFound } from 'next/navigation';
import { Equipment } from '../../../types';
import Head from 'next/head';
import fs from 'fs/promises';
import path from 'path';
import RequestQuoteFormClient from '@components/RequestQuoteFormClient';

interface Props {
    params: { slug: string };
}

const EquipmentPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = params;

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
    // List of manufacturers to include
    const manufacturers = [
        "Caterpillar",
        "Cat",
        "John Deere",
        "Case",
        "Komatsu",
        "Terex",
        "Ford",
        "Volvo",
        "Hitachi",
        "JCB",
        "Kubota",
        "New Holland",
        "Bobcat",
        "Yanmar",
        "Doosan",
        "Kobelco",
        "Hyundai",
        "Takeuchi",
        "Kawasaki",
        "Liebherr",
        "Sany"
    ];

    // Read the data from the local file
    const jsonFilePath = path.join(process.cwd(), 'public', 'organized_equipmentdata.json');
    const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
    const data = JSON.parse(jsonData)["equipment-data"];

    if (!data) {
        console.error('Data is undefined or null');
        return [];
    }

    // Filter data to include only specified manufacturers
    const filteredData = data.filter((item: Equipment) => manufacturers.includes(item.manufacturer));

    // Generate paths for each slug
    const paths = filteredData.map((item: Equipment & { slug: string }) => ({
        params: { slug: item.slug },
    }));

    return paths;
}

export const revalidate = 60; // Revalidate the page every 60 seconds

export default EquipmentPage;