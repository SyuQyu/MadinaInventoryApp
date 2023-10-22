import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { CustomCard } from '../components';
import { MdOutlineSsidChart } from "react-icons/md";
import { PiHandCoinsDuotone } from 'react-icons/pi';
import { ImStack } from 'react-icons/im';
const Home: React.FC = () => {
    return (
        <IonContent>
            <div className='md:px-10 md:py-10 px-2 py-5'>
                <header className='mb-4'>
                    <h1 className='text-2xl font-extrabold'>DASHBOARD</h1>
                </header>
                <div className='flex flex-col justify-between items-center gap-6 w-full'>
                    <div className='flex flex-wrap justify-between items-center w-full'>
                        <div className='w-1/4 md:w-[10%] h-full flex justify-end'>
                            <img src="/images/logo.png" alt="logo" className='w-full h-full object-contain' />
                        </div>
                        <p className='font-semibold md:text-xl text-md'>Selamat datang! User1</p>
                    </div>
                </div>
                <div className='flex flex-wrap justify-between items-center md:gap-2 gap-1 mt-5'>
                    <CustomCard
                        logo={<MdOutlineSsidChart className='w-6 h-6 md:h-8' style={{ color: '#FFA800' }} />}
                        title='Pendapatan'
                        percantage='+55%'
                        subTitle='Income'
                        percentageColor='text-green-500'
                    />
                    <CustomCard
                        logo={<PiHandCoinsDuotone className='w-6 h-6 md:h-8' style={{ color: '#F64E60' }} />}
                        title='Penjualan'
                        subTitle='Transaksi Penjualan'
                        time='30d'
                        percentageColor='text-green-500'
                    />
                    <CustomCard
                        logo={<ImStack className='w-6 h-6 md:h-8' style={{ color: '#48BB78' }} />}
                        title='Stok Barang'
                        subTitle='Stok Barang Yang Tersedia'
                        percentageColor='text-green-500'
                    />
                    <CustomCard
                        logo={<MdOutlineSsidChart className='w-6 h-6 md:h-8' style={{ color: '#FFA800' }} />}
                        title='Pengeluaran'
                        percantage='-14%'
                        subTitle='Outcome'
                        time='30d'
                        percentageColor='text-red-500'
                    />
                </div>
            </div>
        </IonContent>
    );
};

export default Home;
