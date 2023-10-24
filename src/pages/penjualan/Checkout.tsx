import { IonContent, IonRouterLink } from "@ionic/react";
import { IoIosArrowBack } from 'react-icons/io'
const Checkout = () => {
    return (
        <IonContent fullscreen={false} style={{ height: '1000px' }}>
            <div className='w-full h-full flex flex-col md:px-10 md:py-10 px-2 py-5'>
                <header className='flex flex-col w-full justify-between items-start gap-2'>
                    <div className="flex flex-row justify-between items-center">
                        <IonRouterLink routerLink={`/penjualan/stock-out`} className="w-full text-black">
                            <div className="w-full text-black flex flex-row gap-1 items-center">
                                <IoIosArrowBack className="w-4 h-4" />
                                <p>
                                    Back
                                </p>
                            </div>
                        </IonRouterLink>
                    </div>
                    <h1 className='text-2xl font-extrabold text-[#280822]'>Stock Out</h1>
                </header>
                <div className="w-full  gap-4 mt-6">
                    <hr className="h-px my-4 bg-gray-200 border" />
                    <p className="font-bold text-lg mb-4">Detail Pembelian</p>
                    <div className="flex bg-[#280822] w-full flex-col gap-2 justify-start items-start text-white p-6 rounded-xl mt-4">
                        <p className="text-md">
                            a122345
                        </p>
                        <p className="text-xl font-bold">
                            CERAMIC 1
                        </p>
                        <p className="text-lg">
                            Brand 1
                        </p>
                        <p className="text-md">
                            64x64
                        </p>
                        <div className="flex flex-row justify-start gap-4 items-center">
                            <p className="text-sm">
                                Jenis 1
                            </p>
                            <p className="text-sm">
                                Tipe 1
                            </p>
                        </div>
                        <div className="flex flex-row justify-start gap-4 items-center">
                            <p className="text-sm">
                                Qty 100
                            </p>
                            <p className="text-sm">
                                x
                            </p>
                            <p className="text-sm">
                                Rp. 270.000
                            </p>
                        </div>
                        <p className="text-md">
                            Rp.120.000
                        </p>
                    </div>
                    <div className="flex bg-[#280822] w-full flex-col gap-2 justify-start items-start text-white p-6 rounded-xl mt-4">
                        <p className="text-md">
                            a122345
                        </p>
                        <p className="text-xl font-bold">
                            CERAMIC 1
                        </p>
                        <p className="text-lg">
                            Brand 1
                        </p>
                        <p className="text-md">
                            64x64
                        </p>
                        <div className="flex flex-row justify-start gap-4 items-center">
                            <p className="text-sm">
                                Jenis 1
                            </p>
                            <p className="text-sm">
                                Tipe 1
                            </p>
                        </div>
                        <div className="flex flex-row justify-start gap-4 items-center">
                            <p className="text-sm">
                                Qty 100
                            </p>
                            <p className="text-sm">
                                x
                            </p>
                            <p className="text-sm">
                                Rp. 270.000
                            </p>
                        </div>
                        <p className="text-md">
                            Rp.120.000
                        </p>
                    </div>
                    <div className="flex bg-[#280822] w-full flex-col gap-2 justify-start items-start text-white p-6 rounded-xl mt-4">
                        <p className="text-md">
                            a122345
                        </p>
                        <p className="text-xl font-bold">
                            CERAMIC 1
                        </p>
                        <p className="text-lg">
                            Brand 1
                        </p>
                        <p className="text-md">
                            64x64
                        </p>
                        <div className="flex flex-row justify-start gap-4 items-center">
                            <p className="text-sm">
                                Jenis 1
                            </p>
                            <p className="text-sm">
                                Tipe 1
                            </p>
                        </div>
                        <div className="flex flex-row justify-start gap-4 items-center">
                            <p className="text-sm">
                                Qty 100
                            </p>
                            <p className="text-sm">
                                x
                            </p>
                            <p className="text-sm">
                                Rp. 270.000
                            </p>
                        </div>
                        <p className="text-md">
                            Rp.120.000
                        </p>
                    </div>
                </div>
                <hr className="h-px my-4 bg-gray-200 border" />
                <p className="font-bold text-lg mb-4">Total Pembelian</p>
                <div className="flex bg-[#280822] w-full flex-col gap-2 justify-start items-start text-white p-6 rounded-xl">
                    <div className="flex flex-row justify-between items-center w-full">
                        <p>
                            Subtotal
                        </p>
                        <p>
                            Rp. 27.000.000
                        </p>
                    </div>
                    <div className="flex flex-row justify-between items-center w-full">
                        <p>
                            Biaya Tambahan
                        </p>
                        <p>
                            Rp. 10.000
                        </p>
                    </div>
                    <hr className="h-px w-full my-4 bg-gray-200 border" />
                    <div className="flex flex-row justify-between items-center w-full">
                        <p>
                            Total
                        </p>
                        <p>
                            Rp. 10.000
                        </p>
                    </div>
                </div>
                <button className='bg-[#280822] rounded-lg w-full py-2 px-10 mt-4'>
                    <IonRouterLink routerLink="/home" className='text-white bg-red'>Cetak Invoice</IonRouterLink>
                </button>
                <div className="w-full h-[50px] bg-white text-xs text-white">
                    y
                </div>
            </div>

        </IonContent>
    )
}

export default Checkout;