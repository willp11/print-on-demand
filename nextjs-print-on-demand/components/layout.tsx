import { ReactNode } from "react";
import Header from "./header/header";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className="w-full bg-white">
            <div className="w-full max-w-[1200px] mx-auto">
                <Header />
                {children}
            </div>
        </div>
    )
}