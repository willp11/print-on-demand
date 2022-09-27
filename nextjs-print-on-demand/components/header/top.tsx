import { useUser } from "../../hooks/useUser"

export default function Top() {

    const {token} = useUser();

    return (
        <div className="p-2 flex justify-between text-sm font-semibold border-b border-gray-300">
            <p className="cursor-pointer hover:underline hover:underline-offset-4">CONTACT US</p>

            <p className="cursor-pointer hover:underline hover:underline-offset-4">
                {token === "" ? "SIGN IN" : "ACCOUNT"}
            </p>
        </div>
    )
}