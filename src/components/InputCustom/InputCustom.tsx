import React from 'react';
import { IonInput, IonTextarea } from '@ionic/react';
import './InputCustom.css';

function InputBox({
                      disabled = false,
                      name,
                      label,
                      labelPlacement,
                      fill,
                      placeholder,
                      value,
                      type,
                      icons,
                      onIonChange = () => {
                      },
                      error,
                      ...props
                  }: Props) {
    return (
        <>
            {
                icons ? (
                    <div className='flex flex-col w-full relative'>
                        <IonInput className="custom" {...props} disabled={disabled} type={type} name={name}
                                  label={label} labelPlacement={labelPlacement} fill={fill} value={value}
                                  placeholder={placeholder} onIonChange={onIonChange}/>
                        <div className='absolute top-5 right-5'>
                            {icons}
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-1 justify-between items-start w-full'>
                        <p className='m-0'>{label}</p>

                        {
                            type === 'textarea' ? (
                                <IonTextarea className="custom" {...props} disabled={disabled} name={name} fill={fill}
                                             value={value} placeholder={placeholder} onIonChange={onIonChange}/>
                            ) : (
                                <IonInput className="custom" {...props} disabled={disabled} type={type} name={name}
                                          fill={fill} value={value} placeholder={placeholder}
                                          onIonChange={onIonChange}/>
                            )
                        }

                        {
                            error ? (
                                <p className='text-red-500 text-xs'>{error?.message}</p>
                            ) : null
                        }
                    </div>
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
    disabled?: boolean,
    error?: any,
}