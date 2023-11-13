import React from 'react';
import { IonRouterLink } from '@ionic/react';
import { HiOutlineHome, HiOutlineQueueList } from "react-icons/hi2";
import { GoHistory } from "react-icons/go";
import { TbTransfer } from "react-icons/tb";
import { FiSettings } from 'react-icons/fi'
import useTransactionStore from '../../context/transaksi';

function Tabs() {
    const { deleteAllSelectedItems } = useTransactionStore();

    const isActive = (path: string) => {
        return window.location.pathname === path;
    }

    return (
        <>
            <ul className="flex text-sm font-medium text-center text-gray-500 shadow h-full md:p-5 bg-[#280822]" style={{marginBottom: 0}}>
                <li className={`w-full p-2 ${isActive('/home') ? 'bg-[#381C33]' : isActive('/') ? 'bg-[#381C33]' : null }`}>
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/home" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <HiOutlineHome className='w-full h-5 sm:h-6 md:h-8 mb-2' />
                        <p className='text-xs md:text-md font-bold text-white'>Beranda</p>
                    </IonRouterLink>
                </li>
                <li className={`w-full p-2 ${isActive('/stok') ? 'bg-[#381C33]' : ''}`}>
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/stok" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <HiOutlineQueueList className='w-full h-5 sm:h-6 md:h-8 mb-2' />
                        <p className='text-xs md:text-md font-bold text-white'>Stok</p>
                    </IonRouterLink>
                </li>
                <li className={`w-full p-2 ${isActive('/transaksi') ? 'bg-[#381C33]' : ''}`}>
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/transaksi" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <TbTransfer className='w-full h-5 sm:h-6 md:h-8 mb-2 ' />
                        <p className='text-xs md:text-md font-bold'>Transaksi</p>
                    </IonRouterLink>
                </li>
                <li className={`w-full p-2 ${isActive('/history') ? 'bg-[#381C33]' : ''}`}>
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/history" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <GoHistory className='w-full h-5 sm:h-6 md:h-8 mb-2' />
                        <p className='text-xs md:text-md font-bold text-white'>Histori</p>
                    </IonRouterLink>
                </li>
                <li className={`w-full p-2 ${isActive('/settings') ? 'bg-[#381C33]' : ''}`}>
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/settings" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <FiSettings className='w-full h-5 sm:h-6 md:h-8 mb-2' />
                        <p className='text-xs md:text-md font-bold text-white'>Pengaturan</p>
                    </IonRouterLink>
                </li>
            </ul>
        </>
    );
}
export default Tabs;