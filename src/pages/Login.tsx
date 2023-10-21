import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage } from '@ionic/react';
import {InputCustom} from '../components';
const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log(username, password);
    };

    return (
        <IonPage>
            <IonContent fullscreen>
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
                <IonButton onClick={handleLogin}>Login</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default LoginPage;
