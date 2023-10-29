import React from 'react';
import { IonInput } from '@ionic/react';
import './InputCustom.css';
function InputBox({ disabled = false, name, label, labelPlacement, fill, placeholder, value, type, icons, onIonChange = () => { }, ...props }: Props) {
    return (
        <>
            {
                icons ? (
                    <div className='flex flex-col w-full relative'>
                        <IonInput className="custom" {...props} disabled={disabled} type={type} name={name} label={label} labelPlacement={labelPlacement} fill={fill} value={value} placeholder={placeholder} onIonChange={onIonChange} />
                        <div className='absolute top-5 right-5'>
                            {icons}
                        </div>
                    </div>
                ) : (
                    <>
                        <IonInput className="custom" {...props} disabled={disabled} type={type} name={name} label={label} labelPlacement={labelPlacement} fill={fill} value={value} placeholder={placeholder} onIonChange={onIonChange} />
                    </>
                )
            }
        </>
    );
}
export default InputBox;

type Props = {
    icons?: any,
    name?: string,
    label?: string,
    labelPlacement?: any,
    fill?: any,
    value?: any,
    type?: any,
    placeholder?: string,
    onIonChange?: any
    disabled?: boolean
}