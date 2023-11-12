import React, { useEffect } from 'react';
import { IonContent } from '@ionic/react';
import { CustomCard, CustomSelect } from '../components';
import { MdOutlineSsidChart } from "react-icons/md";
import { PiHandCoinsDuotone } from 'react-icons/pi';
import { ImStack } from 'react-icons/im';
import useAuth from '../context/auth';
import useDashboardStore from '../context/dashboard';
import { formatNumber, formatRupiah } from "../../utils";

const Home: React.FC = () => {
    const {token, dataUser} = useAuth();
    const {data, fetchDashboard} = useDashboardStore();
    const options = [
        {
            value: 'today',
            label: 'Today',
        },
        {
            value: 'today',
            label: 'Today',
        },
        {
            value: 'this_week',
            label: 'This Week',
        },
        {
            value: 'last_week',
            label: 'Last Week',
        },
        {
            value: 'this_month',
            label: 'This Month',
        },
        {
            value: 'last_3_month',
            label: 'Last 3 Months',
        },
        {
            value: 'last_6_month',
            label: 'Last 6 Months',
        },
        {
            value: 'this_year',
            label: 'This Year',
        },
    ];

    const fetch = async () => {
        await fetchDashboard(token, 'today');
    }
    const onChangeTime = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        await fetchDashboard(token, event.target.value);
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <IonContent>
            <div className='md:px-10 md:py-10 px-2 py-5'>
                <header className='mb-4'>
                    <h1 className='text-2xl font-bold'>Dashboard</h1>
                </header>
                <div className='flex flex-col justify-between items-center gap-6 w-full mb-4'>
                    <div className='flex flex-wrap justify-between items-center w-full'>
                        <div className='w-1/4 md:w-[10%] h-full flex justify-end'>
                            <img src="/images/logo.svg" alt="logo" className='w-full h-full object-contain'/>
                        </div>
                        <div>
                            <p className='md:text-xl text-md font-semibold'>Selamat datang!</p>
                            <p className='md:text-xl text-md text-right font-semibold'>{dataUser?.name}</p>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-row gap-10 justify-between items-center'>
                    <div className='w-3/4 block'></div>
                    <div className='md:w-1/6 w-3/4 flex justify-end items-end'>
                        <CustomSelect
                            onChange={onChangeTime}
                            options={options}
                        />
                    </div>
                </div>
                <div className='grid grid-cols-2 justify-between items-center gap-2 mt-5'>
                    <CustomCard
                        logo={<MdOutlineSsidChart className='w-6 h-6 md:h-8' style={{color: '#FFA800'}}/>}
                        title='Pendapatan'
                        percentage={formatRupiah(data?.income)}
                        subTitle='Income'
                        percentageColor='text-green-500'
                    />
                    <CustomCard
                        logo={<PiHandCoinsDuotone className='w-6 h-6 md:h-8' style={{color: '#F64E60'}}/>}
                        title='Penjualan'
                        subTitle='Transaction Penjualan'
                        time='30d'
                        percentage={formatRupiah(data?.total_sales)}
                        percentageColor='text-dark'
                    />
                    <CustomCard
                        logo={<ImStack className='w-6 h-6 md:h-8' style={{color: '#48BB78'}}/>}
                        title='Stok Barang'
                        subTitle='Stok Barang Yang Tersedia'
                        percentageColor='text-dark'
                        percentage={formatNumber(data?.total_stock)}
                    />
                    <CustomCard
                        logo={<MdOutlineSsidChart className='w-6 h-6 md:h-8' style={{color: '#FFA800'}}/>}
                        title='Pengeluaran'
                        percentage={formatRupiah(data?.expense)}
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
