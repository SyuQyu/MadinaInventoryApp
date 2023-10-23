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

const StockIn = () => {
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

    const [stocks, setStocks] = useState([{ kode: '', nama: '', merek: '', ukuran: '', jenis: '', tipe: '', harga: '', tanggal: '', desc: '' }]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const list: any = [...stocks];
        list[index][name] = value;
        setStocks(list);
    };

    const handleAddStock = () => {
        setStocks([...stocks, { kode: '', nama: '', merek: '', ukuran: '', jenis: '', tipe: '', harga: '', tanggal: '', desc: '' }]);
    };

    const handleRemoveStock = (index: number) => {
        const list = [...stocks];
        list.splice(index, 1);
        setStocks(list);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(stocks);
    };

    return (
        <IonContent fullscreen={false} className="pb-10">
            <div className='md:px-10 md:py-10 px-2 py-5 h-full flex flex-col gap-4 w-full'>
                <header className='mb-2'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Barang Masuk</h1>
                </header>
                {stocks.map((stock, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <div className="flex flex-row gap-2 justify-start items-center">
                            <h2 className='text-lg font-extrabold text-[#280822]'>Form {index + 1}</h2>
                            <button onClick={() => handleRemoveStock(index)}><AiFillMinusCircle className="w-5 h-5 text-red-500" /></button>
                        </div>
                        <InputCustom
                            label="Kode"
                            labelPlacement="floating"
                            placeholder="Kode"
                            type="text"
                            fill="outline"
                            name="kode"
                            value={stock.kode}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Nama"
                            labelPlacement="floating"
                            placeholder="Nama"
                            type="text"
                            fill="outline"
                            name="nama"
                            value={stock.nama}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Merek"
                            labelPlacement="floating"
                            placeholder="Merek"
                            type="text"
                            fill="outline"
                            name="merek"
                            value={stock.merek}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Ukuran"
                            labelPlacement="floating"
                            placeholder="Ukuran"
                            type="text"
                            fill="outline"
                            name="ukuran"
                            value={stock.ukuran}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Jenis"
                            labelPlacement="floating"
                            placeholder="Jenis"
                            type="text"
                            fill="outline"
                            name="jenis"
                            value={stock.jenis}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Tipe"
                            labelPlacement="floating"
                            placeholder="Tipe"
                            type="text"
                            fill="outline"
                            name="tipe"
                            value={stock.tipe}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Harga"
                            labelPlacement="floating"
                            placeholder="Harga"
                            type="text"
                            fill="outline"
                            name="harga"
                            value={stock.harga}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Tanggal"
                            labelPlacement="floating"
                            placeholder="Tanggal"
                            type="text"
                            fill="outline"
                            name="tanggal"
                            value={stock.tanggal}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                        <InputCustom
                            label="Deskripsi"
                            labelPlacement="floating"
                            placeholder="Deskripsi"
                            type="text"
                            fill="outline"
                            name="desc"
                            value={stock.desc}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                    </div>
                ))}
                <button onClick={handleAddStock}><AiFillPlusCircle className="w-6 h-6 text-green-500 float-right"/></button>
                <div className="flex flex-row justify-between items-center gap-4">
                    <IonRouterLink routerLink="/penjualan" className="text-white text-center bg-red-500 rounded-lg w-1/2 md:w-1/2 py-2 px-10">
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

export default StockIn;
