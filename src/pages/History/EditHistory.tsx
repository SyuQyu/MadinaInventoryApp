import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToast, IonToolbar } from '@ionic/react';
import { CustomFilter, CustomSelect, ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/styles.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useTransaksiStore from '../../context/transaksi';
import React from 'react';
import { CustomBasicSelect } from '../../components';
import useAuth from '../../context/auth';
import { useParams } from 'react-router';
import { IoIosArrowBack } from 'react-icons/io';
const EditHistory: React.FC = () => {
  const { items, meta, fetchItems } = useItemStore();
  const { token, dataUser } = useAuth();
  const { setSelectedItem, getSelectedItemById, selectedItems, updateTransaction, deleteSelectedItem, fetchTransactions, transactions, addTransaction, deleteAllSelectedItems, transactionDetails } = useTransaksiStore();
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [sort, setSort] = useState('');
  const [success, setSuccess] = useState(false);
  const [quantityItem, setQuantityItem] = useState(0);
  const { id: idParams } = useParams<{ id: string }>();
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };
  const fetch = async () => {
    await fetchItems();
    await fetchTransactions(token);
  }
  const onClick = (type: string, id: number) => {
    if (type === 'plus') {
      setSelectedItem({ id: id, qty: 1 })
    } else if (type === 'minus') {
      setSelectedItem({ id: id, qty: -1 })
    }
  }

  const deletedOnClick = (id: number) => {
    deleteSelectedItem(id);
  }
  const itemDetails = transactionDetails(parseInt(idParams));
  const selectedIdOldData: any = itemDetails?.details.map((item: any) => item.item_id)
  const selectedIdAddNewData = selectedItems.map(item => item.id);
  const filteredItems = items?.filter(item => {
    return selectedIdAddNewData.includes(item.id)
  });
  // const reInsertSelectedItem = () => {
  //   itemDetails?.details.map((item: any) => setSelectedItem({ id: item.item_id, qty: item.qty }))
  // }

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(idParams, selectedItems, paymentMethod, note, token, 'edit history')
    const response: any = updateTransaction(parseInt(idParams), { items: selectedItems, payment_method: paymentMethod !== '' ? paymentMethod : itemDetails?.payment_method, note: note ? note : itemDetails?.note }, token)
    if (response) {
      setSuccess(true);
      fetchTransactions(token)
    }

  }

  const pembayaran = [
    { value: 'tunai', label: 'Tunai' },
    { value: 'non-tunai', label: 'Non Tunai' }
  ];

  const handleInputChangeSelect = (value: any) => {
    setPaymentMethod(value.value);
  }

  const handleDeleteAllSelectedItems = () => {
    deleteAllSelectedItems();
    fetch();
  }

  useEffect(() => {
    fetch();
  }, [])

  return (
    <IonContent fullscreen={false}>
      <div className='md:px-10 md:py-10 px-2 py-5 w-full h-full flex flex-col'>
        <header className='mb-6 flex flex-col justify-between items-start gap-1'>
          <IonRouterLink routerLink={`/history/detail/${idParams}`} onClick={() => handleDeleteAllSelectedItems()} className="w-full text-black">
            <div className="w-full text-black flex flex-row gap-1 items-center">
              <IoIosArrowBack className="w-4 h-4" />
              <p>
                Back
              </p>
            </div>
          </IonRouterLink>
          <h1 className='text-2xl font-extrabold text-[#280822]'>Edit History</h1>
        </header>
        <div className='w-full rounded-xl shadow-xl mb-6 p-4 flex flex-col justify-between gap-4 items-center'>
          <div className='w-full flex flex-row justify-between items-center'>
            <p>
              Edit Items
            </p>
            <IonRouterLink routerLink={`/history/edit/list-item/${idParams}`} className="text-black">
              <AiOutlinePlus className="w-5 h-5 text-black float-right" />
            </IonRouterLink>
          </div>
          {
            filteredItems.map((item, index) =>
            (
              <React.Fragment key={index}>
                <ListItemBox kode={item?.code} deletedOnClick={() => deletedOnClick(item.id)} onClick={onClick} quantityItem={getSelectedItemById(item.id)?.qty} itemName={item?.name} qty={item?.stock} tipe={item?.item_type?.name} merk={item?.brand?.name} harga={item?.price} detailId={item?.id} withLink={false} />
              </React.Fragment>
            )
            )
          }
        </div>
        <CustomBasicSelect
          label="Pilih Tipe Pembayaran"
          name={"tipe_pembayaran"}
          data={pembayaran}
          defaultValue={itemDetails?.payment_method}
          value={paymentMethod}
          onChange={handleInputChangeSelect}
          placeHolder="Pilih Tipe Pembayaran" />
        <div className='mb-4' />
        <InputCustom
          label="Note"
          labelPlacement="floating"
          placeholder="Note"
          fill="outline"
          type="text"
          value={note ? note : itemDetails?.note}
          onIonChange={(e: CustomEvent) => setNote(e.detail.value!)}
        />
        <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)} className='w-full bg-[#280822] text-white rounded-xl py-2 px-4 mt-4'>
          submit
        </button>
        <div className="w-full h-[50px] bg-white text-xs text-white">
          y
        </div>
      </div>
      <IonToast
        isOpen={success}
        position="top"
        onDidDismiss={() => setSuccess(false)}
        message="Transaction berhasil diupdate"
        duration={5000}
        color="success"
      />
    </IonContent>
  );
};

export default EditHistory;
