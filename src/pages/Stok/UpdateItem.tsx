import React, { useEffect, useState } from "react";
import { CreateableCustomSelect, InputCustom } from "../../components";
import { IonContent, IonRouterLink, IonToast } from "@ionic/react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import useAuth from "../../context/auth";
import useItem from "../../context/item";
import useBrand from "../../context/brand";
import useItemType from "../../context/itemType";
import { useParams } from "react-router";

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
const UpdateStok = () => {
    const initialStock: any = {
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
        console.log(stock);
        const updated: any = updateItem(parseInt(id), {
            code: stock.code === "" ? data?.code : stock.code,
            name: stock.name === "" ? data?.name : stock.name,
            price: stock.price === 0 ? data?.price : stock.price,
            stok: stock.ukuran === "" ? data?.size : stock.ukuran,
            stock: stock.stock === 0 ? data?.stock : stock.stock,
            stock_min: stock.stock_min === 0 ? data?.stock_min : stock.stock_min,
            brand_id: stock.brand_id === 0 ? data?.brand_id : stock.brand_id?.value,
            item_type_id: stock.item_type_id === 0 ? data?.item_type_id : stock.item_type_id?.value,
            jenis_type_id: stock.jenis_type_id === 0 ? data?.jenis_type_id : stock.jenis_type_id,
            description: stock.description === "" ? data?.description : stock.description,
        }, token);

        if (updated) {
            setSuccess(true);
        }
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
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Update</h1>
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
                        placeholder="Kode"
                        type="text"
                        fill="outline"
                        name="code"
                        value={stock.code === "" ? data?.code : stock.code}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Nama"
                        labelPlacement="floating"
                        placeholder="Nama"
                        type="text"
                        fill="outline"
                        name="name"
                        value={stock.name === "" ? data?.name : stock.name}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Harga"
                        labelPlacement="floating"
                        placeholder="Harga"
                        type="number"
                        fill="outline"
                        name="price"
                        value={stock.price === 0 ? data?.price : stock.price}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Stok"
                        labelPlacement="floating"
                        placeholder="Stok"
                        type="number"
                        fill="outline"
                        name="stock"
                        value={stock.stock === 0 ? data?.stock : stock.stock}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Stok Minimum"
                        labelPlacement="floating"
                        placeholder="Stok Minimum"
                        type="number"
                        fill="outline"
                        name="stock_min"
                        value={stock.stock_min === 0 ? data?.stock_min : stock.stock_min}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Ukuran"
                        labelPlacement="floating"
                        placeholder="Ukuran"
                        type="text"
                        fill="outline"
                        name="ukuran"
                        value={stock.ukuran === "" ? data?.size : stock.ukuran}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    {/* <InputCustom
                            label="ID Brand"
                            labelPlacement="floating"
                            placeholder="ID Brand"
                            type="number"
                            fill="outline"
                            name="brand_id"
                            value={stock.brand_id}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        /> */}
                    <CreateableCustomSelect
                        name={"brand_id"}
                        label="Pilih Merek"
                        data={brands}
                        value={stock.brand_id === 0 ? data?.brand_id : stock.brand_id}
                        onChange={handleInputChangeSelect}
                        index={1}
                        apiCall={addBrand}
                        placeHolder="Pilih Merek" />
                    <InputCustom
                        label="ID Jenis Barang"
                        labelPlacement="floating"
                        placeholder="ID Jenis Barang"
                        type="number"
                        fill="outline"
                        name="jenis_type_id"
                        value={stock.jenis_type_id === 0 ? data?.jenis_type_id : stock.jenis_type_id}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    {/* <InputCustom
                            label="ID Tipe Barang"
                            labelPlacement="floating"
                            placeholder="ID Tipe Barang"
                            type="number"
                            fill="outline"
                            name="item_type_id"
                            value={stock.item_type_id}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                        /> */}
                    <CreateableCustomSelect
                        name={"item_type_id"}
                        label="Pilih Tipe Item"
                        data={itemTypes}
                        value={stock.item_type_id === 0 ? data?.item_type_id : stock.item_type_id}
                        onChange={handleInputChangeSelect}
                        index={1}
                        apiCall={addItemType}
                        placeHolder="Pilih Item Type" />
                    <InputCustom
                        label="Deskripsi"
                        labelPlacement="floating"
                        placeholder="Deskripsi"
                        type="text"
                        fill="outline"
                        name="description"
                        value={stock.description === "" ? data?.description : stock.description}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                </div>
                <div className="flex flex-row justify-between items-center gap-4">
                    <IonRouterLink routerLink="/stok" className="text-white text-center bg-red-500 rounded-lg w-1/2 md:w-1/2 py-2 px-10">
                        Cancel
                    </IonRouterLink>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)} className='text-white bg-green-500 rounded-lg  w-1/2 md:w-1/2 py-2 px-10'>
                        Save
                    </button>
                </div>
                <div className="md:h-[20px] h-[5px] text-[1px] text-white">
                    test
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

