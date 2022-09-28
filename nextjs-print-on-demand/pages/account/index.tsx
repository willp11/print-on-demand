import { useState } from "react";
import AccountMenu from "../../components/account/accountMenu";
import AccountDetails from "../../components/account/accountDetails";
import WishList from "../../components/account/wishList";
import MyOrders from "../../components/account/myOrders";

export default function Account() {

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="min-h-[500px] w-full flex justify-start border border-gray-300 rounded-md shadow-md my-4 overflow-y-auto">
            <AccountMenu selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
            {(selectedIndex === 0) && <AccountDetails />}
            {(selectedIndex === 1) && <MyOrders />}
            {(selectedIndex === 2) && <WishList />}
        </div>
    )
}