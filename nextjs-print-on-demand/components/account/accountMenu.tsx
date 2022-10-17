import MenuItem from "./menuItem";
import { Dispatch, SetStateAction } from "react";

const menuItems = [
    "Account Details",
    "My Orders",
    "My Designs"
]

interface IAccountMenuProps {
    selectedIndex: number,
    setSelectedIndex: Dispatch<SetStateAction<number>>
}

export default function AccountMenu({selectedIndex, setSelectedIndex}: IAccountMenuProps) {

    const menu = menuItems.map((item, i)=>{
        return (
            <div key={item} onClick={()=>setSelectedIndex(i)}>
                <MenuItem content={item} selected={selectedIndex === i} />
            </div>
        );
    })

    return (
        <div className="flex flex-col items-center justify-start border-r border-gray-300">
            {menu}
        </div>
    )
}