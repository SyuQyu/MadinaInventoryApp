import React from 'react';
import { IonInput } from '@ionic/react';

function InputBox({ label, labelPlacement, fill, placeholder, value, type, onIonChange = () => { }, ...props }: Props) {
    return (
        <>
            <IonInput type={type}  label={label} labelPlacement={labelPlacement} fill={fill} value={value} placeholder={placeholder} onIonChange={onIonChange} {...props} />
        </>
    );
}
export default InputBox;

type Props = {
    label: string,
    labelPlacement: any,
    fill: any,
    value: any,
    type: any,
    placeholder: string,
    onIonChange: any
}