import React from "react";
import { useRef } from "react";
import { BsSortUp } from 'react-icons/bs'
const CustomSelect = ({ options = [
    {
        value: '',
        label: 'Sort'
    },
    {
        value: 'asc',
        label: 'Terlama'
    },
    {
        value: 'desc',
        label: 'Terbaru'
    },
], onChange = () => { }, ...props }: props) => {
    return (
        <>
            <select id={'sort'} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center focus:outline-none block w-full p-1">
                {
                    options?.map((item: any, index: any) => (
                        index === 0 ? (
                            <option key={index} disabled selected hidden>{item?.label}</option>
                        ) : (
                            <option key={index} value={item?.value}>{item?.label}</option>
                        )
                    ))
                }
            </select>
        </>
    )
}

export default CustomSelect;

type props = {
    options?: any
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}