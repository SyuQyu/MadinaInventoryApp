import { IonRouterLink } from "@ionic/react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BsBoxArrowInDown, BsBoxArrowInUp } from "react-icons/bs";
import { InputNumber, InputGroup } from 'rsuite';
import { PiTrashSimpleLight } from "react-icons/pi";
import clsx from "clsx";
import './ListItemBox.css';
import {useState} from "react";
import { formatRupiah } from "../../../utils";

const ListItemBox = ({
       handleChangeDelete = () => { },
       deleteData,
       urlBrandTypes,
       note,
       userName,
       createdAt,
       detail,
       paymentMethod,
       kode,
       itemName,
       qty,
       tipe,
       merk,
       harga,
       detailId,
       withLink = true,
       onClick = () => { },
       setQuantityItem = () => { },
       quantityItem,
       deletedOnClick,
       history = false,
       brandType = false,
    }: props) => {

    let inItems = detail?.filter((item: any) => item?.type === 'in');
    let outItems = detail?.filter((item: any) => item?.type === 'out');
    let totalIn = inItems?.reduce((acc: any, item: { qty: any; }) => acc + item.qty, 0);
    let totalOut = outItems?.reduce((acc: any, item: { qty: any; }) => acc + item.qty, 0);

    return (
        withLink ? (
            history ? (
                <div
                    className={`p-2 w-full justify-center items-center bg-zinc-100 rounded-md shadow-md ${deleteData ? 'flex flex-row gap-2' : ''}`}
                >
                    <div>
                        {
                            deleteData ? (
                                <input id="brand-checkbox" type="checkbox" value={detailId} className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " onChange={handleChangeDelete} />
                            ) : null
                        }
                    </div>
                    <div className="flex flex-col justify-between items-start gap-2 p-2 w-full">
                        <IonRouterLink router-direction={'forward'} routerLink={`/history/detail/${detailId}`} className="text-black w-full">
                            <div className="flex flex-row justify-between items-center w-full">
                                <div className="flex flex-col justify-between items-start gap-2">
                                    <p className="text-black text-xs">
                                        {detail && detail.length > 0 && (
                                          <>
                                              <span>{detail[0]?.item?.name}</span>
                                              {detail.length > 1 && (
                                                <span> & {detail.length - 1} barang lainnya</span>
                                              )}
                                          </>
                                        )}
                                    </p>
                                    <p className="text-black text-xs">{createdAt}</p>
                                </div>
                                <div className="flex flex-col justify-between gap-4 items-center">
                                    {
                                        totalIn !== 0 ? (
                                            <div className="flex items-center justify-between gap-0.5">
                                                <BsBoxArrowInUp className="w-5 h-5 text-green-500" />
                                                <p>{totalIn}</p>
                                            </div>
                                        ) : null
                                    }
                                    {
                                        totalOut !== 0 ? (
                                            <div className="flex items-center justify-between gap-0.5">
                                                <BsBoxArrowInDown className="w-5 h-5 text-red-500" />
                                                <p>{totalOut}</p>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </IonRouterLink>
                        <div className="w-full h-0.5 border-dashed border-2 border-slate-300"></div>
                        <p className="text-gray-500/80 font-normal text-xs">Dibuat oleh {userName}</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-row justify-between items-center gap-2 p-2 w-full bg-zinc-100 rounded-md shadow-md">
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
                                <p className="text-gray-500/80 font-normal text-xs border-gray-500/80 pr-1">{tipe}</p>
                            </div>
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
        ) : brandType ? (
            <div className={clsx("flex flex-row items-center gap-2 p-2 w-full bg-zinc-100 rounded-md shadow-md", deleteData ? 'justify-start' : 'justify-between')}>
                {
                    deleteData ? (
                        <input id="brand-checkbox" type="checkbox" value={detailId} className="cursor-pointer w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 " onChange={handleChangeDelete} />
                    ) : null
                }
                <div className="w-full flex flex-col justify-between items-start gap-2">
                    <p className="text-black font-thin text-xs">{kode}</p>
                    <p className="text-black font-bold text-sm">{itemName}</p>
                    <div className="flex flex-row justify-start items-start gap-2">
                        <p className="text-gray-500/80 font-normal text-xs border-gray-500/80 pr-1">{tipe}</p>
                    </div>
                </div>
                <div className="flex flex-col justify-center gap-4 items-center h-full">
                    {/* <TbListDetails className="mr-1 w-6 h-6" /> */}
                    <IonRouterLink routerLink={`${urlBrandTypes}/${detailId}`} className="text-black">
                        <MdOutlineModeEditOutline className="mr-1 w-6 h-6" />
                    </IonRouterLink>
                </div>
            </div>
        ) : (
            <div className="w-full">
                <div className="relative flex flex-row justify-between items-center gap-2 p-2 w-full bg-zinc-100 rounded-md shadow-md">
                    <div className="flex flex-col justify-between items-start gap-2">
                        <p className="text-black font-thin text-xs">{kode}</p>
                        <p className="text-black font-bold text-sm">{itemName}</p>
                        <div className="flex flex-row justify-start items-start gap-2">
                            <p className="text-gray-500/80 font-normal text-xs pr-1">{qty}</p>
                        </div>
                        <p className="text-gray-500/80 font-normal text-xs">
                            {formatRupiah(harga ?? 0)}
                        </p>
                    </div>
                    <div className="w-1/2">
                        <InputGroup>
                            <InputGroup.Button onClick={() => onClick('minus', detailId)}>
                                <AiOutlineMinus className="mr-1 w-4 h-4" />
                            </InputGroup.Button>
                            <InputNumber value={quantityItem} onChange={setQuantityItem}/>
                            <InputGroup.Button onClick={() => onClick('plus', detailId)}>
                                <AiOutlinePlus className="mr-1 w-4 h-4" />
                            </InputGroup.Button>
                        </InputGroup>
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
    history?: boolean;
    kode?: string,
    itemName?: string,
    qty?: number,
    tipe?: string,
    merk?: string,
    harga?: number,
    detailId?: any,
    urlBrandTypes?: string,
    brandType?: boolean;
    withLink?: boolean | true;
    onClick?: (type: string, id: number) => void;
    setQuantityItem?: any;
    quantityItem?: number;
    deletedOnClick?: any;
}