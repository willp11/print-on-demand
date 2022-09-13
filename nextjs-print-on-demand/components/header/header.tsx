import Top from "./top";
import Middle from "./middle";
import DesktopNav from "./desktopNav/desktopNav";

export default function Header() {
    return (
        <div className="w-full">
            <Top />
            <Middle />
            <DesktopNav />
        </div>
    )
}