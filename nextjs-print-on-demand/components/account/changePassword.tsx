import ChangePasswordForm from "../auth/changePasswordForm";
import { useState } from "react";

export default function ChangePassword() {

    const [editMode, setEditMode] = useState(false);

    const goBackHandler = () => {
        setEditMode(false);
    }

    if (editMode) {
        return (
            <div className="mb-2">
                <ChangePasswordForm goBack={goBackHandler} />
            </div>
        )
    } else {
        return (
            <div className="mb-2">
                <h2 className="text-sm text-gray-500 font-semibold">Change Password</h2>
                <button className="btn mt-1" style={{width: "120px"}} onClick={()=>setEditMode(true)}>CHANGE</button>
            </div>
        )
    }
}