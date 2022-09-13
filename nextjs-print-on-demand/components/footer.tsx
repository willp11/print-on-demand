import Image from 'next/image';

export default function Footer() {
    return (
        <div className="w-full p-4 bg-black flex-col justify-center">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col xs:flex-row justify-between">
                <div className="w-[150px]">
                    <h3 className="text-white font-semibold">CUSTOMER SERVICE</h3>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">FAQ</p>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Washcare</p>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Customiser Guide</p>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Delivery & Returns</p>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Contact Us</p>
                </div>
                <div className="w-[150px] mt-4 xs:mt-0">
                    <h3 className="text-white font-semibold">ABOUT</h3>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Artwork</p>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Order Process</p>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Terms of Service</p>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Refund Policy</p>
                    <p className="text-gray-300 text-sm hover:underline hover:underline-offset-2 cursor-pointer w-fit">Privacy Policy</p>
                </div>
                <div className="hidden sm:flex sm:flex-col w-[150px]">
                    <h3 className="text-white font-semibold text-center">STAY CONNECTED</h3>
                    <div className="flex justify-center items-center">
                        <div className="pr-2 cursor-pointer">
                            <Image
                                src="/images/twitter.png"
                                height={32}
                                width={32}
                                alt="Twitter"
                            />
                        </div>
                        <div className="pr-2 cursor-pointer">
                            <Image
                                src="/images/facebook.png"
                                height={32}
                                width={32}
                                alt="Twitter"
                            />
                        </div>
                        <div className="cursor-pointer">
                            <Image
                                src="/images/instagram.png"
                                height={32}
                                width={32}
                                alt="Twitter"
                            />
                        </div>  
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:hidden w-full mt-4">
                <h3 className="text-white">STAY CONNECTED</h3>
                <div className="flex">
                    <div className="pr-2 cursor-pointer">
                        <Image
                            src="/images/twitter.png"
                            height={32}
                            width={32}
                            alt="Twitter"
                        />
                    </div>
                    <div className="pr-2 cursor-pointer">
                        <Image
                            src="/images/facebook.png"
                            height={32}
                            width={32}
                            alt="Twitter"
                        />
                    </div>
                    <div className="cursor-pointer">
                        <Image
                            src="/images/instagram.png"
                            height={32}
                            width={32}
                            alt="Twitter"
                        />
                    </div>  
                </div>
            </div>
        </div>
    )
}