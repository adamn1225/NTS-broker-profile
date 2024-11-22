"use client";
import FreightForms from "./FreightForm";

const Hero = () => {
    return (
        <div className="relative h-1/2">
            <div className="absolute inset-0 bg-form-bg bg-cover bg-center opacity-50"></div>
            <div className="absolute inset-0 bg-zinc-800 opacity-70"></div>
            <div className="relative flex flex-col md:h-1/3 py-28 md:py-0">
                <div className="relative flex flex-col rounded-md drop-shadow-xl md:pb-36 md:mx-96 md:gap-6 gap-10 justify-start items-center flex-1">
            
                    <div className="relative z-10 flex flex-col items-center gap-10 w-full">
                        <h1 className='text-3xl sm:text-center sm:mt-40 text-center text-mute-200 font-extrabold tracking-wider'>What are you shipping?</h1>
                        <div className="flex w-full md:flex-row items-center justify-center flex-col gap-4">
                            <FreightForms />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;