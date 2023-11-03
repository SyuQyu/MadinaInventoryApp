import { IonRouterLink } from "@ionic/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import InputCustom from "../InputCustom/InputCustom";
import { PiTrashSimpleLight } from "react-icons/pi";
const ListItemBox = ({ handleChangeDelete = () => { }, deleteData, note, userName, createdAt, detail, paymentMethod, kode, itemName, qty, tipe, merk, harga, detailId, withLink = true, onClick = () => { }, quantityItem, deletedOnClick, histroy = false }: props) => {
    return (
        withLink ? (
            histroy ? (
                <div className="flex flex-col justify-between items-start gap-2 p-2 w-full bg-[#EFEFEF] rounded-md shadow-md">
                    <IonRouterLink routerLink={`/history/detail/${detailId}`} className="text-black w-full">
                        <div className=" flex flex-row justify-between items-center w-full">
                            <div className="flex flex-col justify-between items-start gap-2">
                                <p className="text-black font-thin text-xs">{note}</p>
                                <p className="text-black font-bold text-sm">{paymentMethod}</p>
                                <p className="text-black font-bold text-xs">Total {harga?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}</p>
                                <p className="text-black font-thin text-xs">{createdAt}</p>
                            </div>
                            <div className="flex flex-col justify-center gap-4 items-center">
                                {
                                    detail?.map((item: any, index: any) => (
                                        <div key={index}>
                                            {
                                                item?.type === 'in' ? (
                                                    <div className="flex items-center justify-center gap-0.5">
                                                        <BiUpArrowAlt className="w-5 h-5 text-green-500" />
                                                        <p>{item?.qty}</p>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center justify-center gap-0.5">
                                                        <BiUpArrowAlt className="w-5 h-5 text-red-500" />
                                                        <p>{item?.qty}</p>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </IonRouterLink>
                    <div className="w-full h-0.5 rounded-full bg-gray-500"></div>
                    <p className="text-gray-500/80 font-normal text-xs">Dibuat oleh {userName}</p>
                </div>
            ) : (
                <div className="flex flex-row justify-between items-center gap-2 p-2 w-full bg-[#EFEFEF] rounded-md shadow-md">
                    {
                        deleteData ? (
                            <input id="brand-checkbox" type="checkbox" value={detailId} className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " onChange={handleChangeDelete} />
                        ) : null
                    }
                    <IonRouterLink routerLink={`/stok/detail/${detailId}`} className="text-black w-full">
                        <div className="flex flex-col justify-between items-start gap-2">
                            <p className="text-black font-thin text-xs">{kode}</p>
                            <p className="text-black font-bold text-sm">{itemName}</p>
                            <div className="flex flex-row justify-start items-start gap-2">
                                <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Stok {qty}</p>
                                <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Tipe {tipe}</p>
                                <p className="text-gray-500/80 font-normal text-xs">Merk {merk}</p>
                            </div>
                            <p className="text-gray-500/80 font-normal text-xs">Harga {harga?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}</p>
                        </div>
                    </IonRouterLink>
                    <div className="flex flex-col justify-center gap-4 items-center h-full">
                        {/* <TbListDetails className="mr-1 w-6 h-6" /> */}
                        <IonRouterLink routerLink={`/stok/update/${detailId}`} className="text-black">
                            <MdOutlineModeEditOutline className="mr-1 w-6 h-6" />
                        </IonRouterLink>
                    </div>
                </div>
            )
        ) : (
            <div className="w-full">
                <div className="relative flex flex-row justify-between items-center gap-2 p-2 w-full bg-[#EFEFEF] rounded-md shadow-md">
                    <div className="flex flex-col justify-between items-start gap-2">
                        <p className="text-black font-thin text-xs">{kode}</p>
                        <p className="text-black font-bold text-sm">{itemName}</p>
                        <div className="flex flex-row justify-start items-start gap-2">
                            <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Stok {qty}</p>
                            <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Tipe {tipe}</p>
                            <p className="text-gray-500/80 font-normal text-xs">Merk {merk}</p>
                        </div>
                        <p className="text-gray-500/80 font-normal text-xs">Harga {harga?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}</p>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-4">
                        <button onClick={() => onClick('minus', detailId)} className="text-black">
                            <AiOutlineMinus className="mr-1 w-4 h-4" />
                        </button>
                        <p className="border-none outline-none text-right text-black font-bold">{quantityItem ? quantityItem : 0}</p>
                        {/* <input name='qty' type='number' value={quantityItem ? quantityItem : 0} style={{ background: 'none' }} className="border-none outline-none w-10 h-10 text-right text-black font-bold" disabled /> */}
                        <button onClick={() => onClick('plus', detailId)} className="text-black">
                            <AiOutlinePlus className="mr-1 w-4 h-4" />
                        </button>
                    </div>
                    {
                        deletedOnClick ? (
                            <button className="absolute top-0 right-0 pt-2 pr-2" onClick={deletedOnClick}>
                                <PiTrashSimpleLight className="w-5 h-5" style={{ color: 'red' }} />
                            </button>
                        ) : null
                    }
                </div>
            </div>
        )
    )
}

export default ListItemBox;

type props = {
    handleChangeDelete?: (e: any) => void;
    deleteData?: boolean
    note?: string;
    userName?: string;
    paymentMethod?: string;
    createdAt?: string;
    detail?: any;
    histroy?: boolean;
    kode?: string,
    itemName?: string,
    qty?: number,
    tipe?: string,
    merk?: string,
    harga?: number,
    detailId?: any,
    withLink?: boolean | true;
    onClick?: (type: string, id: number) => void;
    quantityItem?: number;
    deletedOnClick?: any;
}