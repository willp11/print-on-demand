import { useDesign } from "../../hooks/useDesign";
import { useUser } from "../../hooks/useUser";

export default function SaveDesign() {

    const { saveDesign } = useDesign();
    const {token} = useUser();

    const saveHandler = () => {
        if (typeof token === "string") saveDesign(token)
    }

    return (
        <div>
            <h2 className="text-base lg:text-lg font-bold tracking-tight">Save Design</h2>
            <button onClick={saveHandler} className="border border-gray-300 bg-gray-50 hover:bg-gray-100 shadow-md p-1 w-32 rounded">Save</button>
        </div>
    )
}