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
                <div className="w-full h-full rounded-t-[4rem] shadow-2xl shadow-red-500 border-t-4 border-[#280822] pt-10 px-10">
                    test
                </div>
            </div>
        </IonContent>
    )
}

export default DetailStok;