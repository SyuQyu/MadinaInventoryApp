import React, { useState } from 'react';
import { IonContent, IonRouterLink } from '@ionic/react';
import useAuth from '../context/auth';
import useTransactionStore from '../context/transaksi';
import { BiFolder } from "react-icons/bi";
import { AiOutlineTrademark } from "react-icons/ai";
import Alert from "../components/Alert/Alert";
import { useHistory } from "react-router-dom";

const Settings: React.FC = () => {
    const {logout} = useAuth();
    const {deleteAllSelectedItems} = useTransactionStore();
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();

    const logoutUser = async () => {
        setIsOpen(true);
        deleteAllSelectedItems();
    }

    return (
        <IonContent>
            <div className='md:px-10 md:py-10 px-2 py-5'>
                <header className='mb-4'>
                    <h1 className='text-2xl font-bold'>Pengaturan</h1>
                </header>

                <ul className="w-full text-sm font-medium text-gray-900 bg-white">
                    <li className="w-full p-4 border-b border-gray-200 rounded-t-lg flex">
                        <AiOutlineTrademark className="w-5 h-5 text-black mr-4"/>
                        <IonRouterLink routerLink='settings/brands' className='w-full text-black'>
                            Merek
                        </IonRouterLink>
                    </li>
                    <li className="w-full p-4 border-b border-gray-200 flex">
                        <BiFolder className="w-5 h-5 text-black mr-4"/>
                        <IonRouterLink routerLink='settings/types' className='w-full text-black'>
                            <span>Tipe Barang</span>
                        </IonRouterLink>
                    </li>
                </ul>

                <div className='w-full flex flex-col justify-center items-center gap-4 h-full'>
                    <div className='flex flex-row justify-between items-center space-x-4 w-full'>

                    </div>
                    <div className="md:w-1/2 w-full text-center">
                        <button className='bg-red-500 rounded-lg w-1/2 py-2 px-10 text-white'
                                onClick={() => logoutUser()}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                <Alert
                    header={'Konfirmasi Logout'}
                    message={'Apakah anda yakin ingin keluar dari akun saat ini?'}
                    handleConfirm={() => {
                        logout();
                        history.push('/login')
                    }}
                    isOpen={isOpen}
                    handleDismiss={() => setIsOpen(false)}
                />
            </div>
        </IonContent>
    );
};

export default Settings;
