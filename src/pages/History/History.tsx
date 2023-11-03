import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { CustomFilter, CustomSelect, ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/Tab1.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useTransactionStore from '../../context/transaksi';
import React from 'react';
import useAuth from '../../context/auth';
import clsx from 'clsx';
const History: React.FC = () => {
  const { items , fetchItems, fetchItemsWithParams } = useItemStore();
  const [search, setSearch] = useState('');
  const { token } = useAuth();
  const [sort, setSort] = useState('');
  const { fetchTransactions, transactions, fetchTransactionsWithParams, meta } = useTransactionStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [stockInOut, setStockInOut] = useState('');
  const onChangeSelectInOut = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStockInOut(event.target.value);
    fetchTransactionsWithParams({
      sort: stockInOut,
      type: event.target.value,
      token: token
    });
  };

  const onChangeSelectSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    fetchTransactionsWithParams({
      sort: event.target.value,
      type: stockInOut,
      token: token
    });
  }

  const fetch = async () => {
    await fetchTransactions(token);
  }
  useEffect(() => {
    fetch();
  }, [fetchItems])

  const filteredItems = transactions?.filter((item: any) => item?.note?.toLowerCase().includes(search.toLowerCase()));


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch(value);
  };

  const handleNextPage = (page: number) => {
    setCurrentPage(page);
    fetchItemsWithParams(page, itemsPerPage, '', '', sort);
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
          <h1 className='text-2xl font-extrabold text-[#280822]'>Stok Barang Toko</h1>
        </header>
        <div className='w-full py-2 px-5 rounded-md flex flex-row justify-between items-center bg-[#EFEFEF]'>
          <input
            style={{ backgroundColor: '#EFEFEF', border: 'none', outline: 'none', width: '100%' }}
            placeholder="Search"
            type="Search"
            value={search}
            name="saerch"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
          />
          <AiOutlineSearch className='w-5 h-5 text-[#280822] cursor-pointer' />
        </div>

        <div className='w-full flex flex-row  gap-10 justify-between items-center mt-5'>
          <CustomSelect onChange={onChangeSelectInOut} options={[
            {
              value: '',
              label: 'Filter'
            },
            {
              value: 'in',
              label: 'Stock In'
            },
            {
              value: 'out',
              label: 'Stock Out'
            },
          ]} />
          <CustomSelect onChange={onChangeSelectSort} />
        </div>
        <div className='w-full flex flex-row justify-end items-center mt-5 gap-2'>
          <PiTrashSimpleLight className="w-5 h-5 text-black float-right" />
        </div>
        <div className='flex flex-col gap-4 justify-start items-center w-full mt-5 h-full overflow-y-scroll'>
          {
            filteredItems?.map((item: any, index: any) =>
            (
              <React.Fragment key={index}>
                <ListItemBox
                  histroy={true}
                  note={item?.note}
                  userName={item?.user_name}
                  createdAt={item?.created_at}
                  detail={item?.details}
                  paymentMethod={item?.payment_method}
                  harga={item?.total_price} detailId={item?.id} />
              </React.Fragment>
            )
            )
          }
        </div>
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
      </div>
    </IonContent>
  );
};

export default History;
