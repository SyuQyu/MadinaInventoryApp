import React, { useEffect, useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonRouterLink } from '@ionic/react';
import { InputCustom } from '../components';
import '../theme/pages/Login.css';
import { useAuth } from '../context/auth';
const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { loginState, login } = useAuth();
    const handleLogin = () => {
        console.log(username, password);
        login();
    };

    return (
        <IonContent fullscreen={false}>
            <div className='h-full w-full flex flex-col gap-10 justify-center items-center p-10'>
                <div className='w-full md:w-1/4 h-full flex justify-end'>
                    <img src="/images/logo.png" alt="logo" className='w-full h-full object-contain' />
                </div>
                <div className='h-full md:w-1/2 w-full flex flex-col justify-start items-center gap-8'>
                    <InputCustom
                        label="Username"
                        labelPlacement="floating"
                        placeholder="Username"
                        type="text"
                        fill="outline"
                        value={username}
                        onIonChange={(e: CustomEvent) => setUsername(e.detail.value!)}
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
                    <button onClick={handleLogin} className='bg-red-500 rounded-lg w-full py-2 px-10'>
                        <IonRouterLink routerLink="/home" className='text-white bg-red'>Login</IonRouterLink>
                    </button>
                </div>
            </div>
        </IonContent>
    );
};

export default LoginPage;
