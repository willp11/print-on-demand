import { useState } from "react";
import AccountMenu from "../../components/account/accountMenu";
import AccountDetails from "../../components/account/accountDetails";
import MyOrders from "../../components/account/myOrders";
import Designs from "../../components/account/designs";

export default function Account() {

    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <div className="w-full p-1">
            <div className="h-[500px] w-full flex justify-start border border-gray-300 rounded-md shadow-md my-4">
                <AccountMenu selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex} />
                {(selectedIndex === 0) && <AccountDetails />}
                {(selectedIndex === 1) && <MyOrders />}
                {(selectedIndex === 2) && <Designs />}
            </div>
        </div>
    )
}