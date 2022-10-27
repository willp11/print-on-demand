import { Dispatch, SetStateAction } from "react"
import { IDesign } from "../../types/design"

interface ISaveDesignBtnProps {
    loading: boolean,
    designName: string,
    setDesignName: Dispatch<SetStateAction<string>>,
    saveHandler: (type: 'save' | 'update') => void,
    currentDesign: IDesign | null | undefined
}

export default function SaveDesignBtns({loading, designName, setDesignName, saveHandler, currentDesign}: ISaveDesignBtnProps) {
    return (
        <>
            <input 
                value={designName} 
                className="px-2 py-1 mt-4 border border-gray-300" 
                placeholder="Type design name..." 
                onChange={(e)=>setDesignName(e.target.value)} 
            />
            {currentDesign && <button 
                disabled={loading || !currentDesign} 
                onClick={()=>saveHandler("update")}
                className={
                    loading ? "w-32 p-2 mt-2 text-gray-800 text-sm font-semibold bg-gray-300 rounded cursor-not-allowed"
                    : "w-32 p-2 mt-2 text-white text-sm font-semibold bg-sky-500 hover:bg-blue-500 transition ease-in-out duration-300 rounded cursor-pointer"
                }
            >
                {loading ? "Loading..." : "Update existing"}
            </button>}
            <button 
                disabled={loading} 
                onClick={()=>saveHandler("save")}
                className={
                    loading ? "w-32 p-2 mt-2 text-gray-800 text-sm font-semibold bg-gray-300 rounded cursor-not-allowed"
                    : "w-32 p-2 mt-2 text-white text-sm font-semibold bg-sky-500 hover:bg-blue-500 transition ease-in-out duration-300 rounded cursor-pointer"
                }
            >
                {loading ? "Loading..." : "Save New"}
            </button>
        </>
    )
}