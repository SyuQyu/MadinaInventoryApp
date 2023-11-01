import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { CustomFilter, CustomSelect, ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/Tab1.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useTransactionStore from '../../context/transaksi';
import useFilterStore from '../../context/filter';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import FilterContent from './FilterContent';
const ListItem: React.FC = () => {
    const { items, meta, fetchItems, fetchItemsWithParams } = useItemStore();
    const { brandSelected, typeSelected, clearData } = useFilterStore();
    const { brand, type } = useFilterStore();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [openFilter, setOpenFilter] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [searchBrand, setSearchBrand] = useState('');
    const { setSelectedItem, getSelectedItemById } = useTransactionStore();
    // const [quantityItem, setQuantityItem] = useState([{
    //     id: 0,
    //     quantity: 0
    // }]);
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
    };
    const fetch = async () => {
        await fetchItems();
    }

    // const handleInputChange = (value: any, name: any, index: number) => {
    //     const list: any = [...quantityItem];
    //     list[index][name] = value;
    //     setQuantityItem(list);
    // };

    const onClick = (type: string, id: number) => {
        if (type === 'plus') {
            setSelectedItem({ id: id, qty: 1 })
        } else if (type === 'minus') {
            setSelectedItem({ id: id, qty: -1 })
        }
    }
    const handleOpenFilter = () => {
        setOpenFilter(!openFilter)
        console.log('ruuned')
    }

    const resetFilter = () => {
        setSearchType('');
        setSearchBrand('');
        setSort('');
        fetch();
        clearData();
        console.log(brandSelected.length > 0, typeSelected.length > 0)
    }

    useEffect(() => {
        fetch();
    }, [fetchItems])
    return (
        <IonContent fullscreen={false}>
            <div className='md:px-10 md:py-10 px-2 py-5 w-full h-full flex flex-col'>
                <header className='mb-6 flex flex-row justify-between items-center w-full'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Transaksi</h1>
                    <div className="flex flex-row justify-between items-center">
                        <IonRouterLink onClick={resetFilter} routerLink={`/transaksi`} className="w-full text-black">
                            <div className="w-full text-black flex flex-row gap-1 items-center">
                                <p>
                                    Done
                                </p>
                                <IoIosArrowForward className="w-4 h-4" />
                            </div>
                        </IonRouterLink>
                    </div>
                </header>
                <InputCustom
                    label="Search"
                    labelPlacement="floating"
                    placeholder="Search"
                    fill="outline"
                    type="Search"
                    value={search}
                    icons={<AiOutlineSearch className='w-5 h-5 text-[#280822]' />}
                    onIonChange={(e: CustomEvent) => setSearch(e.detail.value!)}
                />
                <div className='w-full flex flex-row  gap-10 justify-between items-center mt-5'>
                    <CustomFilter onClick={handleOpenFilter} value={openFilter} onChange={onChange} />
                    <CustomSelect onChange={onChange} />
                </div>
                {
                    openFilter ? (
                        <div className='mt-4 px-4'>
                            <FilterContent valueOpener={openFilter} setValueOpener={setOpenFilter} handleInputChange={() => handleOpenFilter} />
                        </div>
                    ) : (
                        <>
                            <div className='w-full flex flex-row justify-between items-center mt-5 gap-2'>
                                {
                                    brandSelected.length > 0 || typeSelected.length > 0 ? (
                                        <div className="cursor-pointer relative w-full flex-col justify-center items-center gap-2 h-full">
                                            <div onClick={resetFilter} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center focus:outline-none flex flex-row w-1/2 justify-center items-center p-1">
                                                Clear Filter
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </div>
                            <div className='flex flex-col gap-4 justify-start items-center w-full mt-5 h-full overflow-y-scroll'>
                                {
                                    items.map((item, index) =>
                                    (
                                        <React.Fragment key={index}>
                                            <ListItemBox onClick={onClick} withLink={false} quantityItem={getSelectedItemById(item.id)?.qty} kode={item?.code} itemName={item?.name} qty={item?.stock} tipe={item?.item_type?.name} merk={item?.brand?.name} harga={item?.price} detailId={item?.id} />
                                        </React.Fragment>
                                    )
                                    )
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </IonContent>
    );
};

export default ListItem;
