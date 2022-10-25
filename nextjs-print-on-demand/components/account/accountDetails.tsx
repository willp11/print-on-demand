import { PencilSquareIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import ChangePassword from "./changePassword";
import { updateUserProfile, getUserProfile } from "../../utils/api";
import { useUser } from "../../hooks/useUser";
import Spinner from "../ui/spinner";

const DetailsField = ({title, content, placeholder, token}: {title: string, content: string, placeholder: string, token: string}) => {

    const [contentState, setContentState] = useState(content);
    const [newContent, setNewContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const updateDetailsHandler = async () => {
        let url;
        let data;
        if (title === "First Name") {
            url = "/api/v1/update-first-name/";
            data = {first_name: newContent};
        } else if (title === "Last Name") {
            url = "/api/v1/update-last-name/";
            data = {last_name: newContent};
        } else if (title === "Phone Number") {
            url = "/api/v1/update-phone-number/";
            data = {phone_number: newContent};
        }
        if (url && data) {
            setLoading(true);
            try {
                const res = await updateUserProfile(token, url, data);
                if (res) {
                    if (res.status === 200) {
                        setMessage("Successfully updated");
                        if (title === "First Name") {
                            setContentState(res.data.first_name);
                            setMessage("Details updated successfully.");
                            setError("");
                        } else if (title === "Last Name") {
                            setContentState(res.data.last_name);
                            setMessage("Details updated successfully.");
                            setError("");
                        } else if (title === "Phone Number") {
                            setContentState(res.data.phone_number);
                            setMessage("Details updated successfully.");
                            setError("");
                        }
                    } else {
                        setError("There was a problem updating your info. Please try again.");
                        setMessage("");
                    }
                } else {
                    setError("There was a problem updating your info. Please try again.");
                    setMessage("");
                }
            } catch(e) {
                setError("There was a problem updating your info. Please try again.");
                setMessage("");
            } finally {
                setLoading(false);
                toggleEditMode();
            }
        }
    }

    if (!editMode) {
        return (
            <div className="mb-2">
                <h2 className="text-sm text-gray-500 font-semibold">{title}</h2>
                <div className="flex items-center">
                    <p>{contentState}</p>
                    <PencilSquareIcon className="w-4 h-4 cursor-pointer ml-2 hover:stroke-blue-600" onClick={toggleEditMode} />
                </div>
                {message && <p className="text-green-600 text-sm">{message}</p>}
                {error && <p className="text-red-600 text-sm">{error}</p>}
            </div>
        )
    } else {
        if (loading) {
            return <Spinner />
        } else {
            return (
                <div className="mb-2">
                    <h2 className="text-sm text-gray-500 font-semibold">{title}</h2>
                    <div className="flex items-center">
                        <input type="text" onChange={(e)=>setNewContent(e.target.value)} placeholder={placeholder} className="p-1 border border-gray-300" />
                        <XCircleIcon className="w-6 h-6 cursor-pointer ml-2 stroke-red-600 hover:stroke-red-700" onClick={toggleEditMode} />
                        <CheckCircleIcon className="w-6 h-6 cursor-pointer ml-2 stroke-green-600 hover:stroke-green-700" onClick={updateDetailsHandler} />
                    </div>
                </div>
            )
        }
    }
}

export default function AccountDetails({token}: {token: string}) {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [userData, setUserData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: ""
    })

    useEffect(()=>{
        const getData = async () => {
            try {
                const res = await getUserProfile(token);
                if (res) {
                    const data = {
                        first_name: res.data.first_name,
                        last_name: res.data.last_name,
                        email: res.data.email,
                        phone_number: res.data.user_details.phone_number
                    }
                    setUserData(data);
                } else {
                    setError("There was a problem getting your profile. Please try again.");
                }
            } catch {
                setError("There was a problem getting your profile. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [token])

    if (loading) return <div className="p-2"><Spinner /></div>
    if (error !== "") return <p className="text-red-600 text-sm p-2">{error}</p>

    return (
        <div className="w-full p-2">
            <div className="mb-2">
                <h2 className="text-sm text-gray-500 font-semibold">Email</h2>
                <div className="flex items-center">
                    <p>{userData.email}</p>
                </div>
            </div>
            <DetailsField title="First Name" content={userData.first_name} placeholder="Type new name..." token={token} />
            <DetailsField title="Last Name" content={userData.last_name} placeholder="Type new name..." token={token} />
            <DetailsField title="Phone Number" content={userData.phone_number} placeholder="Type new number..." token={token} />
            <ChangePassword />
        </div>
    )
}