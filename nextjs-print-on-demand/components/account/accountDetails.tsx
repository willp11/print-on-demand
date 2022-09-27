import { PencilSquareIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import ChangePassword from "./changePassword";

const DetailsField = ({title, content, placeholder}: {title: string, content: string, placeholder: string}) => {

    const [editMode, setEditMode] = useState(false);
    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    if (!editMode) {
        return (
            <div className="mb-2">
                <h2 className="text-sm text-gray-500 font-semibold">{title}</h2>
                <div className="flex items-center">
                    <p>{content}</p>
                    <PencilSquareIcon className="w-4 h-4 cursor-pointer ml-2 hover:stroke-blue-600" onClick={toggleEditMode} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="mb-2">
                <h2 className="text-sm text-gray-500 font-semibold">{title}</h2>
                <div className="flex items-center">
                    <input type="text" placeholder={placeholder} className="p-1 border border-gray-300" />
                    <XCircleIcon className="w-6 h-6 cursor-pointer ml-2 stroke-red-600 hover:stroke-red-700" onClick={toggleEditMode} />
                    <CheckCircleIcon className="w-6 h-6 cursor-pointer ml-2 stroke-green-600 hover:stroke-green-700" />
                </div>
            </div>
        )
    }
}

export default function AccountDetails() {
    return (
        <div className="w-full p-2">
            <div className="mb-2">
                <h2 className="text-sm text-gray-500 font-semibold">Email</h2>
                <div className="flex items-center">
                    <p>test@test.com</p>
                </div>
            </div>
            <DetailsField title="First Name" content="William" placeholder="Type new name..." />
            <DetailsField title="Last Name" content="Page" placeholder="Type new name..." />
            <DetailsField title="Phone Number" content="01234567890" placeholder="Type new number..." />
            <ChangePassword />
            <div className="mb-2">
                <h2 className="text-sm text-gray-500 font-semibold">Marketing Emails</h2>
                <div className="flex items-center">
                    <input type="checkbox" className="cursor-pointer" defaultChecked={true} />
                    <p className="text-sm ml-2">You are opted-in to receiving marketing emails.</p>
                </div>
            </div>
        </div>
    )
}