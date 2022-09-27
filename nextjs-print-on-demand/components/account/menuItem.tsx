export default function MenuItem({content, selected}: {content: string, selected: boolean}) {

    let className = "w-[120px] sm:w-[200px] bg-white py-1 px-2 text-left text-sm font-semibold cursor-pointer rounded-l";
    if (selected) className = "w-[120px] sm:w-[200px] bg-gray-100 py-1 px-2 text-left text-sm text-blue-600 font-semibold cursor-pointer rounded-l"

    return (
        <div className={className}>
            {content}
        </div>
    )
}