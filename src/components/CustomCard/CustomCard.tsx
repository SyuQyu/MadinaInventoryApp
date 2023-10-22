import React from 'react';
import { IonInput } from '@ionic/react';
import clsx from 'clsx';
function CustomCard({ logo, title, percantage, subTitle, percentageColor, time, ...props }: Props) {
    return (
        <>
            <div className='relative items-center flex flex-col justify-between gap-2 rounded-md w-[48%] md:w-[24%] h-[150px] border-2 p-4 md:p-6'>
                <div className='w-full h-full flex justify-start items-center'>
                    {logo}
                </div>
                <div className='w-full h-full flex flex-row md:justify-start justify-between items-center md:gap-4 gap-2'>
                    <p className='font-semibold md:text-xl text-sm'>{title}</p>
                    {
                        percantage ? (
                            <p className={clsx('font-semibold md:text-md text-xs', percentageColor ? percentageColor : 'text-green-500')}>{percantage}</p>
                        ) : null
                    }
                </div>
                <div className='w-full flex justify-start items-center'>
                    <p className='font-semibold md:text-sm text-xs text-gray-500'>{subTitle}</p>
                </div>
                {
                    time ? (
                        <div className='absolute bottom-3 right-3'>
                            <p className='font-semibold md:text-sm text-xs text-gray-500'>{time}</p>
                        </div>
                    ) : null
                }
            </div>
        </>
    );
}
export default CustomCard;

type Props = {
    logo?: any,
    title?: string,
    percantage?: string,
    subTitle?: string,
    percentageColor?: any,
    time?: string,
}