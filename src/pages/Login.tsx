import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonRouterLink, IonToast } from '@ionic/react';
import { InputCustom } from '../components';
import '../theme/pages/Login.css';
import useAuth from '../context/auth';
const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const handleLogin = async () => {
        const res = await login(email, password);
        if(res) {
            setSuccess(true);
        } else {
            setFailed(true);
        }
    };

    return (
        <IonContent fullscreen={false}>
            <div className='h-full w-full flex flex-col gap-10 justify-center items-center p-10'>
                <div className='w-48 md:w-1/4 h-1/2 flex justify-end'>
                    <img src="/images/logo.svg" alt="logo" className='w-full h-full object-contain' />
                </div>
                <div className='h-full md:w-1/2 w-full flex flex-col justify-start items-center gap-8'>
                    <InputCustom
                        label="Email"
                        labelPlacement="floating"
                        placeholder="Masukkan email"
                        type="text"
                        fill="outline"
                        value={email}
                        onIonChange={(e: CustomEvent) => setEmail(e.detail.value!)}
                    />
                    <InputCustom
                        label="Password"
                        labelPlacement="floating"
                        placeholder="Masukkan password"
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
            <IonToast
                isOpen={success}
                position="top"
                onDidDismiss={() => setSuccess(false)}
                message="Login berhasil"
                duration={2000}
                color="success"
            />
            <IonToast
                isOpen={failed}
                position="top"
                onDidDismiss={() => setFailed(false)}
                message="Email atau password yang anda masukkan salah"
                duration={2000}
                color="danger"
            />
        </IonContent>
    );
};

export default LoginPage;
