import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/Tab1.css';
import { useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
const Tab1: React.FC = () => {
  const [search, setSearch] = useState('');
  return (
    <IonContent fullscreen={false}>
      <div className='md:px-10 md:py-10 px-2 py-5 w-full h-full flex flex-col'>
        <header className='mb-6'>
          <h1 className='text-2xl font-extrabold text-[#280822]'>Stok Barang Toko</h1>
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
        <div className='w-full flex flex-row justify-between items-center mt-5'>

        </div>
        <div className='w-full flex flex-row justify-end items-center mt-5 gap-2'>
          <AiOutlinePlus className="w-5 h-5 text-black float-right" />
          <PiTrashSimpleLight className="w-5 h-5 text-black float-right" />
        </div>
        <div className='flex flex-col gap-4 justify-start items-center w-full mt-5 h-full overflow-y-scroll'>
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
          <ListItemBox itemName={'barang1'} qty={'10'} tipe={'riot'} merk={'marga emas'} harga={'100.000'} detailId={'1'} />
        </div>
      </div>
    </IonContent>
  );
};

export default Tab1;
