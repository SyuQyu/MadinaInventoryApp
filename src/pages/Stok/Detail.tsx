import { IonContent, IonRouterLink } from "@ionic/react";
import { IoIosArrowBack } from 'react-icons/io'
const DetailStok = () => {
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
                    <p className="text-md">
                        Rp.120.000
                    </p>
                    <p className="text-md">
                        12/05/20023
                    </p>
                    <p className="text-md text-justify">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
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