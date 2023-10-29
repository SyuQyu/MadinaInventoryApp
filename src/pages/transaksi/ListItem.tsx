import { IonContent, IonHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { CustomFilter, CustomSelect, ExploreContainer, InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/Tab1.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai'
import { PiTrashSimpleLight } from 'react-icons/pi'
import useItemStore from '../../context/item';
import useTransactionStore from '../../context/transaksi';
import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
const ListItem: React.FC = () => {
    const { items, meta, fetchItems } = useItemStore();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const { setSelectedItem } = useTransactionStore();
    // const [quantityItem, setQuantityItem] = useState([{
    //     id: 0,
    //     quantity: 0
    // }]);
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
    };
    const fetch = async () => {
        await fetchItems();
    }

    // const handleInputChange = (value: any, name: any, index: number) => {
    //     const list: any = [...quantityItem];
    //     list[index][name] = value;
    //     setQuantityItem(list);
    // };

    const onClick = (type: string, id: number) => {
        if (type === 'plus') {
            setSelectedItem({idItem: id, qty: 1})
        } else if (type === 'minus') {
            setSelectedItem({idItem: id, qty: 1})
        }
    }

    useEffect(() => {
        fetch();
    }, [fetchItems])
    return (
        <IonContent fullscreen={false}>
            <div className='md:px-10 md:py-10 px-2 py-5 w-full h-full flex flex-col'>
                <header className='mb-6 flex flex-row justify-between items-center w-full'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Transaksi</h1>
                    <div className="flex flex-row justify-between items-center">
                        <IonRouterLink routerLink={`/transaksi`} className="w-full text-black">
                            <div className="w-full text-black flex flex-row gap-1 items-center">
                                <p>
                                    Done
                                </p>
                                <IoIosArrowForward className="w-4 h-4" />
                            </div>
                        </IonRouterLink>
                    </div>
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
                <div className='w-full flex flex-row  gap-10 justify-between items-center mt-5'>
                    <CustomFilter />
                    <CustomSelect onChange={onChange} />
                </div>
                <div className='flex flex-col gap-4 justify-start items-center w-full mt-5 h-full overflow-y-scroll'>
                    {
                        items.map((item, index) =>
                        (
                            <React.Fragment key={index}>
                                <ListItemBox onClick={onClick} withLink={false} kode={item?.code} itemName={item?.name} qty={item?.stock} tipe={item?.item_type?.name} merk={item?.brand?.name} harga={item?.price} detailId={item?.id} />
                            </React.Fragment>
                        )
                        )
                    }
                </div>
            </div>
        </IonContent>
    );
};

export default ListItem;
