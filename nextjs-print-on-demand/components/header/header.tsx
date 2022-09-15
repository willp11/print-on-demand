import Top from "./top";
import Middle from "./middle";
import DesktopNav from "./desktopNav/desktopNav";
import MobileNav from "./mobileNav/mobileNav";
import { useState } from "react";

export default function Header() {

    const [showMobileNav, setShowMobileNav] = useState(false);
    return (
        <div className="w-full">
            <Top />
            <Middle setShowMenu={setShowMobileNav} />
            <DesktopNav />
            <MobileNav active={showMobileNav} setActive={setShowMobileNav} />
        </div>
    )
}