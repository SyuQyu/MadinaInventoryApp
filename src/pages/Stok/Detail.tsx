import { IonContent, IonRouterLink } from "@ionic/react";
import { IoIosArrowBack } from 'react-icons/io'
import useItemStore from "../../context/item";
import { useParams } from "react-router";
import { useEffect } from "react";
const DetailStok = () => {
    const { id } = useParams<{ id: string }>();
    const { getItemById } = useItemStore();

    const item = getItemById(parseInt(id));
    return (
        <IonContent fullscreen={false}>
            <div className='w-full h-full flex flex-col'>
                <header className='md:px-10 md:py-10 px-2 py-5 flex flex-col w-full justify-between items-start gap-2'>
                    <div className="flex flex-row justify-between items-center">
                        <IonRouterLink routerLink={`/stok`} className="w-full text-black">
                            <div className="w-full text-black flex flex-row gap-1 items-center">
                                <IoIosArrowBack className="w-4 h-4" />
                                <p>
                                    Back
                                </p>
                            </div>
                        </IonRouterLink>
                    </div>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Detail Barang</h1>
                </header>
                <div className="w-full h-[200vh] flex flex-col gap-3 rounded-t-[4rem] shadow-2xl border-t-4 border-[#280822] pt-10 px-10">
                    <p className="text-md">
                        {item?.code}
                    </p>
                    <p className="text-xl font-bold">
                        {item?.name}
                    </p>
                    <p className="text-lg">
                        {item?.brand.name}
                    </p>
                    <p className="text-md">
                        {item?.size}
                    </p>
                    <div className="flex flex-row justify-start gap-4 items-center">
                        <p className="text-sm">
                            Jenis 1
                        </p>
                        <p className="text-sm">
                            {item?.item_type.name}
                        </p>
                    </div>
                    <p className="text-md">
                        Rp. {item?.price}
                    </p>
                    <p className="text-md">
                        {item?.created_at}
                    </p>
                    <p className="text-md text-justify">
                        {item?.description}
                    </p>
                </div>
                <div className="w-full h-[50px] bg-white text-xs text-white">
                    y
                </div>
            </div>
        </IonContent>
    )
}

export default DetailStok;