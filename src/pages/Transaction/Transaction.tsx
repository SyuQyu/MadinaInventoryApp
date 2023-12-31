import { IonContent, IonRouterLink, IonToast } from '@ionic/react';
import { InputCustom, ListItemBox } from '../../components';
import '../../theme/pages/styles.css';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai'
import useItemStore from '../../context/item';
import useTransaksiStore from '../../context/transaksi';
import React from 'react';
import { CustomBasicSelect } from '../../components';
import useAuth from '../../context/auth';

const Transaction: React.FC = () => {
    const { items, meta, fetchItems } = useItemStore();
    const { token } = useAuth();
    const { setSelectedItem, getSelectedItemById, selectedItems, deleteSelectedItem, fetchTransactions, transactions, addTransaction, deleteAllSelectedItems } = useTransaksiStore();
    const [note, setNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('tunai');
    const [sort, setSort] = useState('');
    const [success, setSuccess] = useState(false);
    const [quantityItem, setQuantityItem] = useState(0);
    const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
    };

    const fetch = async () => {
        await fetchItems();
        await fetchTransactions(token);
    }

    const onClick = (type: string, id: number) => {
        const item = getSelectedItemById(id);

        if (item?.qty === 0) return;

        if (type === 'plus') {
            setSelectedItem({ id: id, qty: 1 })
        } else if (type === 'minus') {
            setSelectedItem({ id: id, qty: -1 })
        }
    }

    const deletedOnClick = (id: any) => {
        deleteSelectedItem(id);
    }

    const selectedIds = selectedItems.map(item => item.id);
    const filteredItems = items.filter((item: any) => selectedIds.includes(item.id));

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const response: any = addTransaction({ items: selectedItems, payment_method: paymentMethod, note: note }, token)

        if (response) {
            setSuccess(true);
            setPaymentMethod('');
            setNote('');
            deleteAllSelectedItems();
        }
    }

    const paymentMethods = [
        { value: 'tunai', label: 'Tunai' },
        { value: 'non-tunai', label: 'Non Tunai' }
    ];

    const handleInputChangeSelect = (value: any) => {
        setPaymentMethod(value.value);
    }

    useEffect(() => {
        fetch();
        console.log(items, transactions)
    }, [fetchItems])

    return (
        <IonContent fullscreen={false}>
            <div
                className={`md:px-10 md:py-10 ${filteredItems.length > 0 ? 'mb-20' : ''} px-2 py-5 w-full h-full flex flex-col`}>
                <header className='mb-6'>
                    <h1 className='text-2xl font-bold text-[#280822]'>Transaksi</h1>
                </header>
                <div
                    className='w-full rounded-md border border-slate-400 mb-6 p-4 flex flex-col justify-between gap-4 items-center'>
                    <div className='w-full flex flex-row justify-between items-center'>
                        <p>
                            Tambah Barang
                        </p>
                        <IonRouterLink routerLink={`/transaksi/list-item`} className="text-black">
                            <AiOutlinePlus className="w-5 h-5 text-black float-right" />
                        </IonRouterLink>
                    </div>
                    {
                        filteredItems.map((item, index) =>
                        (
                            <React.Fragment key={index}>
                                <ListItemBox
                                    kode={item?.code}
                                    deletedOnClick={() => deletedOnClick(item.id)}
                                    onClick={onClick}
                                    quantityItem={getSelectedItemById(item.id)?.qty}
                                    setQuantityItem={setQuantityItem}
                                    itemName={item?.name}
                                    qty={item?.stock}
                                    tipe={item?.item_type?.name}
                                    merk={item?.brand?.name}
                                    harga={item?.price}
                                    detailId={item?.id}
                                    withLink={false} />
                            </React.Fragment>
                        ))
                    }
                </div>
                <CustomBasicSelect
                    label="Pilih Tipe Pembayaran"
                    name={"tipe_pembayaran"}
                    data={paymentMethods}
                    value={paymentMethod}
                    onChange={handleInputChangeSelect}
                    placeHolder="Pilih Tipe Pembayaran" />
                <div className='mb-4' />
                <InputCustom
                    label="Note"
                    labelPlacement="floating"
                    placeholder="Masukkan catatan"
                    fill="outline"
                    type="textarea"
                    value={note}
                    onIonChange={(e: CustomEvent) => setNote(e.detail.value!)}
                />
                <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)}
                    className='w-full bg-[#280822] text-white rounded-xl py-2 px-4 mt-4'>
                    Submit
                </button>
            </div>
            <IonToast
                isOpen={success}
                position="top"
                onDidDismiss={() => setSuccess(false)}
                message="Transaksi berhasil dibuat"
                duration={5000}
                color="success"
            />
        </IonContent>
    );
};

export default Transaction;
