import NavItem from "./navItem";
import { productList, brandList } from "../mobileNav/mobileNav";
import NavListItem from "../mobileNav/navListItem";
import {useRouter} from "next/router";

const menuCategories = [
    {title: "SHOP BY PRODUCT", list: productList, hasBorder: true},
    // {title: "SHOP BY BRAND", list: brandList, hasBorder: true},
    {title: "MEN", list: productList, hasBorder: true},
    {title: "WOMEN", list: productList, hasBorder: true},
    {title: "CHILDREN", list: productList, hasBorder: false},
]

export default function DesktopNav() {

    const router = useRouter();

    // menu items
    const menuItems = menuCategories.map((category) => {
        const children = category.list.map((item)=>{
            return (
                <NavListItem key={item.title} item={item} handleNavigate={()=>router.push(item.route)} />
            )
        })
        return (
            <NavItem key={category.title} title={category.title} hasBorder={category.hasBorder}>
                <div className="absolute top-[3.25rem] left-0 w-[200px] border border-gray-300 bg-white">
                    {children}
                </div>
            </NavItem>
        )
    })

    return (
        <div className="w-full hidden md:flex md:items-center md:justify-center border-b border-gray-300">
            {menuItems}
        </div>
    )
}