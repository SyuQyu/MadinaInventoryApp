import React from 'react';
import { IonActionSheet, IonButton } from '@ionic/react';
export default function CustomFilter({ options, onClick = () => { }, value, ...props }: any) {
    return (
        <div className="cursor-pointer relative w-full flex-col justify-center items-center gap-2 h-full">
            <div onClick={onClick} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center focus:outline-none flex flex-row w-full justify-center items-center p-1">
                Filter
            </div>
        </div>
    )
}