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
      <div className="relative z-10 flex flex-col h-1/2">
         
          <div className="flex flex-col gap-10 justify-center items-center flex-1 ">
            <h1 className='text-3xl text-mute-200 font-extrabold font-arialBlack'>What are you shipping?</h1>
            <div className="md:flex xs:flex-col gap-4">
              <FreightForm />
              <LtlForm />
              <AutoForm />
            </div>
          </div>
      </div>
    </main>
  );
}
