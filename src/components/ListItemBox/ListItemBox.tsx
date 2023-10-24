import { IonRouterLink } from "@ionic/react";
import { AiOutlinePlus } from "react-icons/ai";
import { MdOutlineModeEditOutline } from "react-icons/md";

const ListItemBox = ({ itemName, qty, tipe, merk, harga, detailId, withLink = true }: props) => {
    return (
        withLink ? (
            <IonRouterLink routerLink={`stok/detail/${detailId}`} className="w-full">
                <div className="flex flex-row justify-between items-center gap-2 p-2 w-full bg-[#EFEFEF] rounded-md shadow-md">
                    <div className="flex flex-col justify-between items-start gap-2">
                        <p className="text-black font-bold text-sm">{itemName}</p>
                        <div className="flex flex-row justify-start items-start gap-2">
                            <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Qty {qty}</p>
                            <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Tipe {tipe}</p>
                            <p className="text-gray-500/80 font-normal text-xs">Merk {merk}</p>
                        </div>
                        <p className="text-gray-500/80 font-normal text-xs">Harga {harga}</p>
                    </div>
                    <IonRouterLink routerLink={`stok/update/${detailId}`} className="text-black">
                        <MdOutlineModeEditOutline className="mr-1 w-4 h-4" />
                    </IonRouterLink>
                </div>
            </IonRouterLink>
        ) : (
            <div className="w-full">
                <div className="flex flex-row justify-between items-center gap-2 p-2 w-full bg-[#EFEFEF] rounded-md shadow-md">
                    <div className="flex flex-col justify-between items-start gap-2">
                        <p className="text-black font-bold text-sm">{itemName}</p>
                        <div className="flex flex-row justify-start items-start gap-2">
                            <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Qty {qty}</p>
                            <p className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">Tipe {tipe}</p>
                            <p className="text-gray-500/80 font-normal text-xs">Merk {merk}</p>
                        </div>
                        <p className="text-gray-500/80 font-normal text-xs">Harga {harga}</p>
                    </div>
                    <IonRouterLink routerLink={`/penjualan/checkout/1`} className="text-black">
                        <AiOutlinePlus className="mr-1 w-4 h-4" />
                    </IonRouterLink>
                </div>
            </div>
        )
    )
}

export default ListItemBox;

type props = {
    itemName: string,
    qty: string,
    tipe: string,
    merk: string,
    harga: string,
    detailId: string
    withLink?: boolean | true;
}