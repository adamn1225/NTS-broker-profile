import { notFound } from 'next/navigation';
import Head from 'next/head';
import fs from 'fs/promises';
import path from 'path';
import RequestQuoteFormClient from '@components/RequestQuoteFormClient';
import NodeCache from 'node-cache';
import Script from 'next/script';

const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour

type Equipment = {
    "Manufacturer/Model": string;
    Weight: string;
    dimensions: {
        Length: string;
        Width: string;
        Height: string;
    };
    manufacturer: string;
    model: string;
    slug: string;
    date: string | null;
    destination_zip: string | null;
    e_year: string | null;
    email: string | null;
    first_name: string | null;
    height: string | null;
    id: number;
    last_name: string | null;
    length: string | null;
    phone: string | null;
    state: string | null;
    width: string | null;
};

interface Props {
    params: Promise<{ slug: string }>;
}

const EquipmentPage = async ({ params }: Props) => {
    const { slug } = await params;

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
                <title>{equipment.manufacturer} {equipment.model} - Equipment Details</title>
                <meta name="description" content={`Details and specifications for ${equipment.manufacturer} ${equipment.model}.`} />
                <link rel="canonical" href={`https://shipping-connect/equipment/${equipment.slug}`} />

            </Head>
            <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-178VD9EM9D"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-178VD9EM9D');
                    `}
                </Script>
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
        manufacturers.some(manufacturer => item.manufacturer?.toLowerCase().includes(manufacturer.toLowerCase()))
    );

    // Generate paths for each slug
    const paths = filteredData.map((item: Equipment) => ({
        slug: item.slug ?? '',
    }));

    return paths;
}

export const revalidate = 60; // Revalidate the page every 60 seconds

export default EquipmentPage;