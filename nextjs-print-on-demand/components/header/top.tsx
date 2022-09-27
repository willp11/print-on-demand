import { useUser } from "../../hooks/useUser";
import { useRouter } from "next/router";

export default function Top() {

    const {token, setToken} = useUser();
    const router = useRouter();

    let login = (
        <p className="cursor-pointer hover:underline hover:underline-offset-4" onClick={()=>router.push('/login')}>
            LOGIN
        </p>
    )

    const logoutHandler = () => {
        if (setToken) setToken("");
    }
    let logout = (
        <p className="cursor-pointer hover:underline hover:underline-offset-4" onClick={logoutHandler}>
            LOGOUT
        </p>
    )

    return (
        <div className="p-2 flex justify-between text-sm font-semibold border-b border-gray-300">
            <p className="cursor-pointer hover:underline hover:underline-offset-4">CONTACT US</p>

            {token === undefined || token === "" ? login : logout}
        </div>
    )
}