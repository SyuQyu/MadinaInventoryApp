import React, { useEffect, useState } from 'react';
import Select, { StylesConfig } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import useBrandStore from '../../context/brand';
import useAuth from '../../context/auth';
// interface Option {
//     readonly label: string;
//     readonly value: number;
// }

type props = {
    data: any;
    value: any;
    setValue?: any;
    apiCall: any;
    placeHolder: string;
    name: string;
    index?: number;
    onChange: any;
}


const colourStyles: StylesConfig = {
    control: (styles) => ({ ...styles, backgroundColor: 'white', padding: '10px 0px' }),
    option: (styles) => ({ ...styles, backgroundColor: 'white', color: 'black', ':hover': { backgroundColor: '#dfdfdf' } }),
    placeholder: (styles) => ({ ...styles, color: 'black' }),
};

export default function CreateableCustomSelect({ data, value, setValue, apiCall, placeHolder, name, index, onChange = () => { } }: props) {
    const { addBrand } = useBrandStore();
    const {  token } = useAuth();
    const createOption = (label: string, id: number) => ({
        label,
        value: id,
    });

    const defaultOptions = data?.map((item: any) => {
        return createOption(item.name, item.id);
    });

    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(defaultOptions);
    let response: any = null;
    // const [value, setValue] = useState<Option | null>();
    const handleCreate = async (inputValue: string) => {
        setIsLoading(true);
        // console.log(inputValue, 'inputValue')
        if (inputValue && token) {
            try {
                response = await apiCall(inputValue, token);
                const newOption = createOption(response.name, response.id);
                setIsLoading(false);
                setOptions((prev: any) => [...prev, newOption]);
                // setValue(newOption);
                onChange(name, newOption, index);
            } catch (error) {
                // Handle any errors here
                setIsLoading(false);
            }
        }
    };

    const onChangeData = (newValue: any, actionMeta: any) => {
        onChange(name, newValue, index);
        // console.group('Value Changed');
        // console.log(newValue, actionMeta.name, value, 'data onchange');
        // console.log(`action: ${actionMeta.action}`);
        // console.groupEnd();
        // setValue(newValue)
    }

    // useEffect(() => {
    //     console.log(data);
    // }, [data]);

    return (
        <CreatableSelect
            menuPortalTarget={document.body}
            menuPosition={'fixed'}
            isClearable
            placeholder={placeHolder}
            isDisabled={isLoading}
            isLoading={isLoading}
            onChange={onChangeData}
            onCreateOption={handleCreate}
            options={options}
            value={value}
            styles={colourStyles}
            name={name}
        />
    );
};
