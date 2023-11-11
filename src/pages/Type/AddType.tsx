import React, { useState } from "react";
import { InputCustom } from "../../components";
import { IonContent, IonRouterLink, IonToast } from "@ionic/react";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import useAuth from "../../context/auth";
import useItemTypeStore from "../../context/itemType";

interface Stock {
    name: string;
}

interface Option {
    readonly label: string;
    readonly value: number;
}

const AddType = () => {
    const { token } = useAuth();
    const { addItemType } = useItemTypeStore();
    const [success, setSuccess] = useState(false);

    const initialStock: Stock = {
        name: "",
    };

    const [stocks, setStocks] = useState([{
        name: "",
    }]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { name, value } = e.target;
        const list: any = [...stocks];
        list[index][name] = value;
        setStocks(list);
        console.log(value)
    };

    const handleAddStock = () => {
        setStocks([...stocks, {
            name: "",
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
            const created = addItemType(
                stock.name,
                token
            );

            return created;
        });

        if (data) {
            setSuccess(true);
        }
    };

    return (
        <IonContent fullscreen={false} className="pb-10">
            <div className='md:px-10 md:py-10 px-2 py-5 h-full flex flex-col gap-4 w-full'>
                <header className='mb-2'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Tambah Tipe</h1>
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
                            label="Nama"
                            labelPlacement="fixed"
                            placeholder="Nama"
                            type="text"
                            fill="outline"
                            name="name"
                            value={stock.name}
                            onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, index)}
                        />
                    </div>
                ))}
                <button onClick={handleAddStock}><AiFillPlusCircle className="w-6 h-6 text-green-500 float-right" /></button>
                <div className="flex flex-row justify-between items-center gap-4">
                    <IonRouterLink routerLink="/settings/types" className="text-white text-center bg-red-500 rounded-lg w-1/2 md:w-1/2 py-2 px-10">
                        Cancel
                    </IonRouterLink>
                    <button onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleSubmit(e)} className='text-white bg-green-500 rounded-lg  w-1/2 md:w-1/2 py-2 px-10'>
                        Save
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
                        message="Type berhasil ditambahkan"
                        duration={5000}
                        color="success"
                    />
                }
            </div>
        </IonContent>
    );
};

export default AddType;
