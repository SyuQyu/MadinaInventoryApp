import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import React, { useRef } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import { formatRupiah } from "../../../utils";

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
    const downloadPDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4', true);
        const myDiv: any = document.getElementById("printable");
        // Use html2canvas to capture the entire document
        html2canvas(myDiv).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = (pdfHeight - imgHeight * ratio) / 2;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);


            // Save the PDF with a unique name
            pdf.save(`invoice-${invoiceNumber}.pdf`);
        });
    };

    const handle = useReactToPrint({
        content: () => printRef.current,
        // copyStyles: false
    });

    const handlePrint = () => {
        handle()
        console.log('print', printRef.current)
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
            <div className='md:w-1/2 w-full m-auto py-4 flex flex-col gap-4 px-2' ref={printRef} id='printable'>
                <div className=''>
                    <p className='text-[#280822] font-bold text-xl'>Invoice: INV<span className='font-normal'>{invoiceNumber}</span></p>
                    <p className='text-[#280822] font-bold'>Date: <span className='font-normal'>{date}</span></p>
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
                        <p className='text-[#280822] font-bold'>
                            Total:
                        </p>
                        <p>
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
                    <p className='text-[#280822] text mr-6'>
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
