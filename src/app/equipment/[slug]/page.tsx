import { notFound } from 'next/navigation';
import { Equipment } from '../../../../lib/schema';
import Head from 'next/head';
import supabase from '../../../../lib/supabaseClient';
import RequestQuoteFormClient from '@components/RequestQuoteFormClient';

interface Props {
    params: { slug: string };
}

const EquipmentPage = async ({ params }: Props) => {
    const { slug } = params;

    // Fetch data from Supabase
    const { data, error } = await supabase
        .from('equipment')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) {
        console.error('Error fetching data:', error);
        notFound();
    }

    const equipment = data;

    return (
        <div className='h-full'>
            <Head>
                <title>{equipment.e_make} {equipment.e_model} - Equipment Details</title>
                <meta name="description" content={`Details and specifications for ${equipment.e_make} ${equipment.e_model}.`} />
                <link rel="canonical" href={`https://shipping-connect/equipment/${equipment.slug}`} />
            </Head>
            <RequestQuoteFormClient equipment={equipment} />
        </div>
    );
};

export async function generateStaticParams() {
    // Fetch data from Supabase
    const { data, error } = await supabase
        .from('equipment')
        .select('slug');

    if (error || !data) {
        console.error('Error fetching data:', error);
        return [];
    }

    // Generate paths for each slug
    const paths = data.map((item) => ({
        slug: item.slug,
    }));

    return paths;
}

export default EquipmentPage;