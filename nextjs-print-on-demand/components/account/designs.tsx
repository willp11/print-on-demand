import { fetchDesigns } from "../../utils/api";
import { useUser } from "../../hooks/useUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDesign } from "../../types/design";
import Design from "./design";

interface IDesignsProps {
    setShowDesignsModal?: Dispatch<SetStateAction<boolean>>
}

export default function Designs({setShowDesignsModal}: IDesignsProps) {

    const { token } = useUser();
    const [designs, setDesigns] = useState<IDesign[]>([]);

    useEffect(() => {
        const getDesigns = async () => {
            if (token) {
                const designs = await fetchDesigns(token);
                if (designs !== null) setDesigns(designs);
            }
        }
        getDesigns();
    }, []);

    if (designs.length !== 0) {
        return (
            <div className="w-full h-[500px] overflow-y-auto">
                {designs.map((design, i) => <Design key={i} design={design} setShowDesignsModal={setShowDesignsModal} />)}
            </div>
        )
    } else return <></>
}