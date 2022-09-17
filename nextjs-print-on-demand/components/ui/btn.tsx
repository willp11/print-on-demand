export default function Btn({content, click}: {content: string, click?: ()=>any, route?: Promise<boolean> }) {
    return (
        <button onClick={click} className="p-2 rounded w-full text-white text-sm font-semibold bg-sky-500 hover:bg-blue-500 transition ease-in-out duration-300">
            {content}
        </button>
    )
}