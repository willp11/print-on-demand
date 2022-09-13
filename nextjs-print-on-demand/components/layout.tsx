import { ReactNode } from "react";
import Header from "./header/header";
import Footer from "./footer";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className="w-full bg-white">
            <div className="w-full max-w-[1200px] min-h-screen mx-auto">
                <Header />
                <div className="flex flex-col items-between">
                    {children}
                    <Footer />
                </div>
            </div>
        </div>
    )
}