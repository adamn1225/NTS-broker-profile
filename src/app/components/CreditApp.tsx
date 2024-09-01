import { useState, ChangeEvent, FormEvent } from 'react';
import { Button, Modal, Label, TextInput } from "flowbite-react";
import { FaHandPointRight, FaCheckDouble } from "react-icons/fa";
import { FaAnglesUp, FaAnglesRight } from "react-icons/fa6";

const CreditApp = () => {
    const [openModal, setOpenModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const onCloseModal = () => {
        setOpenModal(false);
    };

    return (
        <article className='bg-stone-300 py-12'>
            <div className='flex flex-col md:flex-row md:justify-evenly justify-center items-center text-mute-200'>
                <div className='flex text-stone-950 text-center mx-10 flex-col gap-2'>
                    <h3 className='text-3xl text-stone-950 text-center font-bold font-mono tracking-wider'>
                        <FaAnglesRight />ATTENTION FREQUENT SHIPPERS
                    </h3>
                    <div className='my-2' style={{ border: 'solid', borderColor: '#b18c2f', borderRight: 'none', borderLeft: 'none', borderWidth: '1px' }}></div>
                    <h3 className='text-stone-950 font-semibold'>Does your business need reliable shipping often?</h3>
                    <p className='text-stone-950 font-semibold'>Request a credit application</p>
                    <p className='text-stone-950 font-normal'>Benefits of being a credit customer</p>
                    <ul>
                        <li className='flex gap-1 text-wrap text-md font-medium'>
                            <FaCheckDouble style={{ color: '#b18c2f' }} />Reduced Transport Costs
                        </li>
                        <li className='flex gap-1 text-wrap text-md font-medium'>
                            <FaCheckDouble style={{ color: '#b18c2f' }} />Priority on Orders
                        </li>
                        <li className='flex gap-1 text-wrap text-md font-medium'>
                            <FaCheckDouble style={{ color: '#b18c2f' }} />No upfront costs for every shipment
                        </li>
                    </ul>
                </div>

                <Button className='bg-button hover:bg-amber-400 hover:text-mute-200' onClick={() => setOpenModal(true)}>
                    <span className='md:text-2xl text-lg font-bold font-mono text-nowrap flex items-center'>
                        REGULAR/HEAVY/OVERSIZE EQUIPMENT
                    </span>
                </Button>
                <Modal show={openModal} size="3xl" className='bg-stone-600' onClose={onCloseModal} popup>
                    <Modal.Header className='bg-stone-100' />
                    <Modal.Body className='bg-stone-100'>
                        <form action="">
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Name</Label>
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Name'
                                        value={formData.name}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Email</Label>
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Email'
                                        value={formData.email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Phone</Label>
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Phone'
                                        value={formData.phone}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Company</Label>
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Company'
                                        value={formData.company}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, company: e.target.value })}
                                    />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <Label className='text-stone-950 font-bold'>Message</Label>
                                    <TextInput
                                        className='bg-stone-100'
                                        placeholder='Message'
                                        value={formData.message}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, message: e.target.value })}
                                    />
                                </div>
                                <Button className='bg-button hover:bg-amber-400 hover:text-mute-200' type='submit'>Submit</Button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </article>
    );
};

export default CreditApp;