import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { ExploreContainer } from '../components';
import '../theme/pages/Tab2.css';
import { IoLogInOutline } from 'react-icons/io5'
const Tab2: React.FC = () => {
  return (
    <IonContent fullscreen={false}>
      <div className='md:px-10 md:py-10 px-2 py-5'>
        <header className='mb-6'>
          <h1 className='text-2xl font-extrabold text-[#280822]'>Penjualan</h1>
        </header>
        <div className='w-full h-full flex md:flex-row flex-col justify-start items-start gap-6'>
          <IonRouterLink routerLink="/home" className='text-white w-full md:p-6 p-4 bg-[#280822] rounded-xl'>
            <div className='w-full flex flex-col justify-between text-left items-start py-5 gap-4'>
              <h1 className='font-bold text-4xl'>
                Stock In <IoLogInOutline className='ml-5 float-right w-10 h-10' />
              </h1>
              <p className='pr-10'>
                Pilih Item dan inputkan kedalam untuk merekam history barang masuk
              </p>
            </div>
          </IonRouterLink>
          <IonRouterLink routerLink="/home" className='text-white w-full md:p-6 p-4 bg-[#280822] rounded-xl'>
            <div className='w-full flex flex-col justify-between text-right items-end py-5 gap-4'>
              <h1 className='font-bold text-4xl'>
                Stock Out <IoLogInOutline className='ml-5 float-right w-10 h-10' />
              </h1>
              <p className='pl-10'>
                Pilih Item dan inputkan kedalam untuk merekam history barang keluar
              </p>
            </div>
          </IonRouterLink>
        </div>
      </div>
    </IonContent>
  );
};

export default Tab2;
