import { fetchDesigns } from "../../utils/api";
import { useUser } from "../../hooks/useUser";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDesign } from "../../types/design";
import Design from "./design";

export default function Designs({setShowDesignsModal}: {setShowDesignsModal: Dispatch<SetStateAction<boolean>>}) {

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
            <div>
                {designs.map((design, i) => <Design key={i} design={design} setShowDesignsModal={setShowDesignsModal} />)}
            </div>
        )
    } else return <></>
}