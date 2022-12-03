import {XMarkIcon} from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from "react";
import Logo from '../logo';
import { useRouter } from 'next/router';
import NavItem from './navItem';
import NavListItem from './navListItem';
// import SearchForm from '../search/searchForm';

interface MobileMenuProps {
    active: boolean,
    setActive: Dispatch<SetStateAction<boolean>>;
}

export const productList = [
    {title: "All", route: "/products/all"},
    {title: "T-Shirts", route: "/products/t-shirts"},
    {title: "Polo Shirts", route: "/products/polo-shirts"},
    {title: "Vests", route: "/products/vests"},
    {title: "Sweatshirts", route: "/products/sweatshirts"},
    {title: "Hoodies", route: "/products/hoodies"},
    {title: "Leggings", route: "/products/leggings"},
    {title: "Shorts", route: "/products/shorts"},
    {title: "Bags", route: "/products/bags"},
    {title: "Accessories", route: "/products/accessories"}
]

export const brandList = [
    {title: "American Apparel", route: "/products/american-apparel"},
    {title: "Awdis", route: "/products/awdis"},
    {title: "Bella+Canvas", route: "/products/bella-canvas"},
    {title: "Fruit of the Loom", route: "/products/fruit-of-the-loom"},
    {title: "Gildan", route: "/products/gildan"}
]

const menuCategories = [
    {title: "SHOP BY PRODUCT", list: productList},
    {title: "SHOP BY BRAND", list: brandList},
    {title: "MEN", list: productList},
    {title: "WOMEN", list: productList},
    {title: "CHILDREN", list: productList},
]

export default function MobileNav({active, setActive}: MobileMenuProps) {

    const router = useRouter();

    const hideHandler = () : void => {
        setActive(false);
    }

    const handleNavigate = (url: string) : void => {
        hideHandler();
        router.push(url);
    }

    // main component's class
    let divClass = `fixed top-0 left-0 -translate-x-full
        z-20 w-full h-screen bg-white border border-gray-300
        transform transition ease-in-out duration-300`;

    if (active) {
        divClass = `fixed top-0 left-0 translate-x-0 md:-translate-x-full
        z-20 w-full h-screen bg-white border border-gray-300
        transform transition ease-in-out duration-300`;
    }

    // menu items
    const menuItems = menuCategories.map((category) => {
        const children = category.list.map((item)=>{
            return (
                <NavListItem key={item.title} item={item} handleNavigate={handleNavigate} />
            )
        })
        return (
            <NavItem key={category.title} title={category.title}>
                {children}
            </NavItem>
        )
    })

    return (
        <nav className={divClass}>
            <div className="w-full flex flex-col">
                <div className="p-2 flex justify-end text-sm font-semibold border-b border-gray-300">
                    <XMarkIcon className="w-5 h-5 cursor-pointer" onClick={hideHandler} />
                </div>
                <div className="w-full flex items-center justify-start p-2">
                    <Logo />
                </div>
                {/* <div className="ml-2 mb-2"><SearchForm /></div> */}
                
                {menuItems}
            </div>
        </nav>
    )

}