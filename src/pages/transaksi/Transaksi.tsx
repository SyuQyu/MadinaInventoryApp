import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { CustomFilter, CustomSelect, ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/Tab1.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useTransaksiStore from '../../context/transaksi';
import React from 'react';
import useAuth from '../../context/auth';
const Transaksi: React.FC = () => {
  const { items, meta, fetchItems } = useItemStore();
  const { token } = useAuth();
  const { setSelectedItem, getSelectedItemById, selectedItems, deleteSelectedItem, fetchTransactions, transactions, addTransaction } = useTransaksiStore();
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [sort, setSort] = useState('');
  const [quantityItem, setQuantityItem] = useState(0);
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };
  const fetch = async () => {
    await fetchItems();
    await fetchTransactions();
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

  const selectedIds = selectedItems.map(item => item.id);
  const filteredItems = items.filter(item => selectedIds.includes(item.id));

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    await addTransaction({ items: selectedItems, payment_method: paymentMethod, note: note }, token)
  }
  useEffect(() => {
    fetch();
    console.log(items, transactions)
  }, [fetchItems])
  return (
    <IonContent fullscreen={false}>
      <div className='md:px-10 md:py-10 px-2 py-5 w-full h-full flex flex-col'>
        <header className='mb-6'>
          <h1 className='text-2xl font-extrabold text-[#280822]'>Transaksi</h1>
        </header>
        <div className='w-full rounded-xl shadow-xl mb-6 p-4 flex flex-col justify-between gap-4 items-center'>
          <div className='w-full flex flex-row justify-between items-center'>
            <p>
              Add Items
            </p>
            <IonRouterLink routerLink={`/transaksi/list-item`} className="text-black">
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
        <InputCustom
          label="Payment Method"
          labelPlacement="floating"
          placeholder="Payment Method"
          fill="outline"
          type="text"
          value={paymentMethod}
          onIonChange={(e: CustomEvent) => setPaymentMethod(e.detail.value!)}
        />
        <div className='mb-4' />
        <InputCustom
          label="Note"
          labelPlacement="floating"
          placeholder="Note"
          fill="outline"
          type="text"
          value={note}
          onIonChange={(e: CustomEvent) => setNote(e.detail.value!)}
        />
        <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)} className='w-full bg-[#280822] text-white rounded-xl py-2 px-4 mt-4'>
          submit
        </button>
      </div>
    </IonContent>
  );
};

export default Transaksi;
