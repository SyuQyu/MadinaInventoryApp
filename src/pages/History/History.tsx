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
const History: React.FC = () => {
  const { items, meta, fetchItems, fetchItemsWithParams } = useItemStore();
  const [search, setSearch] = useState('');
  const { token } = useAuth();
  const [sort, setSort] = useState('');
  const { fetchTransactions, transactions, fetchTransactionsWithParams } = useTransactionStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [stockInOut, setStockInOut] = useState('');
  const onChangeSelectInOut = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    fetchTransactionsWithParams({
      sort: event.target.value,
      type: stockInOut,
      token: token
    });
  };

  const onChangeSelectSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStockInOut(event.target.value);
    fetchTransactionsWithParams({
      sort: sort,
      type: event.target.value,
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
      </div>
    </IonContent>
  );
};

export default History;
