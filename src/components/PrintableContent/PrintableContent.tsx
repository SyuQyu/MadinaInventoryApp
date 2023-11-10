// PrintableContent.jsx
import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BsBoxArrowInDown, BsBoxArrowInUp } from 'react-icons/bs';

const PrintableContent = ({ item, id, formattedPaymentMethod }: any) => {
    const printRef = useRef<HTMLDivElement>(null);
    const downloadPDF = () => {
        const pdf = new jsPDF('p', 'mm', 'a4', true);

        // Use html2canvas to capture the entire document
        html2canvas(document.body).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

            // Calculate the number of pages needed
            const numPages = Math.ceil(imgHeight / pdfHeight);

            // Loop through each page and add it to the PDF
            for (let i = 0; i < numPages; i++) {
                const imgX = (pdfWidth - imgWidth * ratio) / 2;
                const imgY = i * pdfHeight;
                pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

                // Add a new page if there are more pages to capture
                if (i < numPages - 1) {
                    pdf.addPage();
                }
            }

            // Save the PDF with a unique name
            pdf.save(`invoice-${id}.pdf`);
        });
    };
    return (
        // Your printable content JSX here, including the table for displaying data
        <div ref={printRef}>
            <div className="w-full h-[200vh] flex flex-col gap-3 rounded-t-[4rem] shadow-2xl pt-10 md:px-10 px-5 ">
                <dl className="grid grid-cols-3">
                    <div className="col-span-full font-bold">Dibuat Oleh</div>
                    <div className="col-span-full">{item?.user_name}</div>

                    <div className="col-span-full font-bold">Tipe Pembayaran</div>
                    <div className="col-span-full">{formattedPaymentMethod}</div>

                    <div className="col-span-full font-bold">Total</div>
                    <div className="col-span-full">
                        {item?.total_price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}
                    </div>

                    <div className="col-span-full font-bold">Catatan</div>
                    <div className="col-span-full">{item?.note}</div>

                    <div className="col-span-full font-bold">Tanggal Dibuat</div>
                    <div className="col-span-full">{item?.created_at}</div>
                </dl>
                <div className="w-full h-0.5 rounded-full bg-gray-500"></div>
                <div className="flex flex-col justify-between items-start gap-2">
                    <p className="text-md text-justify font-bold">
                        Detail Barang
                    </p>
                    {item?.details?.map((item: any, index: any) => (
                        <div key={index} className="flex flex-col justify-between items-start gap-2 p-2 w-full bg-[#EFEFEF] rounded-md shadow-md">
                            {item?.type === 'in' ? (
                                <div className="flex flex-row justify-between items-center w-full">
                                    <div className="flex flex-col justify-between items-start gap-2 w-full">
                                        <div className="text-black font-thin text-xs">{item?.item?.code}</div>
                                        <div className="text-black font-bold text-sm">{item?.item?.name}</div>
                                        <div className="flex flex-row justify-start items-start gap-2">
                                            <div className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">{item?.item?.item_type}</div>
                                            <div className="text-gray-500/80 font-normal text-xs">{item?.item?.brand}</div>
                                        </div>
                                        <div className="text-gray-500/80 font-normal text-xs">{Math.abs(item?.qty)} x {item?.item?.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)} = {item?.total_price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}</div>
                                    </div>
                                    <div className="flex flex-col items-end justify-center gap-0.5">
                                        <div className="whitespace-nowrap">Stock In</div>
                                        <div className="flex justify-between items-center gap-0.5">
                                            <BsBoxArrowInUp className="w-5 h-5 text-green-500" />
                                            <div>{item?.qty}</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-row justify-between items-center w-full">
                                    <div className="flex flex-col justify-between items-start gap-2 w-full">
                                        <div className="text-black font-thin text-xs">{item?.item?.code}</div>
                                        <div className="text-black font-bold text-sm">{item?.item?.name}</div>
                                        <div className="flex flex-row justify-start items-start gap-2">
                                            <div className="text-gray-500/80 font-normal text-xs border-r-2 border-gray-500/80 pr-1">{item?.item?.item_type}</div>
                                            <div className="text-gray-500/80 font-normal text-xs">{item?.item?.brand}</div>
                                        </div>
                                        <div className="text-gray-500/80 font-normal text-xs">{Math.abs(item?.qty)} x {item?.item?.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)} = {item?.total_price?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' }).slice(0, -3)}</div>
                                    </div>
                                    <div className="flex flex-col items-end justify-center gap-0.5">
                                        <div className="whitespace-nowrap">Stock Out</div>
                                        <div className="flex justify-between items-center gap-0.5">
                                            <BsBoxArrowInDown className="w-5 h-5 text-red-500" />
                                            <div>{item?.qty}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={downloadPDF}>download</button>
        </div>
    );
};

export default PrintableContent;
