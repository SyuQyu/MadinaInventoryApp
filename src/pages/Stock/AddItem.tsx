import React, { useEffect, useState } from "react";
import { CreateableCustomSelect, InputCustom } from "../../components";
import { IonContent, IonRouterLink, IonToast } from "@ionic/react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import useItem from "../../context/item";
import useAuth from "../../context/auth";
import useBrand from "../../context/brand";
import useItemType from "../../context/itemType";

interface Stock {
    code: string;
    name: string;
    description: string | null;
    price: number;
    stock: number;
    stock_min: number;
    item_type_id: number;
    brand_id: number;
    ukuran: string;
    jenis_type_id: number;
}

interface Option {
    readonly label: string;
    readonly value: number;
}

const AddItem = () => {
    const history = useHistory();
    const { createItem } = useItem();
    const { token } = useAuth();
    const { addBrand, brands, fetchBrands } = useBrand();
    const { addItemType, itemTypes, fetchItemTypes } = useItemType();
    const [success, setSuccess] = useState(false);
    const [valueBrands, setValueBrands] = useState();

    const initialStock: Stock = {
        code: "",
        name: "",
        price: 0,
        ukuran: "",
        stock: 0,
        stock_min: 0,
        brand_id: 0,
        item_type_id: 0,
        jenis_type_id: 0,
        description: "",
    };

    const [stocks, setStocks] = useState([{
        code: "",
        name: "",
        price: 0,
        size: "",
        stock: 0,
        stock_min: 0,
        brand_id: 0,
        item_type_id: 0,
        jenis_type_id: 0,
        description: "",
    }]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const list: any = [...stocks];
        list[index][name] = value;
        setStocks(list);
        console.log(value)
    };

    const handleInputChangeSelect = (name: any, value: any, index: any) => {
        const list: any = [...stocks];
        list[index][name] = value;
        setStocks(list);
        console.log(stocks, name, value, index, 'data stocks')
    }

    const handleAddStock = () => {
        setStocks([...stocks, {
            code: "",
            name: "",
            price: 0,
            size: "",
            stock: 0,
            stock_min: 0,
            brand_id: 0,
            item_type_id: 0,
            jenis_type_id: 0,
            description: "",
        }]);
    };

    const handleRemoveStock = (index: number) => {
        const list = [...stocks];
        list.splice(index, 1);
        setStocks(list);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(stocks);
        const data = stocks?.map((stock: any) => {
            return createItem(
                {
                    code: stock.code,
                    name: stock.name,
                    price: stock.price,
                    size: stock.size,
                    stock: stock.stock,
                    stock_min: stock.stock_min,
                    brand_id: stock.brand_id?.value,
                    item_type_id: stock.item_type_id?.value,
                    description: stock.description,
                },
                token
            );
        });

        if (data) {
            setSuccess(true);
        }
    };

    const [loading, setLoading] = useState(true);

    const fetch = async () => {
        await fetchBrands();
        await fetchItemTypes();
        setLoading(false);
    };

    useEffect(() => {
        fetch();
        console.log(itemTypes, brands);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <IonContent fullscreen={false} className="pb-10">
            <div className='md:px-10 md:py-10 px-2 py-5 h-full flex flex-col gap-4 w-full'>
                <header className='mb-2'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Barang Masuk</h1>
                </header>
                {stocks.map((stock, index) => (
                    <div key={index} className="flex flex-col gap-4 w-full">
                        <div className="flex flex-row gap-2 justify-start items-center">
                            <h2 className='text-lg font-extrabold text-[#280822]'>Form {index + 1}</h2>
                            {
                                index !== 0 ? (<button onClick={() => handleRemoveStock(index)}><AiFillMinusCircle className="w-5 h-5 text-red-500" /></button>) : null
                            }
                        </div>
                        <InputCustom
                            label="Kode"
                            labelPlacement="fixed"
                            placeholder="Ex: BRG-001"
                            type="text"
                            fill="outline"
                            name="code"
                            value={stock.code}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Nama"
                            labelPlacement="fixed"
                            placeholder="Masukkan nama"
                            type="text"
                            fill="outline"
                            name="name"
                            value={stock.name}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Harga"
                            labelPlacement="fixed"
                            placeholder="Masukkan harga"
                            type="number"
                            fill="outline"
                            name="price"
                            value={stock.price}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Stok"
                            labelPlacement="fixed"
                            placeholder="Masukkan stok"
                            type="number"
                            fill="outline"
                            name="stock"
                            value={stock.stock}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Stok Minimum"
                            labelPlacement="fixed"
                            placeholder="Masukkan stok minimum"
                            type="number"
                            fill="outline"
                            name="stock_min"
                            value={stock.stock_min}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Ukuran"
                            labelPlacement="fixed"
                            placeholder="Ex: 8mm x 12mm"
                            type="text"
                            fill="outline"
                            name="ukuran"
                            value={stock.size}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <CreateableCustomSelect
                            label="Pilih Merek"
                            name={"brand_id"}
                            data={brands}
                            value={stocks[index].brand_id}
                            onChange={handleInputChangeSelect}
                            index={index}
                            apiCall={addBrand}
                            placeHolder="Pilih Merek" />
                        <CreateableCustomSelect
                            label="Pilih Tipe Barang"
                            name={"item_type_id"}
                            data={itemTypes}
                            value={stocks[index].item_type_id}
                            onChange={handleInputChangeSelect}
                            index={index}
                            apiCall={addItemType}
                            placeHolder="Pilih Tipe Barang" />
                        <InputCustom
                            label="Deskripsi"
                            labelPlacement="fixed"
                            placeholder="Deskripsi"
                            type="textarea"
                            fill="outline"
                            name="description"
                            value={stock.description}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                    </div>
                ))}
                <button onClick={handleAddStock}><AiFillPlusCircle className="w-6 h-6 text-green-500 float-right" /></button>
                <div className="flex flex-row justify-between items-center gap-4">
                    <IonRouterLink routerLink="/stok" className="text-white text-center bg-red-500 rounded-lg w-1/2 md:w-1/2 py-2 px-10">
                        Batal
                    </IonRouterLink>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)} className='text-white bg-green-500 rounded-lg  w-1/2 md:w-1/2 py-2 px-10'>
                        Simpan
                    </button>
                </div>
                <div className="md:h-[20px] h-[5px] text-[1px] text-white">
                    test
                </div>
                {
                    <IonToast
                        isOpen={success}
                        position="top"
                        onDidDismiss={() => setSuccess(false)}
                        message="Item berhasil ditambahkan"
                        duration={5000}
                        color="success"
                    />
                }
            </div>
        </IonContent>
    );
};

export default AddItem;
