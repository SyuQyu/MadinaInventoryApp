import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonContent, IonPage } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';
import { HiOutlineHome, HiOutlineQueueList, HiOutlineShoppingBag } from "react-icons/hi2";
import { GoHistory } from "react-icons/go";
import { TbTransfer } from "react-icons/tb";
import useTransactionStore from '../../context/transaksi';
function Tabs() {
    const { deleteAllSelectedItems } = useTransactionStore();
    return (
        <>
            <ul className="flex text-sm font-medium text-center text-gray-500 shadow h-full p-2 md:p-5 bg-[#280822]">
                <li className="w-full h-full">
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/home" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <HiOutlineHome className='w-full h-5 sm:h-6 md:h-8 mb-2' />
                        <p className='text-xs md:text-md font-bold text-white'>Home</p>
                    </IonRouterLink>
                </li>
                <li className="w-full">
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/stok" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <HiOutlineQueueList className='w-full h-5 sm:h-6 md:h-8 mb-2' />
                        <p className='text-xs md:text-md font-bold text-white'>Stok</p>
                    </IonRouterLink>
                </li>
                <li className="w-full">
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/transaksi" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <TbTransfer className='w-full h-5 sm:h-6 md:h-8 mb-2 ' />
                        <p className='text-xs md:text-md font-bold'>Transaksi</p>
                    </IonRouterLink>
                </li>
                <li className="w-full">
                    <IonRouterLink router-direction={'forward'} onClick={() => deleteAllSelectedItems()} routerLink="/history" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <GoHistory className='w-full h-5 sm:h-6 md:h-8 mb-2' />
                        <p className='text-xs md:text-md font-bold text-white'>History</p>
                    </IonRouterLink>
                </li>
            </ul>
        </>
    );
}
export default Tabs;