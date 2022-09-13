import { ReactNode } from "react";

export default function Layout({children}: {children: ReactNode}) {
    return (
        <div className="w-full bg-white">
            <div className="w-full max-w-[1100px] mx-auto">
                {children}
            </div>
        </div>
    )
}