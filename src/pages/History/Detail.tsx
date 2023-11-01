import { IonContent, IonRouterLink } from "@ionic/react";
import { IoIosArrowBack } from 'react-icons/io'
import useTransactionStore from "../../context/transaksi";
import { useParams } from "react-router";
import { useEffect } from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { BsBoxArrowInDown, BsBoxArrowInUp } from "react-icons/bs";
const DetailStok = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchTransactions, transactions, transactionDetails } = useTransactionStore();

    const item = transactionDetails(parseInt(id));
    return (
        <IonContent fullscreen={false}>
            <div className='w-full h-full flex flex-col'>
                <header className='md:px-10 md:py-10 px-2 py-5 flex flex-col w-full justify-between items-start gap-2'>
                    <div className="flex flex-row justify-between items-center">
                        <IonRouterLink routerLink={`/history`} className="w-full text-black">
                            <div className="w-full text-black flex flex-row gap-1 items-center">
                                <IoIosArrowBack className="w-4 h-4" />
                                <p>
                                    Back
                                </p>
                            </div>
                        </IonRouterLink>
                    </div>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Detail Transaksi</h1>
                </header>
                <div className="w-full h-[200vh] flex flex-col gap-3 rounded-t-[4rem] shadow-2xl border-t-4 border-[#280822] pt-10 px-10">
                    <p className="text-md">
                        {item?.note}
                    </p>
                    <p className="text-xl font-bold">
                        Tipe Pembayaran {item?.payment_method.charAt(0).toUpperCase() + item?.payment_method.slice(1)}
                    </p>
                    <p className="text-md">
                        Total {item?.total_price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}
                    </p>
                    <p className="text-md">
                        Dibuat oleh {item?.user_name}
                    </p>
                    <p className="text-md text-justify">
                        {item?.created_at}
                    </p>
                    <div className="w-full h-0.5 rounded-full bg-gray-500"></div>
                    <div className="flex flex-col justify-between items-start gap-2">
                        <p className="text-md text-justify">
                            Detail Barang
                        </p>
                        {
                            item?.details.map((item: any, index: any) => (
                                <div key={index} className="flex flex-col justify-between items-start gap-2 p-2 w-full bg-[#EFEFEF] rounded-md shadow-md">
                                    {
                                        item?.type === 'in' ? (
                                            <div className="flex flex-row justify-between items-center w-full">
                                                <div className="flex flex-col justify-between items-start gap-2 w-full">
                                                    <p className="text-black font-thin text-xs">{item?.item?.code}</p>
                                                    <p className="text-black font-bold text-sm">{item?.item?.name}</p>
                                                    <div className="flex flex-row justify-start items-start gap-2">
                                                        <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Tipe {item?.item?.item_type}</p>
                                                        <p className="text-gray-500/80 font-normal text-xs">Merk {item?.item?.brand}</p>
                                                    </div>
                                                    <p className="text-gray-500/80 font-normal text-xs">Total harga {item?.qty} x {item?.item?.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)} = {item?.total_price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}</p>
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-0.5">
                                                    <p className="whitespace-nowrap">Stock In</p>
                                                    <div className="flex justify-between items-center gap-0.5">
                                                        <BsBoxArrowInUp className="w-5 h-5 text-green-500" />
                                                        <p>{item?.qty}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-row justify-between items-center w-full">
                                                <div className="flex flex-col justify-between items-start gap-2 w-full">
                                                    <p className="text-black font-thin text-xs">{item?.item?.code}</p>
                                                    <p className="text-black font-bold text-sm">{item?.item?.name}</p>
                                                    <div className="flex flex-row justify-start items-start gap-2">
                                                        <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Tipe {item?.item?.item_type}</p>
                                                        <p className="text-gray-500/80 font-normal text-xs">Merk {item?.item?.brand}</p>
                                                    </div>
                                                    <p className="text-gray-500/80 font-normal text-xs">Total harga {item?.qty} x {item?.item?.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)} = {item?.total_price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}</p>
                                                </div>
                                                <div className="flex flex-col items-center justify-center gap-0.5">
                                                    <p className="whitespace-nowrap">Stock Out</p>
                                                    <div className="flex justify-between items-center gap-0.5">
                                                        <BsBoxArrowInDown className="w-5 h-5 text-red-500" />
                                                        <p>{item?.qty}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="w-full h-[50px] bg-white text-xs text-white">
                    y
                </div>
            </div>
        </IonContent>
    )
}

export default DetailStok;