import './globals.css';
import FreightForm from "@components/freightForm";
import AutoForm from "@components/autoForm";
import LtlForm from '@components/ltlForm';
import NavBanner from './components/NavBanner';
import NavTop from '@/app/components/navTop';
import RootLayout from './layout';
import AboutBroker from './components/aboutBroker';
import ScrollToTopButton from './components/ScrollToTopButton';
import BrokerTestimonials from './components/BrokerTestimonials';
import CreditApp from './components/CreditApp';

export default function Home() {
  return (
    <main className="max-w-max">
<div className="relative h-1/2">
  <div className="absolute inset-0 bg-form-bg bg-cover bg-center opacity-50"></div>
  <div className="absolute inset-0 bg-gray-950 opacity-70"></div>
  <div className="relative z-10 flex flex-col md:h-1/3 py-28 md:py-0">
    <div className="relative flex flex-col rounded-md drop-shadow-xl md:pb-36 md:mx-96 md:gap-6 gap-10 justify-start items-center flex-1">
      <div className="absolute inset-0"></div> {/* Dark overlay */}
      <div className="relative z-10 flex flex-col items-center gap-10 w-full">
         <h1 className='text-3xl sm:text-center sm:mt-40 text-center text-mute-200 font-extrabold tracking-wider'>What are you shipping?</h1>
        <div className="flex w-full md:flex-row items-center justify-center flex-col gap-4">
          <LtlForm />
          <FreightForm />
          <AutoForm />
        </div>
      </div>
    </div>
  </div>
</div>
      <AboutBroker />
<article className='flex flex-col text-center bg-stone-300 mt-1 px-2 md:px-28 py-6 mb-4'>
<div className="absolute inset-0 bg-black opacity-10"></div> 
        <h1 className='text-slate-800 text-4xl font-mono font-semibold mb-6 tracking-wider'>RECENT TRANSPORTS</h1>
<div className='grid md:grid-cols-3 gap-3 md:gap-12 items-center'>
  <div className='flex flex-col px-2 justify-center items-center gap-3 bg-stone-950 py-10 rounded-md drop-shadow-xl'>
    <img className='rounded-md drop-shadow-lg w-96 h-80 object-cover' src='https://ntslogistics.com/wp-content/uploads/2023/05/thumbnail_20_ft_wide_pool_1.jpg' />
            <h1 className='text-stone-100 text-xl font-semibold'>Rectangle 20' Wide Plastic Pool Plus Two Modules</h1>
            <div className='w-1/3 border border-y-1 border-secondary-y'> </div>
    <h2 className='text-stone-100 text-lg'>Rozet, WY to Baltimore, MD</h2>
    <ul className='text-stone-100 text-md'>
      <li>Length: 45 ft</li>
      <li>Width: 20 ft</li>
      <li>Height: 10 ft</li>
      <li>Weight: 30,000 lbs</li>
    </ul>
  </div>
  <div className='flex flex-col px-2 justify-center items-center gap-3 bg-stone-950 py-10 rounded-md drop-shadow-xl'>
    <img className='rounded-md drop-shadow-lg w-96 h-80 object-cover' src='https://ntslogistics.com/wp-content/uploads/2023/05/Komatsu-D61PX-12-Crawler-Tractor.png' />
    <h1 className='text-stone-100 text-xl font-semibold'>BOKEELIA, FL to PORTSMOUTH, VA</h1>
    <div className='w-1/3 border border-y-1 border-secondary-y'> </div>
    <h2 className='text-stone-100 text-lg'>HARVEY, LA to INDIANTOWN, FL</h2>
    <ul className='text-stone-100 text-md'>
      <li>Length: 36'75 ft</li>
      <li>Width: 11.10 ft</li>
      <li>Height: 11.92 ft</li>
      <li>Weight: 79,700 lbs</li>
    </ul>
  </div>
  <div className='flex flex-col px-2 justify-center items-center gap-3 bg-stone-950 py-10 rounded-md drop-shadow-xl'>
    <img className='rounded-md drop-shadow-lg w-96 h-80 object-cover' src='https://ntslogistics.com/wp-content/uploads/2023/05/Caterpillar-PM565B-Cold-Planer.png' />
    <h1 className='text-stone-100 text-xl font-semibold'>Caterpillar PM565B Cold Planer</h1>
    <div className='w-1/3 border border-y-1 border-secondary-y'> </div>
    <h2 className='text-stone-100 text-md'>FAIRFIELD, NJ to BAKERSFIELD, CA</h2>
    <ul className='text-stone-100 text-md'>
      <li>Length: 47'58 ft</li>
      <li>Width: 10'34 ft</li>
      <li>Height: 10'50 ft</li>
      <li>Weight: 83,776 lbs</li>
    </ul>
  </div>

</div>
</article>
 <BrokerTestimonials />
<CreditApp />
<div className='flex justify-center w-full items-center my-10 z-50'>
  <ScrollToTopButton />
  </div>
</main>
  );
}
