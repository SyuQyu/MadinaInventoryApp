import { IonContent, IonHeader, IonPage, IonRouterLink, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { CustomFilter, CustomSelect, ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/Tab1.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useTransactionStore from '../../context/transaksi';
import useFilterStore from '../../context/filterTransaksi';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import FilterContent from './FilterContent';
import clsx from 'clsx';
const ListItem: React.FC = () => {
    const { items, meta, fetchItems, fetchItemsWithParams } = useItemStore();
    const { brandSelected, typeSelected, clearData } = useFilterStore();
    const { brand, type } = useFilterStore();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [openFilter, setOpenFilter] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [searchBrand, setSearchBrand] = useState('');
    const { setSelectedItem, getSelectedItemById } = useTransactionStore();
    const [loading, setLoading] = useState(true);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setSearch(value);
    };

    const onChangeShow = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        const parsing = parseInt(event.target.value);
        setItemsPerPage(parsing);
        fetchItemsWithParams(1, parsing, '', '', sort);
    };
    const onChangeSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        setSort(event.target.value);
        fetchItemsWithParams(1, itemsPerPage, '', '', event.target.value);
    };
    const fetch = async () => {
        const res = await fetchItems();
        if (items.length > 0 || res) {
            setLoading(false)
        }
        return res;
    }

    const handleNextPage = (page: number) => {
        setCurrentPage(page);
        fetchItemsWithParams(page, itemsPerPage, '', '', sort);
    };

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

    const pageNumbers = Array.from({ length: meta.last_page }, (_, i) => i + 1)
        .filter((page) => {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(meta.last_page, startPage + 4);
            return page >= startPage && page <= endPage;
        });

    const filteredItems = items?.filter(item => item?.name?.toLowerCase().includes(search.toLowerCase()));
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
                <div className='w-full py-2 px-5 rounded-md flex flex-row justify-between items-center bg-[#EFEFEF]'>
                    <input
                        style={{ backgroundColor: '#EFEFEF', border: 'none', outline: 'none', width: '100%' }}
                        placeholder="Search"
                        type="Search"
                        value={search}
                        name="saerch"
                        // icons={<AiOutlineSearch className='w-5 h-5 text-[#280822]' />}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <AiOutlineSearch className='w-5 h-5 text-[#280822] cursor-pointer' />
                </div>
                <div className='w-full flex flex-row  gap-10 justify-between items-center mt-5'>
                    <CustomFilter onClick={handleOpenFilter} value={openFilter} />
                    <CustomSelect onChange={onChangeSort} />
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
                                    ) : (
                                        <div className='w-full flex flex-row  gap-10 justify-between items-center'>
                                            <div className='w-1/2 md:block hidden'></div>
                                            <div className='md:w-1/4 w-1/2 flex justify-end items-end'>
                                                <CustomSelect onChange={onChangeShow} options={[
                                                    {
                                                        value: '',
                                                        label: 'Tampilkan'
                                                    },
                                                    {
                                                        value: '50',
                                                        label: '50'
                                                    },
                                                    {
                                                        value: '100',
                                                        label: '100'
                                                    },
                                                    {
                                                        value: '200',
                                                        label: '200'
                                                    },
                                                    {
                                                        value: meta?.total,
                                                        label: 'semua'
                                                    },
                                                ]} />
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            {
                                loading ? (
                                    <div className="ion-text-center h-screen">
                                        <IonSpinner />
                                    </div>
                                ) : (
                                    <div className='flex flex-col gap-4 justify-start items-center w-full mt-5 h-full overflow-y-scroll'>
                                        {
                                            filteredItems?.map((item, index) =>
                                            (
                                                <React.Fragment key={index}>
                                                    <ListItemBox onClick={onClick} withLink={false} quantityItem={getSelectedItemById(item.id)?.qty} kode={item?.code} itemName={item?.name} qty={item?.stock} tipe={item?.item_type?.name} merk={item?.brand?.name} harga={item?.price} detailId={item?.id} />
                                                </React.Fragment>
                                            )
                                            )
                                        }
                                    </div>
                                )
                            }
                            {
                                meta?.first_page !== meta?.last_page ? (
                                    <div className="flex justify-center items-center mt-5">
                                        <nav aria-label="Page navigation example">
                                            <ul className="flex items-center -space-x-px h-8 text-sm">
                                                <li>
                                                    <p onClick={() => currentPage !== meta?.first_page ? handleNextPage(currentPage - 1) : null} className="flex items-center justify-center px-3 md:h-8 h-6 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ">
                                                        <span className="sr-only">Previous</span>
                                                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                                        </svg>
                                                    </p>
                                                </li>
                                                {pageNumbers.map((page) => (
                                                    <li key={page}>
                                                        <p className={clsx('cursor-pointer flex items-center justify-center px-3 md:h-8 h-6 leading-tight ', page === currentPage ? 'text-white bg-[#280822] border-[#280822]' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700')} onClick={() => handleNextPage(page)}>{page}</p>
                                                    </li>
                                                ))}
                                                <li>
                                                    <p onClick={() => currentPage !== meta?.last_page ? handleNextPage(currentPage + 1) : null} className="flex items-center justify-center px-3 md:h-8 h-6 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ">
                                                        <span className="sr-only">Next</span>
                                                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                                        </svg>
                                                    </p>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                ) : null
                            }
                        </>
                    )
                }
            </div>
        </IonContent >
    );
};

export default ListItem;
