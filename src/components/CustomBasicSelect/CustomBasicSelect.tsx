
import Select, { StylesConfig } from 'react-select';

type props = {
    data: any;
    value: any;
    setValue?: any;
    apiCall?: any;
    placeHolder: string;
    name: string;
    index?: number;
    onChange: any;
    label?: string;
    defaultValue?: string
}


const colourStyles: StylesConfig = {
    container: (styles) => ({ ...styles, backgroundColor: 'white', width: '100%' }),
    control: (styles) => ({ ...styles, backgroundColor: 'white', padding: '10px 0px', width: '100%', outline: 'none' }),
    option: (styles) => ({ ...styles, backgroundColor: 'white', width: '100%', color: 'black', ':hover': { backgroundColor: '#dfdfdf' } }),
    placeholder: (styles) => ({ ...styles, color: 'gray', width: '100%' }),
};

export default function CustomBasicSelect({defaultValue, data, value, setValue, apiCall, placeHolder, name, index, onChange = () => { }, label }: props) {
    return (

        <div className='flex flex-col gap-1 justify-between items-start w-full' style={{ width: '100%' }}>
            <p className='m-0 w-full'>{label}</p>
            {
                defaultValue ? (
                    <Select
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={placeHolder}
                        onChange={onChange}
                        defaultValue={defaultValue}
                        styles={colourStyles}
                        name={name}
                        options={data}
                    />
                ) : (
                    <Select
                        menuPortalTarget={document.body}
                        menuPosition={'fixed'}
                        className="basic-single"
                        classNamePrefix="select"
                        placeholder={placeHolder}
                        onChange={onChange}
                        styles={colourStyles}
                        name={name}
                        options={data}
                    />
                )
            }
        </div>
    )
}