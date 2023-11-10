import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { CustomCard, CustomSelect } from '../components';
import { MdOutlineSsidChart } from "react-icons/md";
import { PiHandCoinsDuotone } from 'react-icons/pi';
import { ImStack } from 'react-icons/im';
import useAuth from '../context/auth';
import useDashboardStore from '../context/dashboard';
import useTransactionStore from '../context/transaksi';
import { BiLogOut } from 'react-icons/bi';
const Settings: React.FC = () => {
    const { isLoggedIn, token, dataUser, logout } = useAuth();
    const { data, fetchData, fetchDashbord } = useDashboardStore();
    const { deleteAllSelectedItems } = useTransactionStore();

    const logoutUser = () => {
        logout();
        deleteAllSelectedItems();
    }
    return (
        <IonContent>
            <div className='md:px-10 md:py-10 px-2 py-5'>
                <header className='mb-4'>
                    <h1 className='text-2xl font-extrabold'>Settings</h1>
                </header>
                <div className='w-full flex flex-col justify-center items-center gap-4 h-full'>
                    <div className='flex flex-row justify-between items-center space-x-4 w-full'>
                        <IonRouterLink routerLink='settings/brands' className='w-full'>
                            <div className='relative items-center flex flex-col justify-between gap-2 rounded-md w-full  border-2 p-4 md:p-6'>
                                <p className='w-full text-center text-black'>Brand</p>
                            </div>
                        </IonRouterLink>
                        <IonRouterLink routerLink='settings/types' className='w-full'>
                            <div className='relative items-center flex flex-col justify-between gap-2 rounded-md w-full  border-2 p-4 md:p-6'>
                                <p className='w-full text-center text-black'>Type</p>
                            </div>
                        </IonRouterLink>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <IonRouterLink onClick={() => logoutUser()} routerLink="/login">
                            <button className='bg-red-500 rounded-lg w-full py-2 px-10 text-white'>
                                {/* <IonRouterLink routerLink="/home" className='text-white bg-red'></IonRouterLink> */}
                                Logout
                            </button>
                        </IonRouterLink>
                    </div>
                </div>
            </div>
        </IonContent>
    );
};

export default Settings;
