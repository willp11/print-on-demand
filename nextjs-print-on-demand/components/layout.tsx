import { ReactNode } from "react";
import Header from "./header/header";
import Footer from "./footer";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className="w-full bg-white flex flex-col justify-between min-h-[100vh]">
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="flex flex-col justify-start">
                    <Header />
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}