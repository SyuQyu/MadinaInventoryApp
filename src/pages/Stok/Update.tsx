import React, { useState } from "react";
import { InputCustom } from "../../components";
import { IonContent, IonRouterLink } from "@ionic/react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
interface Stock {
    kode: string;
    nama: string;
    merek: string;
    ukuran: string;
    jenis: string;
    tipe: string;
    harga: string;
    tanggal: string;
    desc: string;
}

const UpdateStok = () => {
    const initialStock: Stock = {
        kode: "",
        nama: "",
        merek: "",
        ukuran: "",
        jenis: "",
        tipe: "",
        harga: "",
        tanggal: "",
        desc: "",
    };

    const [stocks, setStocks] = useState(initialStock);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStocks({
            ...stocks,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(stocks);
    };

    return (
        <IonContent fullscreen={false} className="pb-10">
            <div className='md:px-10 md:py-10 px-2 py-5 h-full flex flex-col gap-4 w-full'>
                <header className='mb-2'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Update</h1>
                </header>
                <div className="flex flex-col gap-4">
                    <InputCustom
                        label="Kode"
                        labelPlacement="floating"
                        placeholder="Kode"
                        type="text"
                        fill="outline"
                        name="kode"
                        value={stocks.kode}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Nama"
                        labelPlacement="floating"
                        placeholder="Nama"
                        type="text"
                        fill="outline"
                        name="nama"
                        value={stocks.nama}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Merek"
                        labelPlacement="floating"
                        placeholder="Merek"
                        type="text"
                        fill="outline"
                        name="merek"
                        value={stocks.merek}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Ukuran"
                        labelPlacement="floating"
                        placeholder="Ukuran"
                        type="text"
                        fill="outline"
                        name="ukuran"
                        value={stocks.ukuran}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Jenis"
                        labelPlacement="floating"
                        placeholder="Jenis"
                        type="text"
                        fill="outline"
                        name="jenis"
                        value={stocks.jenis}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Tipe"
                        labelPlacement="floating"
                        placeholder="Tipe"
                        type="text"
                        fill="outline"
                        name="tipe"
                        value={stocks.tipe}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Harga"
                        labelPlacement="floating"
                        placeholder="Harga"
                        type="text"
                        fill="outline"
                        name="harga"
                        value={stocks.harga}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Tanggal"
                        labelPlacement="floating"
                        placeholder="Tanggal"
                        type="text"
                        fill="outline"
                        name="tanggal"
                        value={stocks.tanggal}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                    <InputCustom
                        label="Deskripsi"
                        labelPlacement="floating"
                        placeholder="Deskripsi"
                        type="text"
                        fill="outline"
                        name="desc"
                        value={stocks.desc}
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
            </div>
        </IonContent>
    );
};

export default UpdateStok;
