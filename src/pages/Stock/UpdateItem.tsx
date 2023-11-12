import React, { useEffect, useState } from "react";
import { CreateableCustomSelect, InputCustom } from "../../components";
import { IonContent, IonRouterLink, IonToast } from "@ionic/react";
import useAuth from "../../context/auth";
import useItem, { Item } from "../../context/item";
import useBrand from "../../context/brand";
import useItemType from "../../context/itemType";
import { useParams } from "react-router";

const UpdateStok = () => {
    const initialStock: Item = {
        code: "",
        name: "",
        price: 0,
        size: "",
        stock: 0,
        stock_min: 0,
        brand_id: 0,
        item_type_id: 0,
        description: "",
    };

    const { id } = useParams<{ id: string }>();
    const [stock, setStock] = useState(initialStock);
    const { getItemById, updateItem } = useItem();
    const [success, setSuccess] = useState(false);
    const { isLoggedIn, token } = useAuth();
    const { addBrand, brands, fetchBrands } = useBrand();
    const { addItemType, itemTypes, fetchItemTypes } = useItemType();
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const fetch = async () => {
        await fetchBrands();
        await fetchItemTypes();
        setData(getItemById(parseInt(id)));
        setLoading(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStock({
            ...stock,
            [name]: value,
        });
    };

    const handleInputChangeSelect = (name: any, value: any, index: any) => {
        setStock({
            ...stock,
            [name]: value,
        });
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const updated: boolean = updateItem(parseInt(id), {
            code: stock.code === "" ? data?.code : stock.code,
            name: stock.name === "" ? data?.name : stock.name,
            price: stock.price === 0 ? data?.price : stock.price,
            size: stock.size === "" ? data?.size : stock.size,
            stock: stock.stock === 0 ? data?.stock : stock.stock,
            stock_min: stock.stock_min === 0 ? data?.stock_min : stock.stock_min,
            brand_id: stock.brand_id === 0 ? data?.brand_id : stock.brand_id,
            item_type_id: stock.item_type_id === 0 ? data?.item_type_id : stock.item_type_id,
            description: stock.description === "" ? data?.description : stock.description,
        }, token);

        if (updated) {
            setSuccess(true);
        }
    };

    useEffect(() => {
        fetch();
        console.log(data);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <IonContent fullscreen={false} className="pb-10">
            <div className='md:px-10 md:py-10 px-2 py-5 w-full h-full flex flex-col gap-4'>
                <header className='mb-2'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Update Barang</h1>
                </header>
                <div className="flex flex-col gap-4">
                    <InputCustom
                        label="ID"
                        labelPlacement="floating"
                        placeholder="ID"
                        type="number"
                        fill="outline"
                        name="id"
                        value={id}
                        disabled={true}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)} />
                    <InputCustom
                        label="Kode"
                        labelPlacement="floating"
                        placeholder="Ex: BRG-001"
                        type="text"
                        fill="outline"
                        name="code"
                        value={stock.code === "" ? data?.code : stock.code}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Nama"
                        labelPlacement="floating"
                        placeholder="Masukkan nama"
                        type="text"
                        fill="outline"
                        name="name"
                        value={stock.name === "" ? data?.name : stock.name}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Harga"
                        labelPlacement="floating"
                        placeholder="Masukkan harga"
                        type="number"
                        fill="outline"
                        name="price"
                        value={stock.price === 0 ? data?.price : stock.price}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Stok"
                        labelPlacement="floating"
                        placeholder="Masukkan stok"
                        type="number"
                        fill="outline"
                        name="stock"
                        value={stock.stock === 0 ? data?.stock : stock.stock}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Stok Minimum"
                        labelPlacement="floating"
                        placeholder="Masukkan stok minimum"
                        type="number"
                        fill="outline"
                        name="stock_min"
                        value={stock.stock_min === 0 ? data?.stock_min : stock.stock_min}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Ukuran"
                        labelPlacement="floating"
                        placeholder="Ex: 8mm x 12mm"
                        type="text"
                        fill="outline"
                        name="ukuran"
                        value={stock.size === "" ? data?.size : stock.size}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <CreateableCustomSelect
                        name={"brand_id"}
                        label="Pilih Merek"
                        data={brands}
                        value={stock.brand_id === 0 ? data?.brand_id : stock.brand_id}
                        onChange={handleInputChangeSelect}
                        index={1}
                        apiCall={addBrand}
                        placeHolder="Pilih Merek" />
                    <CreateableCustomSelect
                        name={"item_type_id"}
                        label="Pilih Tipe Barang"
                        data={itemTypes}
                        value={stock.item_type_id === 0 ? data?.item_type_id : stock.item_type_id}
                        onChange={handleInputChangeSelect}
                        index={1}
                        apiCall={addItemType}
                        placeHolder="Pilih Tipe Barang" />
                    <InputCustom
                        label="Deskripsi"
                        labelPlacement="floating"
                        placeholder="Masukkan deskripsi"
                        type="textarea"
                        fill="outline"
                        name="description"
                        value={stock.description === "" ? data?.description : stock.description}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                </div>
                <div className="flex flex-row justify-between items-center gap-4 pb-4">
                    <IonRouterLink routerLink="/stok" className="text-white text-center bg-red-500 rounded-lg w-1/2 md:w-1/2 py-2 px-10">
                        Batal
                    </IonRouterLink>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)} className='text-white bg-green-500 rounded-lg  w-1/2 md:w-1/2 py-2 px-10'>
                        Simpan
                    </button>
                </div>
                <IonToast
                    isOpen={success}
                    position="top"
                    onDidDismiss={() => setSuccess(false)}
                    message="Item berhasil diupdate"
                    duration={5000}
                    color="success"
                />
            </div>
        </IonContent>
    );
};

export default UpdateStok;

