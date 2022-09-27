import AccountMenu from "../../components/account/accountMenu";
import AccountDetails from "../../components/account/accountDetails";

export default function Account() {
    return (
        <div className="h-[500px] w-full flex justify-start border border-gray-300 rounded-md shadow-md my-4">
            <AccountMenu />
            <AccountDetails />
        </div>
    )
}