import { IonContent, IonRouterLink, IonSpinner, IonToast } from '@ionic/react';
import { CustomSelect, ListItemBox } from '../../components';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useBrandStore from '../../context/brand';
import React from 'react';
import useAuth from '../../context/auth';
import clsx from 'clsx';

const Brand: React.FC = () => {
    const { token, dataUser } = useAuth();
    const { meta, brands, fetchBrands, fetchBrandsWithParams, deleteBrand } = useBrandStore();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(50);
    const [deleteData, setDeleteData] = useState(false);
    const [selectedDeleteData, setSelectedDeleteData] = useState([] as any);
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);
    const [loading, setLoading] = useState(true);
    const onChangeShow = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        const parsing = parseInt(event.target.value);
        setItemsPerPage(parsing);
        fetchBrandsWithParams(1, parsing);
    };
    const fetch = async () => {
        const res = await fetchBrands();
        if (brands.length > 0 || res) {
            setLoading(false);
        }
        return res;
    }

    useEffect(() => {
        fetch();
    }, [fetchBrands])

    console.log(meta)

    const filteredItems = brands?.filter(item => item?.name?.toLowerCase().includes(search.toLowerCase()));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setSearch(value);
    };

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
        fetchBrandsWithParams(page, itemsPerPage);
    };

    const [deleteResults, setDeleteResults] = useState([] as any);
    const handleOpenDeleteData = async () => {
        setDeleteData(!deleteData);
        console.log(deleteData);
        if (selectedDeleteData.length > 0) {
            if (!deleteData) return;

            console.log('delete');
            const deleteSelectedData = async () => {
                const results = await Promise.all(
                    selectedDeleteData.map(async (item: any) => {
                        const res = await deleteBrand(item, token);
                        return { id: item, response: res };
                    })
                );
                return results;
            };

            const res = await deleteSelectedData();

            if (res.length > 0) {
                setDeleteResults(res);
            }

            console.log(res)

            if (res?.some((res: any) => res?.response?.message === 'Brand berhasil dihapus')) {
                console.log('res masuk true')
                setSelectedDeleteData([]);
                console.log(deleteResults)
                setSuccess(true);
                fetch();
            } else if (res?.some((res: any) => res?.response?.message === 'Brand tidak dapat dihapus karena masih memiliki barang.')) {
                console.log('res masuk false')
                setSelectedDeleteData([]);
                console.log(deleteResults)
                setFailed(true);
            }
        }
    };

    const pageNumbers = Array.from({ length: meta.last_page }, (_, i) => i + 1)
        .filter((page) => {
            const startPage = Math.max(1, currentPage - 2);
            const endPage = Math.min(meta.last_page, startPage + 4);
            return page >= startPage && page <= endPage;
        });

    return (
        <IonContent fullscreen={false}>
            <div className='md:px-10 md:py-10 px-2 py-5 w-full h-full flex flex-col'>
                <header className='mb-6'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Daftar Merek</h1>
                </header>
                <div className='w-full py-2 px-5 rounded-md flex flex-row justify-between items-center bg-zinc-100'>
                    <input
                        className="bg-zinc-100 border-0 outline-0 w-full"
                        placeholder="Cari berdasarkan nama"
                        type="text"
                        value={search}
                        name="search"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <AiOutlineSearch className='w-5 h-5 text-[#280822] cursor-pointer' />
                </div>
                <>
                    <div className='w-full flex flex-row justify-between items-center mt-5 gap-2'>
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
                        <div className='w-full flex flex-row justify-end items-center gap-2'>
                            {
                                parseInt(dataUser?.role_id) === 1 ? (
                                    <>
                                        <IonRouterLink routerLink={`brands/create`} className="text-black">
                                            <AiOutlinePlus className="w-5 h-5 text-black float-right" />
                                        </IonRouterLink>
                                        <PiTrashSimpleLight onClick={handleOpenDeleteData} className="w-5 h-5 cursor-pointer text-black float-right" />
                                    </>
                                ) : null
                            }
                        </div>
                    </div>
                    {
                        loading ? (
                            <div className="ion-text-center h-screen">
                                <IonSpinner />
                            </div>
                        ) : (
                            <div className='flex flex-col gap-4 justify-start items-center w-full mt-5 h-full overflow-y-scroll'>
                                {
                                    filteredItems.map((item, index) =>
                                    (
                                        <React.Fragment key={index}>
                                            <ListItemBox handleChangeDelete={handleChangeDelete} deleteData={deleteData} itemName={item?.name} detailId={item?.id} withLink={false} brandType={true} urlBrandTypes={`/settings/brands/update`}/>
                                        </React.Fragment>
                                    )
                                    )
                                }
                            </div>
                        )
                    }
                    <div className={clsx("justify-center items-center mt-5", meta?.first_page !== meta?.last_page ? 'flex' : 'hidden')}>
                        {
                            meta?.first_page !== meta?.last_page ? (
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
                            ) : null}
                    </div>
                </>
            </div>
            {
                success ? (
                    <IonToast
                        isOpen={success}
                        position="top"
                        onDidDismiss={() => setSuccess(false)}
                        message={`Brand dengan id ${deleteResults.map((item: any) => item.id)} berhasil dihapus`}
                        duration={5000}
                        color="success"
                    />
                ) : (
                    <IonToast
                        isOpen={failed}
                        position="top"
                        onDidDismiss={() => setFailed(false)}
                        message={`Brand dengan id ${deleteResults.map((item: any) => item.id)} gagal dihapus`}
                        duration={5000}
                        color="danger"
                    />
                )
            }
        </IonContent >
    );
};

export default Brand;
