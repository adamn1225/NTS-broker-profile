import './globals.css';
import FreightForm from "@components/freightForm";
import AutoForm from "@components/autoForm";
import LtlForm from '@components/ltlForm';
import NavBanner from './components/NavBanner';
import NavTop from '@components/navTop';
import RootLayout from './layout';

export default function Home() {
  return (
    <main className="relative h-full max-h-max w-screen">
      <div className="absolute inset-0 bg-dump-bg bg-cover bg-center opacity-50"></div>
      <div className="absolute inset-0 bg-gray-950 opacity-70"></div>
      <div className="relative z-10 flex flex-col md:h-1/2 py-28 md:py-0">
         
          <div className="flex flex-col bg-gray-500/60 md:mt-20 md:pb-36 md:mx-96 md:gap-6 gap-10 justify-start items-center flex-1 ">
            <h1 className='text-3xl sm:text-center sm:mt-40 text-center text-mute-200 font-extrabold font-arialBlack'>What are you shipping?</h1>
            <div className="flex md:flex-row flex-col gap-4">
              <FreightForm />
              <LtlForm />
              <AutoForm />
            </div>
          </div>
      </div>
    </main>
  );
}
