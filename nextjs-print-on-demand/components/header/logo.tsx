import Image from "next/image";

export default function Logo() {
    return (
        <div className="relative h-[70px] w-[175px] xs:h-[80px] xs:w-[200px] flex items-center justify-center cursor-pointer">
            <Image
                src="/images/t-shirt-printing-logo-new.png"
                layout="fill"
                objectFit="contain"
                alt=""
            />
        </div>
    )
}