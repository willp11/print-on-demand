import { useDesign } from "../../hooks/useDesign";

export default function SaveDesign() {

    const { saveDesign } = useDesign();

    return (
        <div>
            <h2 className="text-base lg:text-xl font-bold tracking-tight">Save Design</h2>
            <button onClick={saveDesign} className="border border-gray-300 p-1 w-32 rounded">Save</button>
        </div>
    )
}