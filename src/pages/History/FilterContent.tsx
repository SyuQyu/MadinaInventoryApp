import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowRight } from "react-icons/md";
import useFilterStore from "../../context/filterTransaksi";
import useBrandStore from "../../context/brand";
import useItemStore from "../../context/item";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import useItemTypeStore from "../../context/itemType";

export default function FilterContent({ valueOpener, setValueOpener, handleChangeOpen = () => { } }: any) {
    const { brand, type, setBrand, setType, selectedBrand, selectedType, brandSelected, typeSelected, clearData } = useFilterStore();
    const { fetchBrands, brands } = useBrandStore();
    const { fetchItemsWithParams, fetchItems } = useItemStore();
    const { fetchItemTypes, itemTypes } = useItemTypeStore();
    const [searchBrand, setSearchBrand] = useState('');
    const [searchType, setSearchType] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [open, setOpen] = useState({
        brand: false,
        type: false
    });

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        if (e.target.id === "brand-checkbox") {
            setBrand(e.target.checked);
            await fetchBrands();
        } else if (e.target.id === "type-checkbox") {
            setType(e.target.checked);
            await fetchItemTypes();
        }
    }

    const selectedBrandChecbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        selectedBrand(parseInt(e.target.value));
        console.log(e.target.value);
    }

    const selectedItemsChecbox = async (e: React.ChangeEvent<HTMLInputElement>) => {
        selectedType(parseInt(e.target.value));
        console.log(e.target.value);
    }

    const handleOpen = (type: string) => {
        if (type === "brand") {
            setOpen({ ...open, brand: !open.brand });
        } else if (type === "type") {
            setOpen({ ...open, type: !open.type });
        }
    }

    const handleChangeSearchBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchBrand(e.target.value);
    }

    const handleChangeSearchType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(e.target.value);
    }

    const handleOpenFilter = () => {
        if (brandSelected.length > 0 || typeSelected.length > 0) {
            fetchItemsWithParams(1, 10, brandSelected.join(","), typeSelected.join(","), '');
        } else {
            fetchItems();
        }
        setValueOpener(!valueOpener);
    }

    const filteredItems = itemTypes?.filter(item => item?.name?.toLowerCase().includes(searchType.toLowerCase()));
    const filteredBrand = brands?.filter(item => item?.name?.toLowerCase().includes(searchBrand.toLowerCase()));
    return (
        <div>
            {
                open.brand || open.type ? null : (
                    <button className="w-full text-black" onClick={handleOpenFilter}>
                        <div className="w-full text-black flex flex-row gap-1 items-center py-2">
                            <IoIosArrowBack className="w-3 h-3" />
                            <p className="text-sm">
                                Back
                            </p>
                        </div>
                    </button>
                )
            }
            <p className="font-semibold">Filter</p>
            {
                open.brand && brand ? (
                    <>
                        <button className="w-full text-black" onClick={() => handleOpen('brand')}>
                            <div className="w-full text-black flex flex-row gap-1 items-center">
                                <IoIosArrowBack className="w-3 h-3" />
                                <p className="text-sm">
                                    Back
                                </p>
                            </div>
                        </button>
                        <div className="mt-2 flex flex-col justify-center items-center gap-2 w-full">
                            <div className='w-full py-1 px-4 rounded-md flex flex-row justify-between items-center bg-[#EFEFEF]'>
                                <input
                                    style={{ backgroundColor: '#EFEFEF', border: 'none', outline: 'none', width: '100%' }}
                                    placeholder="Search"
                                    type="Search Filter"
                                    value={searchBrand}
                                    name="saerch"
                                    // icons={<AiOutlineSearch className='w-5 h-5 text-[#280822]' />}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeSearchBrand(e)}
                                />
                                <AiOutlineSearch className='w-5 h-5 text-[#280822] cursor-pointer' />
                            </div>
                            <div className="flex flex-col justify-start items-start gap-2 w-full mt-2">
                                {
                                    filteredBrand?.map((brand: any, index: number) => (
                                        <div key={index} className="flex flex-row justify-start items-start gap-2">
                                            <input id={`brand-${index}`} type="checkbox" value={brand.id} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " onChange={selectedBrandChecbox} />
                                            <p className="text-black">{brand.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>

                ) : open.type && type ? (
                    <>
                        <button className="w-full text-black" onClick={() => handleOpen('type')}>
                            <div className="w-full text-black flex flex-row gap-1 items-center">
                                <IoIosArrowBack className="w-3 h-3" />
                                <p className="text-sm">
                                    Back
                                </p>
                            </div>
                        </button>
                        <div className="mt-2 flex flex-col justify-center items-center gap-2 w-full">
                            <div className='w-full py-1 px-4 rounded-md flex flex-row justify-between items-center bg-[#EFEFEF]'>
                                <input
                                    style={{ backgroundColor: '#EFEFEF', border: 'none', outline: 'none', width: '100%' }}
                                    placeholder="Search"
                                    type="Search Filter"
                                    value={searchType}
                                    name="saerch"
                                    // icons={<AiOutlineSearch className='w-5 h-5 text-[#280822]' />}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeSearchType(e)}
                                />
                                <AiOutlineSearch className='w-5 h-5 text-[#280822] cursor-pointer' />
                            </div>
                            <div className="flex flex-col justify-start items-start gap-2 w-full mt-2">
                                {
                                    filteredItems?.map((itemType: any, index: number) => (
                                        <div key={index} className="flex flex-row justify-start items-start gap-2">
                                            <input id={`itemType-${index}`} type="checkbox" value={itemType.id} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " onChange={selectedItemsChecbox} />
                                            <p className="text-black">{itemType.name}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-row justify-start items-center w-full cursor-pointer">
                            <input id="brand-checkbox" type="checkbox" value="" className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " onChange={handleChange} />
                            <button className="cursor-pointer flex flex-row justify-between items-center pl-2 w-full" onClick={() => handleOpen('brand')}>
                                <label htmlFor="brand-checkbox" className="cursor-pointer text-left w-full py-3 ml-2 text-sm font-medium text-gray-900 ">Brand</label>
                                <MdKeyboardArrowRight className="w-5 h-5 text-black" />
                            </button>
                        </div>
                        <div className="flex flex-row justify-start items-center w-full cursor-pointer">
                            <input id="type-checkbox" type="checkbox" value="" className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " onChange={handleChange} />
                            <button className="cursor-pointer flex flex-row justify-between items-center pl-2 w-full" onClick={() => handleOpen('type')}>
                                <label htmlFor="type-checkbox" className="cursor-pointer text-left w-full py-3 ml-2 text-sm font-medium text-gray-900 ">Type</label>
                                <MdKeyboardArrowRight className="w-5 h-5 text-black" />
                            </button>
                        </div>
                    </>
                )
            }
        </div>
    )
}