import Top from "./top";
import Middle from "./middle";
import DesktopNav from "./desktopNav/desktopNav";
import MobileNav from "./mobileNav/mobileNav";
import { useState } from "react";
import CartSummary from "../cart/cartSummary";

export default function Header() {

    const [showMobileNav, setShowMobileNav] = useState(false);
    const [showCartSummary, setShowCartSummary] = useState(false);

    const toggleShowSummary = () => {
        setShowCartSummary(!showCartSummary);
    }

    return (
        <div className="w-full">
            <Top />
            <Middle setShowMenu={setShowMobileNav} toggleShowSummary={toggleShowSummary} />
            <DesktopNav />
            <MobileNav active={showMobileNav} setActive={setShowMobileNav} />
            <CartSummary showSummary={showCartSummary} />
        </div>
    )
}