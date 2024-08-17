import './globals.css';
import FreightForm from "@components/freightForm";
import AutoForm from "@components/autoForm";
import LtlForm from '@components/ltlForm';
import LoginBanner from './components/LoginBanner';

export default function Home() {
  return (
    <main className="relative h-screen w-screen">
      <div className="absolute inset-0 bg-dump-bg bg-cover bg-center opacity-50"></div>
      <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
      <div className="relative z-10 flex flex-col h-3/4">
        <LoginBanner />
         {/* test */}
          <div className="flex flex-col gap-10 justify-center items-center flex-1 ">
            <h1 className='text-3xl text-mute-200 font-extrabold font-arialBlack'>GET A SHIPPING RATE FROM EXPERTS</h1>
            <div className="flex gap-4">
              <FreightForm />
              <LtlForm />
              <AutoForm />
            </div>
          </div>
      </div>
    </main>
  );
}
