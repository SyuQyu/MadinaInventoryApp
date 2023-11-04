import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { CustomCard, CustomSelect } from '../components';
import { MdOutlineSsidChart } from "react-icons/md";
import { PiHandCoinsDuotone } from 'react-icons/pi';
import { ImStack } from 'react-icons/im';
import useAuth from '../context/auth';
import useDashboardStore from '../context/dashboard';
const Settings: React.FC = () => {
    const { isLoggedIn, token, dataUser } = useAuth();
    const { data, fetchData, fetchDashbord } = useDashboardStore();
    return (
        <IonContent>
            <div className='md:px-10 md:py-10 px-2 py-5'>
                <header className='mb-4'>
                    <h1 className='text-2xl font-extrabold'>Settings</h1>
                </header>
                <div className='flex flex-row justify-between items-center space-x-4 w-full'>
                    <div className='w-full'>
                        <IonRouterLink routerLink='#' className='relative items-center flex flex-col justify-between gap-2 rounded-md w-[48%] md:w-[24%]  border-2 p-4 md:p-6'>
                            <p className='w-full'>Brand</p>
                        </IonRouterLink>
                    </div>
                    <IonRouterLink routerLink='#' className='relative items-center flex flex-col justify-between gap-2 rounded-md w-[48%] md:w-[24%]  border-2 p-4 md:p-6'>
                        <p>Type</p>
                    </IonRouterLink>
                </div>
            </div>
        </IonContent>
    );
};

export default Settings;
