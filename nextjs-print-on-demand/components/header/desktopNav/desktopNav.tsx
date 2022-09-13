import NavItem from "./navItem";

export default function DesktopNav() {

    return (
        <div className="w-full hidden md:flex md:items-center md:justify-center">
            <NavItem title="SHOP BY PRODUCT" hasBorder={true}>
                <div className="absolute top-12 left-0 w-[200px] h-[240px] border border-gray-300 bg-white"></div>
            </NavItem>

            <NavItem title="SHOP BY BRAND" hasBorder={true}>
                <div className="absolute top-12 left-0 w-[200px] h-[240px] border border-gray-300 bg-white"></div>
            </NavItem>

            <NavItem title="MEN" hasBorder={true}>
                <div className="absolute top-12 left-0 w-[200px] h-[240px] border border-gray-300 bg-white"></div>
            </NavItem>

            <NavItem title="WOMEN" hasBorder={true}>
                <div className="absolute top-12 left-0 w-[200px] h-[240px] border border-gray-300 bg-white"></div>
            </NavItem>

            <NavItem title="CHILDREN" hasBorder={false}>
                <div className="absolute top-12 left-0 w-[200px] h-[240px] border border-gray-300 bg-white"></div>
            </NavItem>
        </div>
    )
}