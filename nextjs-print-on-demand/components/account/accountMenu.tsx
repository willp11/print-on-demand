import MenuItem from "./menuItem";
import { useState } from "react";

const menuItems = [
    "Account Details",
    "My Orders",
    "Wishlist",
    "My Designs"
]

export default function AccountMenu() {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const menu = menuItems.map((item, i)=>{
        return (
            <div onClick={()=>setSelectedIndex(i)}>
                <MenuItem key={item} content={item} selected={selectedIndex === i} />
            </div>
        );
    })

    return (
        <div className="flex flex-col items-center justify-start border-r border-gray-300">
            {menu}
        </div>
    )
}