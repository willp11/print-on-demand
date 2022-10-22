// import tshirt from '/t-shirt.svg';
import Image from 'next/image';

export default function TShirtIcon() {
    return (
        // <img src={tshirt} className={className} alt="select product" aria-label='select product'/>
        <Image 
            src='/images/t-shirt.svg'
            height="24px"
            width="24px"
            className="cursor-pointer"
            alt="select product" 
            aria-label='select product'
        />
    )
}