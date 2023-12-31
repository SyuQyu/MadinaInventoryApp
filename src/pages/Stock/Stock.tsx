import {
    IonContent,
    IonRouterLink,
    IonSpinner,
    IonToast,
} from '@ionic/react';
import { CustomFilter, CustomSelect, ListItemBox } from '../../components';
import '../../theme/pages/styles.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useFilterStore from '../../context/filterTransaksi';
import React from 'react';
import FilterContent from './FilterContent';
import useAuth from '../../context/auth';
import clsx from 'clsx';
import { FiInbox } from "react-icons/fi";
import Alert from "../../components/Alert/Alert";
import { LiaTimesSolid } from "react-icons/lia";

const Stock: React.FC = () => {
    const { brandSelected, typeSelected, clearData } = useFilterStore();
    const { token, dataUser } = useAuth();
    const { items, meta, fetchItems, fetchItemsWithParams, deleteItem } = useItemStore();
    const { brand, type } = useFilterStore();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [openFilter, setOpenFilter] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [searchBrand, setSearchBrand] = useState('');
    const [deleteData, setDeleteData] = useState(false);
    const [selectedDeleteData, setSelectedDeleteData] = useState([] as any);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);

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
            setLoading(false);
        }
        return res;
    }

    useEffect(() => {
        fetch();
    }, [fetchItems])

    console.log(meta)

    const filteredItems = items?.filter(item => item?.name?.toLowerCase().includes(search.toLowerCase()));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setSearch(value);
    };

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

    const handleChangeDelete = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setDeleteResults([]);
        if (checked) {
            setSelectedDeleteData((prevData: any) => [...prevData, value]);
        } else {
            setSelectedDeleteData((prevData: any) => prevData.filter((item: any) => item !== value));
        }
        console.log(selectedDeleteData);
    };

    const handleNextPage = (page: number) => {
        setCurrentPage(page);
        fetchItemsWithParams(page, itemsPerPage, '', '', sort);
    };

    const [deleteResults, setDeleteResults] = useState([] as any);

    const deleteSelectedData = async () => {
        const results = await Promise.all(
            selectedDeleteData.map(async (item: any) => {
                const res = await deleteItem(item, token);
                return { id: item, response: res };
            })
        );
        return results;
    };

    const handleOpenDeleteData = async () => {
        setDeleteData(!deleteData);

        if (selectedDeleteData.length > 0) {
            setIsOpen(true);
            setDeleteData(true);
        }
    };

    const handleDeleteStock = async () => {
        const res = await deleteSelectedData();

        if (res.length > 0) {
            setDeleteResults(res);
        }

        console.log(res)

        if (res?.some((res: any) => res?.response?.message === 'Barang berhasil dihapus.')) {
            console.log('res masuk true')
            setSelectedDeleteData([]);
            console.log(deleteResults)
            setSuccess(true);
            fetch();
        } else if (res?.some((res: any) => res?.response?.message === 'Barang tidak dapat dihapus karena sudah digunakan.')) {
            console.log('res masuk false')
            setSelectedDeleteData([]);
            console.log(deleteResults)
            setFailed(true);
        }
    }

    const pageNumbers = Array.from({ length: meta.last_page }, (_, i) => i + 1)
        .filter((page) => {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(meta.last_page, startPage + 4);
            return page >= startPage && page <= endPage;
        });

    return (
        <IonContent fullscreen={false}>
            <div className='md:px-10 md:py-10 px-2 pt-5 w-full h-full flex flex-col'>
                <header className='mb-6'>
                    <h1 className='text-2xl font-bold text-[#280822]'>Stok Barang Toko</h1>
                </header>
                <div className='w-full py-2 px-5 rounded-md flex flex-row justify-between items-center bg-zinc-100'>
                    <input
                        className="bg-zinc-100 border-0 outline-0 w-full"
                        placeholder="Cari berdasarkan nama barang"
                        type="text"
                        value={search}
                        name="search"
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
                            <FilterContent valueOpener={openFilter} setValueOpener={setOpenFilter}
                                handleInputChange={() => handleOpenFilter} />
                        </div>
                    ) : (
                        <>
                            <div className='w-full flex flex-row justify-between items-center mt-5 gap-2'>
                                {
                                    brandSelected.length > 0 || typeSelected.length > 0 ? (
                                        <div
                                            className="cursor-pointer relative w-full flex-col justify-center items-center gap-2 h-full">
                                            <div onClick={resetFilter}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center focus:outline-none flex flex-row w-1/2 justify-center items-center p-1">
                                                Clear Filter
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='md:w-1/4 w-1/2'>
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
                                    )
                                }
                                <div className='w-full flex flex-row justify-end items-center gap-2'>
                                    {
                                        +dataUser?.role_id === 1 ? (
                                            <>
                                                {deleteData ? (
                                                    <LiaTimesSolid onClick={handleOpenDeleteData}
                                                        className="w-5 h-5 cursor-pointer text-black float-right" />
                                                ) : null}
                                                <IonRouterLink routerLink={`stok/create`} className="text-black">
                                                    <AiOutlinePlus className="w-5 h-5 text-black float-right" />
                                                </IonRouterLink>
                                                <PiTrashSimpleLight onClick={handleOpenDeleteData}
                                                    className={`w-5 h-5 cursor-pointer text-black float-right ${!deleteData ? 'opacity-100' : ''} ${selectedDeleteData.length > 0 ? 'pointer-events-auto' : `${deleteData ? 'pointer-events-none' : ''} opacity-50`}`} />
                                            </>
                                        ) : null
                                    }
                                </div>
                            </div>
                            {
                                loading ? (
                                    <div className="flex items-center justify-center h-screen">
                                        <IonSpinner />
                                    </div>
                                ) : (
                                    <div
                                        className='flex flex-col gap-4 justify-start items-center w-full mt-5 h-full overflow-y-scroll'>
                                        {
                                            filteredItems.length > 0 ? (
                                                filteredItems.map((item, index) =>
                                                (
                                                    <React.Fragment key={index}>
                                                        <ListItemBox handleChangeDelete={handleChangeDelete}
                                                            deleteData={deleteData}
                                                            kode={item?.code}
                                                            itemName={item?.name}
                                                            qty={item?.stock}
                                                            tipe={item?.item_type?.name}
                                                            merk={item?.brand?.name}
                                                            harga={item?.price}
                                                            detailId={item?.id} />
                                                    </React.Fragment>
                                                )
                                                )
                                            ) : (
                                                <div className='w-full flex flex-col justify-center items-center'>
                                                    <FiInbox className='w-20 h-20 text-[#280822]' />
                                                    <p className='text-lg font-bold text-[#280822]'>Data Kosong</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                            <div
                                className={clsx("justify-center items-center py-3", meta?.first_page !== meta?.last_page ? 'flex' : 'hidden')}>
                                {
                                    meta?.first_page !== meta?.last_page ? (
                                        <nav aria-label="Page navigation example">
                                            <ul className="flex items-center -space-x-px text-sm mb-0">
                                                <li>
                                                    <p onClick={() => currentPage !== meta?.first_page ? handleNextPage(currentPage - 1) : null}
                                                        className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 ">
                                                        <span className="sr-only">Previous</span>
                                                        <svg className="w-2.5 h-2.5" aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 6 10">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                strokeLinejoin="round" strokeWidth="2"
                                                                d="M5 1 1 5l4 4" />
                                                        </svg>
                                                    </p>
                                                </li>
                                                {pageNumbers.map((page) => (
                                                    <li key={page}>
                                                        <p className={clsx('cursor-pointer flex items-center justify-center px-3 h-8 leading-tight ', page === currentPage ? 'text-white bg-[#280822] border-[#280822]' : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700')}
                                                            onClick={() => handleNextPage(page)}>{page}</p>
                                                    </li>
                                                ))}
                                                <li>
                                                    <p onClick={() => currentPage !== meta?.last_page ? handleNextPage(currentPage + 1) : null}
                                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 ">
                                                        <span className="sr-only">Next</span>
                                                        <svg className="w-2.5 h-2.5" aria-hidden="true"
                                                            xmlns="http://www.w3.org/2000/svg" fill="none"
                                                            viewBox="0 0 6 10">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                strokeLinejoin="round" strokeWidth="2"
                                                                d="m1 9 4-4-4-4" />
                                                        </svg>
                                                    </p>
                                                </li>
                                            </ul>
                                        </nav>
                                    ) : null}
                            </div>
                        </>
                    )
                }
            </div>
            {
                success ? (
                    <IonToast
                        isOpen={success}
                        position="top"
                        onDidDismiss={() => setSuccess(false)}
                        message={`Item dengan id ${deleteResults.map((item: any) => item.id)} berhasil dihapus`}
                        duration={5000}
                        color="success"
                    />
                ) : (
                    <IonToast
                        isOpen={failed}
                        position="top"
                        onDidDismiss={() => setFailed(false)}
                        message={`Item dengan id ${deleteResults.map((item: any) => item.id)} gagal dihapus`}
                        duration={5000}
                        color="danger"
                    />
                )
            }

            {
                isOpen ? (
                    <Alert
                        header={'Konfirmasi Hapus'}
                        message={'Hapus barang yang dipilih?'}
                        handleConfirm={async () => await handleDeleteStock()}
                        isOpen={isOpen}
                        handleDismiss={() => setIsOpen(false)}
                    />
                ) : null
            }
        </IonContent>
    );
};

export default Stock;
