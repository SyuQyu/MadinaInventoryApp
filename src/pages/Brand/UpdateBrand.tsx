import React, { useEffect, useState } from "react";
import { InputCustom } from "../../components";
import { IonContent, IonRouterLink, IonToast } from "@ionic/react";
import useAuth from "../../context/auth";
import { useParams } from "react-router";
import useBrandStore from "../../context/brand";

interface Stock {
    name: string;
}

const UpdateBrand = () => {
    const initialStock: any = {
        name: "",
    };

    const { id } = useParams<{ id: string }>();
    const [stock, setStock] = useState(initialStock);
    const [success, setSuccess] = useState(false);
    const { isLoggedIn, token } = useAuth();
    const { getBrandById, updateBrand } = useBrandStore();
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const fetch = async () => {
        setData(getBrandById(parseInt(id)));
        setLoading(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStock({
            ...stock,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        console.log(stock);
        const updated: any = updateBrand(parseInt(id), stock.name === "" ? data?.name : stock.name, token);

        if (updated) {
            setSuccess(true);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <IonContent fullscreen={false} className="pb-10">
            <div className='md:px-10 md:py-10 px-2 py-5 h-full flex flex-col gap-4 w-full'>
                <header className='mb-2'>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Update Brand</h1>
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
                        label="Nama"
                        labelPlacement="floating"
                        placeholder="Nama"
                        type="text"
                        fill="outline"
                        name="name"
                        value={stock.name === "" ? data?.name : stock.name}
                        onIonChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e)}
                    />
                </div>
                <div className="flex flex-row justify-between items-center gap-4">
                    <IonRouterLink routerLink="/settings/brands" className="text-white text-center bg-red-500 rounded-lg w-1/2 md:w-1/2 py-2 px-10">
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
                    message="Brand berhasil diupdate"
                    duration={5000}
                    color="success"
                />
            </div>
        </IonContent>
    );
};

export default UpdateBrand;

