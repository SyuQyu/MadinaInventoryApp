import { useRef } from "react";
import { BsSortUp } from 'react-icons/bs'
const CustomFilter = ({ options, ...props }: props) => {
    return (
        <>
            <select id={'sort'} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center focus:outline-none block w-full p-1">
                <option value="" disabled selected hidden>Sort</option>
                <option className="text-center" value="a-z">A - Z</option>
                <option className="text-center" value="z-a">Z - A</option>
                <option className="text-center" value="high-low">Price High - Low</option>
                <option className="text-center" value="low-high">Price Low - High</option>
            </select>

        </>
    )
}

export default CustomFilter;

type props = {
    options?: string[]
}