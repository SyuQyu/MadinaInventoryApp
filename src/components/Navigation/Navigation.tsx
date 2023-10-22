import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink, IonContent, IonPage } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';
import { HiOutlineHome, HiOutlineQueueList, HiOutlineShoppingBag } from "react-icons/hi2";
import { GoHistory } from "react-icons/go";

function Tabs() {
    return (
        <>
            <ul className="flex text-sm font-medium text-center text-gray-500 shadow h-full p-5 bg-[#280822] bg">
                <li className="w-full h-full">
                    <IonRouterLink routerLink="/home" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <HiOutlineHome className='w-full h-6 md:h-8 mb-2' />
                        <p className='text-md font-bold text-white'>Home</p>
                    </IonRouterLink>
                </li>
                <li className="w-full">
                    <IonRouterLink routerLink="/stok" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <HiOutlineQueueList className='w-full h-6 md:h-8 mb-2' />
                        <p className='text-md font-bold text-white'>Stok</p>
                    </IonRouterLink>
                </li>
                <li className="w-full">
                    <IonRouterLink routerLink="/penjualan" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <HiOutlineShoppingBag className='w-full h-6 md:h-8 mb-2' />
                        <p className='text-md font-bold text-white'>Penjualan</p>
                    </IonRouterLink>
                </li>
                <li className="w-full">
                    <IonRouterLink routerLink="/history" className='flex flex-col gap-10 justify-between items-center' style={{ color: 'white' }}>
                        <GoHistory className='w-full h-6 md:h-8 mb-2' />
                        <p className='text-md font-bold text-white'>History</p>
                    </IonRouterLink>
                </li>
            </ul>
        </>
    );
}
export default Tabs;