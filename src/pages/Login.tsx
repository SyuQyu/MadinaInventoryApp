import React, { useEffect, useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonRouterLink } from '@ionic/react';
import { InputCustom } from '../components';
import '../theme/pages/Login.css';
import useAuth from '../context/auth';
const LoginPage: React.FC = () => {
    const { login, logout } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleLogin = () => {
        console.log(email, password);
        login(email, password);
    };

    return (
        <IonContent fullscreen={false}>
            <div className='h-full w-full flex flex-col gap-10 justify-center items-center p-10'>
                <div className='w-full md:w-1/4 h-full flex justify-end'>
                    <img src="/images/logo.png" alt="logo" className='w-full h-full object-contain' />
                </div>
                <div className='h-full md:w-1/2 w-full flex flex-col justify-start items-center gap-8'>
                    <InputCustom
                        label="Email"
                        labelPlacement="floating"
                        placeholder="Email"
                        type="text"
                        fill="outline"
                        value={email}
                        onIonChange={(e: CustomEvent) => setEmail(e.detail.value!)}
                    />
                    <InputCustom
                        label="Password"
                        labelPlacement="floating"
                        placeholder="Password"
                        fill="outline"
                        type="password"
                        value={password}
                        onIonChange={(e: CustomEvent) => setPassword(e.detail.value!)}
                    />
                    <button onClick={handleLogin} className='bg-red-500 rounded-lg w-full py-2 px-10 text-white'>
                        {/* <IonRouterLink routerLink="/home" className='text-white bg-red'></IonRouterLink> */}
                        Login
                    </button>
                </div>
            </div>
        </IonContent>
    );
};

export default LoginPage;
