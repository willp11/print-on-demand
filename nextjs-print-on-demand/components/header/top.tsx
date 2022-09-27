import { useUser } from "../../hooks/useUser";
import { useRouter } from "next/router";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function Top() {

    const {token, setToken} = useUser();
    const router = useRouter();

    let login = (
        <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blue-600" onClick={()=>router.push('/login')}>
            LOGIN
        </p>
    )

    const logoutHandler = () => {
        if (setToken) setToken("");
    }
    let logout = (
        <div className="flex items-center">
            <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blue-600" onClick={logoutHandler}>
                LOGOUT
            </p>
            <UserCircleIcon className="w-6 h-6 hover:stroke-blue-600 ml-8 cursor-pointer" onClick={()=>router.push('/account')} />
        </div>
    )

    return (
        <div className="p-2 flex justify-between items-center text-sm font-semibold border-b border-gray-300">
            <p className="cursor-pointer hover:underline hover:underline-offset-4 hover:text-blue-600">CONTACT US</p>

            {token === undefined || token === "" ? login : logout}
        </div>
    )
}