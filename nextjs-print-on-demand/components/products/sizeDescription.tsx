import { useState, Dispatch, SetStateAction } from 'react';
import {IProduct} from '../../types/product';

interface IStyle {
    borderTop: string,
    borderRight?: string,
    borderLeft?: string
}

function HeadingTab({title, activeTab, setActiveTab}: {title: string, activeTab: string, setActiveTab: Dispatch<SetStateAction<string>>}) {
    let active = false;
    if (activeTab === title) active = true;

    let style: IStyle = {
        borderTop: "3px solid #d1d5db"
    }
    if (active) style = {
        borderTop: "3px solid #000",
        borderRight: "1px solid #d1d5db",
        borderLeft: "1px solid #d1d5db"
    }
    return (
        <div onClick={()=>setActiveTab(title)} style={style} className="relative p-4 font-bold mr-2 cursor-pointer">
            <h2>{title}</h2>
            {active && <div className="w-full absolute -bottom-1 left-0 bg-white h-2 z-10"></div>}
        </div>
    )
}

function SizeTable({sizes}: {sizes: {[key: string]: string}}) {
    const headings = Object.keys(sizes).map(size=>{
        return <th key={size} className="w-20 p-1">{size}</th>
    });
    const values = Object.keys(sizes).map(size=>{
        const val = sizes[size];
        return <td key={size+"-body"} className="w-20 text-center p-1 text-sm">{val}</td>
    });

    return (
        <div className="w-full overflow-x-auto my-4">
            <table className="w-full table-fixed">
                <thead>
                    <tr className="border border-gray-300">{headings}</tr>
                </thead>
                <tbody>
                    <tr className="border border-gray-300">{values}</tr>
                </tbody>
            </table>
        </div>
    )
}

function ShippingReturns() {
    return (
        <>
            <h3 className="text-sm font-bold my-4">Returns Policy</h3>
            <p className="text-sm my-4">
                You may return blank garments at your own postage cost within 14 days of delivery for a full refund. 
                We'll pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.)
                Goods that are not faulty and printed to the customer's specification cannot be returned or exchanged as they are produced to the customer's requirements unless the garment is faulty or there is an issue with the design.
            </p>
            <p className="text-sm my-4">
                Our aim is to provide 100% customer satisfaction, so if this is the case you must contact us within 7 days of delivery and provide clear evidence of the defect.
                If we are satisfied that there is a defect in the garment provided we will endeavour to resolve the issue by way of a replacement or full refund. Faulty goods should be returned to us within 30 days of receipt for investigation.
                Please be aware that you shall be responsible for any return delivery charges, and the risk of loss or damage to the goods that you are returning until they have been received by us. 
                For your protection, we recommend that you use a recorded delivery service when returning goods.
            </p>
            <p className="text-sm my-4">
                You should expect to receive your refund within four weeks of giving your package to the return shipper, however, in many cases you will receive a refund more quickly. 
                This time period includes the transit time for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to process our refund request (5 to 10 business days).
            </p>

            <h3 className="text-sm font-bold my-4">Shipping</h3>
            <p className="text-sm my-4">
                We currently offer FREE Standard delivery for orders of £150 or more! Non UK-Mainland & remote areas are exempt from this offer and normal rate apply. 
                Delivery times are based on no hold ups from the time the order was placed.
            </p>
            <div className="flex flex-col text-sm my-4">
                <span>Delivery Options:</span>
                <span>Economy Delivery: £4.99 15-20 Days (Estimated Delivery)</span>
                <span>Standard Delivery: £5.99 10-15 Days (Estimated Delivery)</span>
            </div>
            <div className="flex flex-col text-sm my-4">
                <span>Non UK-Mainland & remote areas are set at a flat rate as follows:</span>
                <span>Standard Delivery: £25 0-5kg 15-20 Days (Estimated Delivery)</span>
                <span>Standard Delivery: £30 5-10kg 15-20 Days (Estimated Delivery)</span>
                <span>Standard Delivery: £35 10-20kg 15-20 Days (Estimated Delivery)</span>
            </div>
        </>
    )
}

export default function SizeDescription({product}: {product: IProduct}) {

    const [activeTab, setActiveTab] = useState("DETAILS & SIZING");

    const listItems = product.description.map(item=>{
        return (
            <li key={item}>{item}</li>
        )
    })
    const description = (
        <ul className="list-disc ml-5 mb-4 text-sm">
            {listItems}
        </ul>
    )

    return (
        <div>
            <div className="w-full flex justify-start border-b border-gray-300">
                <HeadingTab title="DETAILS & SIZING" activeTab={activeTab} setActiveTab={setActiveTab} />
                <HeadingTab title="SHIPPING & RETURNS" activeTab={activeTab} setActiveTab={setActiveTab}/>
            </div>

            {

            }
            {activeTab === "DETAILS & SIZING" &&
                <>
                    <h2 className="my-4 text-2xl font-bold tracking-tight">Material: {product.material}</h2>
                    {description}
                    <SizeTable sizes={product.sizes} />
                </>
            }

            {activeTab === "SHIPPING & RETURNS" && <ShippingReturns />}
        </div>
    )
}