import { IonContent, IonRouterLink } from "@ionic/react";
import { IoIosArrowBack } from 'react-icons/io'
import useTransactionStore from "../../context/transaksi";
import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";
import { BiDownload, BiPrinter, BiUpArrowAlt } from "react-icons/bi";
import { BsBoxArrowInDown, BsBoxArrowInUp } from "react-icons/bs";
import { MdOutlineModeEditOutline } from "react-icons/md";
import useAuth from "../../context/auth";
import { PrintableContent } from "../../components";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PrintInvoice from "./PrintInvoice";
import { formatRupiah } from "../../../utils";
const DetailStok = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchTransactions, transactions, transactionDetails, setSelectedItem } = useTransactionStore();
    const { token, dataUser } = useAuth();
    const [print, setPrint] = useState(false);
    const item = transactionDetails(parseInt(id));
    const formattedPaymentMethod = item?.payment_method
        ?.replace('-', ' ')
        ?.split(' ')
        ?.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(' ');

    const reInsertSelectedItem = () => {
        item?.details.map((item: any) => setSelectedItem({ id: item.item_id, qty: item.qty }))
    }

    const generateInvoiceNumber = (id: number) => {
        const currentDate = new Date();
        const year = String(currentDate.getFullYear()).slice(-2); // get last 2 digits of year
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}${month}${day}`;

        // Assuming that the ID is a number, you can format it as needed
        const formattedId = String(id).padStart(4, '0');

        const invoiceNumber = `${formattedDate}${formattedId}`;
        return invoiceNumber;
    };

    return (
        <IonContent fullscreen={false} >
            {
                print ? (
                    <PrintInvoice
                        invoiceNumber={generateInvoiceNumber(parseInt(id))}
                        date={item?.created_at}
                        items={item?.details}
                        total={formatRupiah(item?.total_price)}
                        setPrint={setPrint}
                        paymentMethod={formattedPaymentMethod}
                    />
                ) : (
                    <div className='w-full h-full flex flex-col' id="printable">
                        <header className='md:px-10 md:py-10 px-2 py-5 flex flex-col w-full justify-between items-start gap-2'>
                            <div className="flex flex-row justify-between items-center w-full">
                                <IonRouterLink routerLink={`/history`} className="w-full text-black">
                                    <div className="w-full text-black flex flex-row gap-1 items-center">
                                        <IoIosArrowBack className="w-4 h-4" />
                                        <p>
                                            Back
                                        </p>
                                    </div>
                                </IonRouterLink>
                                {
                                    parseInt(dataUser?.role_id) === 1 ? (
                                        <IonRouterLink routerLink={`/history/edit/${id}`} onClick={reInsertSelectedItem} className="w-full text-black">
                                            <div className="w-full text-black flex flex-row gap-1 items-center justify-end">
                                                <p>
                                                    Update History
                                                </p>
                                                <MdOutlineModeEditOutline className="w-4 h-4" />
                                            </div>
                                        </IonRouterLink>
                                    ) : null
                                }
                            </div>
                            <h1 className='text-2xl font-extrabold text-[#280822]'>Detail Transaksi</h1>
                            <button onClick={() => setPrint(!print)} className='bg-[#280822] text-white rounded-xl py-2 px-4 mt-4 flex'>
                                <BiDownload className="w-5 h-5 mr-2" />
                                <span>Invoice</span>
                            </button>
                        </header>
                        <div className="w-full h-[200vh] flex flex-col gap-3 rounded-t-[4rem] shadow-2xl pt-10 md:px-10 px-5 ">
                            <dl className="grid grid-cols-3">
                                <dt className="col-span-full font-bold">Dibuat Oleh</dt>
                                <dd className="col-span-full">{item?.user_name}</dd>

                                <dt className="col-span-full font-bold">Tipe Pembayaran</dt>
                                <dd className="col-span-full">
                                    {formattedPaymentMethod}
                                </dd>

                                <dt className="col-span-full font-bold">Total</dt>
                                <dd className="col-span-full">
                                    {formatRupiah(item?.total_price)}
                                </dd>

                                <dt className="col-span-full font-bold">Catatan</dt>
                                <dd className="col-span-full">
                                    {item?.note}
                                </dd>

                                <dt className="col-span-full font-bold">Tanggal Dibuat</dt>
                                <dd className="col-span-full">
                                    {item?.created_at}
                                </dd>
                            </dl>
                            <div className="w-full h-0.5 rounded-full bg-gray-500"></div>
                            <div className="flex flex-col justify-between items-start gap-2">
                                <p className="text-md text-justify font-bold">
                                    Detail Barang
                                </p>
                                {
                                    item?.details?.map((item: any, index: any) => (
                                        <div key={index} className="flex flex-col justify-between items-start gap-2 p-2 w-full bg-[#EFEFEF] rounded-md shadow-md">
                                            {
                                                item?.type === 'in' ? (
                                                    <div className="flex flex-row justify-between items-center w-full">
                                                        <div className="flex flex-col justify-between items-start gap-2 w-full">
                                                            <p className="text-black font-thin text-xs">{item?.item?.code}</p>
                                                            <p className="text-black font-bold text-sm">{item?.item?.name}</p>
                                                            <div className="flex flex-row justify-start items-center gap-2">
                                                                <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-2">{item?.item?.item_type}</p>
                                                                <p className="text-gray-500/80 font-normal text-xs mt-0">{item?.item?.brand}</p>
                                                            </div>
                                                            <p className="text-gray-500/80 font-normal text-xs">{formatRupiah(item?.item?.price)} × {Math.abs(item?.qty)} = {formatRupiah(item?.total_price)}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end justify-center gap-0.5">
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
                                                                <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-2">{item?.item?.item_type}</p>
                                                                <p className="text-gray-500/80 font-normal text-xs mt-0">{item?.item?.brand}</p>
                                                            </div>
                                                            <p className="text-gray-500/80 font-normal text-xs">{formatRupiah(item?.item?.price)} × {Math.abs(item?.qty)} = {formatRupiah(item?.total_price)}</p>
                                                        </div>
                                                        <div className="flex flex-col items-end justify-center gap-0.5">
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
                )
            }
        </IonContent>
    )
}

export default DetailStok;