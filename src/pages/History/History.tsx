import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { CustomFilter, CustomSelect, ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/Tab1.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useTransactionStore from '../../context/transaksi';
import React from 'react';
const History: React.FC = () => {
  const { items, meta, fetchItems, fetchItemsWithParams } = useItemStore();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const { fetchTransactions, transactions, fetchTransactionsWithParams } = useTransactionStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    fetchTransactionsWithParams({
      sort: event.target.value
    });
  };
  const fetch = async () => {
    await fetchTransactions();
  }
  useEffect(() => {
    fetch();
  }, [fetchItems])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = transactions?.filter((item: any) => item?.note?.toLowerCase().includes(search.toLowerCase()));
  let currentItems = filteredItems?.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearch(value);
  };

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
          <CustomSelect onChange={onChange} options={[
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
          <CustomSelect onChange={onChange} />
        </div>
        <div className='w-full flex flex-row justify-end items-center mt-5 gap-2'>
          <PiTrashSimpleLight className="w-5 h-5 text-black float-right" />
        </div>
        <div className='flex flex-col gap-4 justify-start items-center w-full mt-5 h-full overflow-y-scroll'>
          {
            currentItems?.map((item: any, index: any) =>
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
        <div className="flex justify-center items-center mt-5">
          <ul className="flex">
            {pageNumbers.map((number) => (
              <li key={number} className={`mx-1 ${number === currentPage ? 'text-blue-500' : 'text-black'}`}>
                <button onClick={() => paginate(number)}>{number}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </IonContent>
  );
};

export default History;
