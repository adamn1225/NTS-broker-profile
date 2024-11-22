"use client";
import { useState, ChangeEvent, useEffect } from 'react';
import { Modal } from "flowbite-react";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { motion, useAnimation } from 'framer-motion';
import EquipmentForm from './EquipmentForm';
import AutoForm from './AutoForm';
import LtlForm from './LtlForm';
import { Equipment, Auto, TruckLoads } from '../../../lib/schema';
import useWindowDimensions from '../../hooks/useWindowDimensions';

const FreightForms = () => {
    const [openModal, setOpenModal] = useState(false);
    const [currentTab, setCurrentTab] = useState('equipment');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);

    const [equipmentFormData, setEquipmentFormData] = useState<Omit<Equipment, 'id'>>({
        e_year: '',
        e_make: '',
        e_model: '',
        length: '',
        width: '',
        height: '',
        machine_weight: '',
        origin_zip: '',
        destination_zip: '',
        date: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: ''
    });

    const [autoFormData, setAutoFormData] = useState<Omit<Auto, 'id'>>({
        e_year: '',
        e_make: '',
        e_model: '',
        origin_zip: '',
        destination_zip: '',
        date: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: ''
    });

    const [truckLoadsFormData, setTruckLoadsFormData] = useState<Omit<TruckLoads, 'id'>>({
        count: '',
        commodity: '',
        ltl_value: '',
        length: '',
        width: '',
        height: '',
        machine_weight: '',
        origin_zip: '',
        destination_zip: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: ''
    });

    const { width, height } = useWindowDimensions();

    const handleChange = (e: ChangeEvent<HTMLInputElement> | { target: { name: string, value: string } }, formType: string) => {
        const { name, value } = e.target;
        if (formType === 'equipment') {
            setEquipmentFormData({ ...equipmentFormData, [name]: value });
        } else if (formType === 'auto') {
            setAutoFormData({ ...autoFormData, [name]: value });
        } else if (formType === 'truckLoads') {
            setTruckLoadsFormData({ ...truckLoadsFormData, [name]: value });
        }
    };

    const fetchCityAndState = async (zipCode: string, type: 'origin' | 'destination', formType: string) => {
        if (zipCode.length === 5) {
            try {
                const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`);
                if (response.ok) {
                    const data = await response.json();
                    const { 'place name': city, 'state abbreviation': state } = data.places[0];
                    if (formType === 'equipment') {
                        setEquipmentFormData((prevData) => ({
                            ...prevData,
                            [`${type}_zip`]: `${zipCode} - ${city}, ${state}`
                        }));
                    } else if (formType === 'auto') {
                        setAutoFormData((prevData) => ({
                            ...prevData,
                            [`${type}_zip`]: `${zipCode} - ${city}, ${state}`
                        }));
                    } else if (formType === 'truckLoads') {
                        setTruckLoadsFormData((prevData) => ({
                            ...prevData,
                            [`${type}_zip`]: `${zipCode} - ${city}, ${state}`
                        }));
                    }
                }
            } catch (error) {
                console.error('Error fetching city and state:', error);
            }
        }
    };

    useEffect(() => {
        if (equipmentFormData.origin_zip) {
            const zipCode = equipmentFormData.origin_zip.split(' - ')[0];
            fetchCityAndState(zipCode, 'origin', 'equipment');
        }
    }, [equipmentFormData.origin_zip]);

    useEffect(() => {
        if (equipmentFormData.destination_zip) {
            const zipCode = equipmentFormData.destination_zip.split(' - ')[0];
            fetchCityAndState(zipCode, 'destination', 'equipment');
        }
    }, [equipmentFormData.destination_zip]);

    useEffect(() => {
        if (autoFormData.origin_zip) {
            const zipCode = autoFormData.origin_zip.split(' - ')[0];
            fetchCityAndState(zipCode, 'origin', 'auto');
        }
    }, [autoFormData.origin_zip]);

    useEffect(() => {
        if (autoFormData.destination_zip) {
            const zipCode = autoFormData.destination_zip.split(' - ')[0];
            fetchCityAndState(zipCode, 'destination', 'auto');
        }
    }, [autoFormData.destination_zip]);

    useEffect(() => {
        if (truckLoadsFormData.origin_zip) {
            const zipCode = truckLoadsFormData.origin_zip.split(' - ')[0];
            fetchCityAndState(zipCode, 'origin', 'truckLoads');
        }
    }, [truckLoadsFormData.origin_zip]);

    useEffect(() => {
        if (truckLoadsFormData.destination_zip) {
            const zipCode = truckLoadsFormData.destination_zip.split(' - ')[0];
            fetchCityAndState(zipCode, 'destination', 'truckLoads');
        }
    }, [truckLoadsFormData.destination_zip]);

    const onCloseModal = () => {
        setOpenModal(false);
    };

    const nextStep = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const prevStep = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const renderForm = () => {
        switch (currentTab) {
            case 'equipment':
                return (
                    <EquipmentForm
                        currentStep={currentStep}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        formData={equipmentFormData}
                        handleChange={(e) => handleChange(e, 'equipment')}
                        setIsSubmitted={setIsSubmitted}
                    />
                );
            case 'auto':
                return (
                    <AutoForm
                        currentStep={currentStep}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        formData={autoFormData}
                        handleChange={(e) => handleChange(e, 'auto')}
                        setIsSubmitted={setIsSubmitted}
                    />
                );
            case 'truckLoads':
                return (
                    <LtlForm
                        currentStep={currentStep}
                        nextStep={nextStep}
                        prevStep={prevStep}
                        formData={truckLoadsFormData}
                        handleChange={(e) => handleChange(e, 'truckLoads')}
                        setIsSubmitted={setIsSubmitted}
                    />
                );
            default:
                return null;
        }
    };

    const controls = useAnimation();

    const iconVariants = {
        initial: { color: "#000" },
        animate: {
            color: ["#000", "#f00", "#000"],
            transition: {
                duration: 1,
                repeat: Infinity,
                repeatType: 'loop' as const,
            },
        },
    };

    useEffect(() => {
        controls.start('animate');
    }, [controls]);

    return (
        <>
            <button
                className='main-btn xxs:text-lg md:text-2xl text-lg font-bold font-mono text-nowrap flex items-center gap-2'
                onClick={() => setOpenModal(true)}
            >
                <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate={controls}
                >
                    <FaAnglesRight />
                </motion.div>
                Haul Rate Request Form
                <motion.div
                    variants={iconVariants}
                    initial="initial"
                    animate={controls}
                >
                    <FaAnglesLeft />
                </motion.div>
            </button>
            <Modal show={openModal} size="3xl" className='bg-stone-600' onClose={onCloseModal} popup>
                <Modal.Header className='bg-stone-100' />
                <Modal.Body className='bg-stone-100'>
                    {isSubmitted ? (
                        <div className='flex flex-col items-center justify-center gap-3'>
                            <h2 className=' w-full underline underline-offset-8 text-slate-800 text-lg font-bold text-center md:text-2xl'>Thanks! I'll get working on it!</h2>
                            <h3 className=' w-full text-slate-800 text-lg font-bold text-center md:text-xl'>I'll get the shipping rate you requested ASAP </h3>
                            <h3 className=' w-full text-slate-800 text-lg font-bold text-center md:text-xl'> Need faster? Call or text me at 954-495-8184</h3>
                            <h3 className=' w-full text-slate-800 text-lg font-bold text-center md:text-xl'> You can also email me at noah@ntslogistics.com</h3>
                        </div>
                    ) : (
                        <>
                            <div className="flex justify-center mb-4 gap-2">
                                <button onClick={() => { setCurrentTab('equipment'); setCurrentStep(1); }} className={`main-btn ${currentTab === 'equipment' ? 'active' : 'bg-zinc-900'}`}>Equipment</button>
                                <button onClick={() => { setCurrentTab('auto'); setCurrentStep(1); }} className={`main-btn ${currentTab === 'auto' ? 'active' : 'bg-zinc-900'}`}>Auto</button>
                                <button onClick={() => { setCurrentTab('truckLoads'); setCurrentStep(1); }} className={`main-btn ${currentTab === 'truckLoads' ? 'active' : 'bg-zinc-900'}`}>LTL/FTL</button>
                            </div>
                            {renderForm()}
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default FreightForms;