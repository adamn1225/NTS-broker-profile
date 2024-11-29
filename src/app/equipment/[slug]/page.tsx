import { notFound } from 'next/navigation';
import { Database } from '../../../../lib/database.types';
import Head from 'next/head';
import fs from 'fs/promises';
import path from 'path';
import RequestQuoteFormClient from '@components/RequestQuoteFormClient';
import { GoogleAnalytics } from '@next/third-parties/google';
import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

type Equipment = Database['public']['Tables']['equipment']['Row'];

interface Props {
    params: { slug: string };
}

const EquipmentPage = async ({ params }: Props) => {
    const { slug } = params;

    // Read the data from the local file
    const jsonFilePath = path.join(process.cwd(), 'public', 'organized_equipmentdata.json');
    let data: Equipment[] | undefined = cache.get("equipment-data");

    if (!data) {
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        data = JSON.parse(jsonData)["equipment-data"];
        cache.set("equipment-data", data);
    }

    if (!data) {
        console.error('Data is undefined or null');
        notFound();
    }

    // Find the equipment by slug
    const equipment = data.find((item: Equipment) => item.slug === slug);

    if (!equipment) {
        console.error(`Equipment not found for slug: ${slug}`);
        notFound();
    }

    return (
        <div className='h-full'>
            <Head>
                <title>{equipment.e_make} {equipment.e_model} - Equipment Details</title>
                <meta name="description" content={`Details and specifications for ${equipment.e_make} ${equipment.e_model}.`} />
                <link rel="canonical" href={`https://shipping-connect/equipment/${equipment.slug}`} />
            </Head>
            <GoogleAnalytics gaId='G-D01KELFDWG' />
            <RequestQuoteFormClient equipment={equipment} />
        </div>
    );
};

export async function generateStaticParams() {
    // List of manufacturers to include
    const manufacturers = [
        "Caterpillar",
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
    let data: Equipment[] | undefined = cache.get("equipment-data");

    if (!data) {
        const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
        data = JSON.parse(jsonData)["equipment-data"];
        cache.set("equipment-data", data);
    }

    if (!data) {
        console.error('Data is undefined or null');
        return [];
    }

    // Filter data to include only specified manufacturers
    const filteredData = data.filter((item: Equipment) =>
        manufacturers.some(manufacturer => item.e_make?.toLowerCase().includes(manufacturer.toLowerCase()))
    );

    // Generate paths for each slug
    const paths = filteredData.map((item: Equipment) => ({
        slug: item.slug ?? '',
    }));

    return paths;
}

export const revalidate = 60; // Revalidate the page every 60 seconds

export default EquipmentPage;