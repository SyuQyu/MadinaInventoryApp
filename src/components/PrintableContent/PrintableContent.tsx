
import React from 'react';

interface InvoiceProps {
    invoiceNumber: string;
    date: string;
    items: {
        name: string;
        quantity: number;
        price: number;
    }[];
    total: number;
}

const PrintInvoice: React.FC<InvoiceProps> = ({ invoiceNumber, date, items, total }) => {
    console.log('print invoice', invoiceNumber, date, items, total)
    return (
        <div>
            <h1>Invoice #{invoiceNumber}</h1>
            <p>Date: {date}</p>
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.quantity}</td>
                            <td>{item.price}</td>
                            <td>{item.quantity * item.price}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3}>Total:</td>
                        <td>{total}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default PrintInvoice;
