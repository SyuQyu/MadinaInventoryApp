import React from 'react';
import { IonAlert } from '@ionic/react';

type props = {
    header: string,
    subHeader?: string,
    message?: string,
    handleCancel?: (e: any) => void,
    handleConfirm?: (e: any) => void,
    isOpen?: boolean,
    handleDismiss?: (val: any) => void,
}

const Alert = ({header, subHeader, message, handleConfirm, handleCancel, isOpen = false, handleDismiss}: props) => {
    return (
        <>
            <IonAlert
                header={header}
                subHeader={subHeader}
                message={message}
                isOpen={isOpen}
                buttons={[
                    {
                        text: 'Tidak',
                        role: 'cancel',
                        handler: handleCancel,
                    },
                    {
                        text: 'Iya',
                        role: 'confirm',
                        handler: handleConfirm,
                    },
                ]}
                onDidDismiss={handleDismiss}
            ></IonAlert>
        </>
    );
}
export default Alert;