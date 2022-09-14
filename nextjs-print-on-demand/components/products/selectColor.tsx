function ColorPreview({color}: {color: string}) {
    return <div style={{backgroundColor: color}} className="h-8 w-8 rounded-full border border-gray-300 shadow-md cursor-pointer mr-1"></div>
}

export default function SelectColor({colors}: {colors: string[]}) {

    const palette = colors.map(color=>{
        return <ColorPreview color={color} />
    })

    return (
        <div>
            <h3 className="text-sm font-semibold">Select Colour:</h3>
            <div className="flex justify-start items-center">
                {palette}
            </div>
        </div>
    )
}