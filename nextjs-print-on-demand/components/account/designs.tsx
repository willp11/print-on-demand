import { fetchDesigns } from "../../utils/api";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IDesign } from "../../types/design";
import Design from "./design";
import Spinner from "../ui/spinner";

interface IDesignsProps {
    token: string,
    setShowDesignsModal?: Dispatch<SetStateAction<boolean>>,
}

export default function Designs({token, setShowDesignsModal}: IDesignsProps) {

    const [designs, setDesigns] = useState<IDesign[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const getDesigns = async () => {
            try {
                const designs = await fetchDesigns(token);
                console.log(designs);
                if (designs) {
                    setDesigns(designs);
                } else {
                    setError("There was a problem fetching your designs. Please try again.");
                }
            } catch(e) {
                setError("There was a problem fetching your designs. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        getDesigns();
    }, []);

    if (loading) return <Spinner />
    if (error !== "") return <p className="text-red-600 text-sm">{error}</p>

    if (designs.length !== 0) {
        return (
            <div className="w-full h-[500px] overflow-y-auto">
                {designs.map((design, i) => <Design key={i} design={design} setShowDesignsModal={setShowDesignsModal} />)}
            </div>
        )
    } else {
        return <div className="p-2">You have no designs saved.</div>
    }
}