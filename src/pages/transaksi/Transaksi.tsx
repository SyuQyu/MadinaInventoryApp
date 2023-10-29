import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { CustomFilter, CustomSelect, ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/Tab1.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useTransaksiStore from '../../context/transaksi';
import React from 'react';
const Transaksi: React.FC = () => {
  const { items, meta, fetchItems } = useItemStore();
  const { selectedItems } = useTransaksiStore();
  const [note, setNote] = useState('');
  const [sort, setSort] = useState('');
  const [quantityItem, setQuantityItem] = useState(0);
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };
  const fetch = async () => {
    await fetchItems();
  }
  const onClick = (type: string, id: number) => {
    if (type === 'plus') {
      setQuantityItem(quantityItem + 1);
    } else if (type === 'minus') {
      setQuantityItem(quantityItem - 1);
    }
  }
  const selectedIds = selectedItems.map(item => item.idItem);
  const filteredItems = items.filter(item => selectedIds.includes(item.id));
  useEffect(() => {
    fetch();
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
                <ListItemBox kode={item?.code} onClick={onClick} quantityItem={quantityItem} itemName={item?.name} qty={item?.stock} tipe={item?.item_type?.name} merk={item?.brand?.name} harga={item?.price} detailId={item?.id} withLink={false} />
              </React.Fragment>
            )
            )
          }
        </div>
        <InputCustom
          label="Note"
          labelPlacement="floating"
          placeholder="Note"
          fill="outline"
          type="text"
          value={note}
          onIonChange={(e: CustomEvent) => setNote(e.detail.value!)}
        />
      </div>
    </IonContent>
  );
};

export default Transaksi;
