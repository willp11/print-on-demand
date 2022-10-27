import Image from 'next/image';
import Link from 'next/link';

const serviceLinks = [
    {name: "FAQ", route: "/faq"},
    {name: "Washcare", route: "/wash-care"},
    {name: "Customizer Guide", route: "/customizer-guide"},
    {name: "Delivery & Returns", route: "/delivery-returns"},
    {name: "Contact Us", route: "/contact"}
]

const aboutLinks = [
    {name: "Artwork", route: "/artwork-guidelines"},
    {name: "Order Process", route: "/order-process"},
    {name: "Terms of Service", route: "/terms-of-service"},
    {name: "Refund Policy", route: "/refund-policy"},
    {name: "Privacy Policy", route: "/privacy-policy"}
]

const socialLinks = [
    {src: "/images/twitter.png", alt: "Twitter"},
    {src: "/images/facebook.png", alt: "Facebook"},
    {src: "/images/instagram.png", alt: "Instagram"},
]

export default function Footer() {
    return (
        <div className="w-full p-4 bg-black flex-col justify-center">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col xs:flex-row justify-between">
                <div className="w-[150px]">
                    <h3 className="text-white font-semibold">CUSTOMER SERVICE</h3>
                    <div className="flex flex-col">
                        {serviceLinks.map((link)=>(<Link key={link.name} href={link.route}><a className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">{link.name}</a></Link>))}
                    </div>
                </div>
                <div className="w-[150px] mt-4 xs:mt-0">
                    <h3 className="text-white font-semibold">ABOUT</h3>
                    <div className="flex flex-col">
                        {aboutLinks.map((link)=>(<Link key={link.name} href={link.route}><a className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">{link.name}</a></Link>))}
                    </div>
                </div>
                <div className="hidden sm:flex sm:flex-col w-[150px]">
                    <h3 className="text-white font-semibold text-center">STAY CONNECTED</h3>
                    <div className="flex justify-center items-center">
                        {socialLinks.map(social=>(
                            <div className="pr-2 cursor-pointer" key={social.alt}>
                                <Image
                                    src={social.src}
                                    height={32}
                                    width={32}
                                    alt={social.alt}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:hidden w-full mt-4">
                <h3 className="text-white">STAY CONNECTED</h3>
                <div className="flex">
                    {socialLinks.map(social=>(
                        <div className="pr-2 cursor-pointer" key={social.alt+"1"}>
                            <Image
                                src={social.src}
                                height={32}
                                width={32}
                                alt={social.alt}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}