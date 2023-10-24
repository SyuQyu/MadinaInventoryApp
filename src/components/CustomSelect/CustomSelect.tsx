import React from "react";
import { useRef } from "react";
import { BsSortUp } from 'react-icons/bs'
const CustomSelect = ({ options, onChange = () => { }, ...props }: props) => {
    return (
        <>
            <select id={'sort'} onChange={onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center focus:outline-none block w-full p-1">
                <option disabled selected hidden>Sort</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
                <option value="high-low">Price High - Low</option>
                <option value="low-high">Price Low - High</option>
            </select>
        </>
    )
}

export default CustomSelect;

type props = {
    options?: string[]
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
}