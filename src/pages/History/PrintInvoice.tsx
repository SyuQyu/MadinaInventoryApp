import React, { useRef } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { formatRupiah } from "../../../utils";
import { FileOpener } from '@ionic-native/file-opener';
import { isPlatform } from '@ionic/react';
interface InvoiceProps {
    invoiceNumber: string;
    date: string;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    total: string;
    setPrint: any;
    paymentMethod: string;
    dp?: any
}

const PrintInvoice = ({ dp, invoiceNumber, date, items, total, setPrint, paymentMethod }: InvoiceProps) => {

    const printRef = useRef<HTMLDivElement>(null);

    const handle = useReactToPrint({
        content: () => printRef.current,
        // copyStyles: false
        documentTitle: `invoice-${invoiceNumber}.pdf`,
        onAfterPrint: () => {
            // if (isPlatform('cordova')) {
                const fileUrl = `path/to/invoice-${invoiceNumber}.pdf`;
                FileOpener.open(fileUrl, 'application/pdf')
                    .then(() => console.log('File opened'))
                    .catch(e => console.log('Error opening file', e));
            // }
        }
    });

    const handlePrint = () => {
        handle();
    }

    console.log('print invoice', invoiceNumber, date, items, total, paymentMethod)

    return (
        <div className='pt-10 md:px-10 px-5'>
            <div onClick={() => setPrint(false)} className="w-full text-black flex flex-row gap-1 items-center">
                <IoIosArrowBack className="w-4 h-4" />
                <button>Back</button>
            </div>
            <h1 className='text-2xl font-extrabold text-[#280822]'>Invoice</h1>
            <hr />
            <div className='md:w-1/2 w-full m-auto py-4 flex flex-col gap-4 px-6' ref={printRef} id='printable'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <div className=''>
                        <p className='text-[#280822] font-bold text-base md:text-xl'>Invoice: INV<span className='font-normal'>{invoiceNumber}</span></p>
                        <p className='text-[#280822] font-bold'>Date: <span className='font-normal'>{date}</span></p>
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        <img src="/images/logo.svg" alt="logo" className='w-[60%] md:w-[80%] h-full object-contain' />
                        <p className='text-[#280822] font-bold text-xs text-center md:text-xl'>Desa Purba Sari</p>
                    </div>
                </div>
                <table className='w-full' style={{ borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', fontWeight: 'bold' }}>Kode Barang</th>
                            <th style={{ border: '1px solid black', fontWeight: 'bold' }}>Quantity</th>
                            <th style={{ border: '1px solid black', fontWeight: 'bold' }}>Brand</th>
                            <th style={{ border: '1px solid black', fontWeight: 'bold' }}>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: any, index) => (
                            <tr key={index}>
                                <td style={{ border: '1px solid black', textAlign: 'center' }}>{item?.item?.code}</td>
                                <td style={{ border: '1px solid black', textAlign: 'center' }}>{item.qty}</td>
                                <td style={{ border: '1px solid black', textAlign: 'center' }}>{item?.item?.brand}</td>
                                <td style={{ border: '1px solid black', textAlign: 'center' }}>
                                    {formatRupiah(item?.item?.price)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex flex-row justify-between items-center w-full'>
                    <div className=''>
                        <p className='text-[#280822] font-bold'>
                            Payment:
                        </p>
                        <p>
                            {paymentMethod}
                        </p>
                    </div>
                    <div className=''>
                        <p className='text-[#280822] font-bold text-center'>
                            Total:
                        </p>
                        <p className='text-center'>
                            {total}
                        </p>
                    </div>
                </div>
                {
                    dp ? (
                        <div className='flex flex-row justify-between items-center w-full'>
                            <div className=''>
                                <p className='text-[#280822] font-bold'>
                                    DP:
                                </p>
                            </div>
                            <div className=''>
                                <p>
                                    {total}
                                </p>
                            </div>
                        </div>
                    ) : null
                }
                <div className='flex justify-end items-end mt-10'>
                    <p className='text-[#280822] text-center'>
                        Mulyani
                    </p>
                </div>
            </div>
            <div className='md:w-1/2 w-full m-auto py-4 flex flex-col gap-4 px-2'>
                {/* <button onClick={downloadPDF} className='bg-[#280822] rounded-lg w-full py-2 px-10 text-white'>
                    Print
                </button> */}
                <button onClick={handlePrint} className='bg-[#280822] rounded-lg w-full py-2 px-10 text-white'>
                    Print
                </button>
            </div>
        </div>
    );
};

export default PrintInvoice;
