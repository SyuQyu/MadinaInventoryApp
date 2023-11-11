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
                <div className="w-full h-[200vh] flex flex-col gap-3 rounded-t-[4rem] shadow-2xl border-[#280822] pt-10 md:px-10 px-5">
                    <dl className="grid grid-cols-3">
                        <dt className="col-span-full font-bold">Kode</dt>
                        <dd className="col-span-full">
                            {item?.code}
                        </dd>

                        <dt className="col-span-full font-bold">Nama</dt>
                        <dd className="col-span-full">
                            {item?.name}
                        </dd>

                        <dt className="col-span-full font-bold">Merek</dt>
                        <dd className="col-span-full">
                            {item?.brand.name}
                        </dd>

                        <dt className="col-span-full font-bold">Jenis</dt>
                        <dd className="col-span-full">
                            {item?.item_type.name}
                        </dd>

                        <dt className="col-span-full font-bold">Stok</dt>
                        <dd className="col-span-full">
                            {item?.stock}
                        </dd>

                        <dt className="col-span-full font-bold">Ukuran</dt>
                        <dd className="col-span-full">
                            {item?.size}
                        </dd>

                        <dt className="col-span-full font-bold">Harga</dt>
                        <dd className="col-span-full">
                            {item?.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}
                        </dd>

                        <dt className="col-span-full font-bold">Deskripsi</dt>
                        <dd className="col-span-full">
                            {item?.description ?? '-'}
                        </dd>

                        <dt className="col-span-full font-bold">Tanggal Dibuat</dt>
                        <dd className="col-span-full">
                            {item?.created_at}
                        </dd>
                    </dl>
                </div>
                <div className="w-full h-[50px] bg-white text-xs text-white">

                </div>
            </div>
        </IonContent>
    )
}

export default DetailStok;