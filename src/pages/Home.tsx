import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Home: React.FC = () => {
    return (
        <IonContent>
            <div className='md:p-10 p-5'>
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
            </div>
        </IonContent>
    );
};

export default Home;
