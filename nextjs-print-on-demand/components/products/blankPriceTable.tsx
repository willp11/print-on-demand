function TableRow({content, underline}: {content: string, underline: boolean}) {
    let className="py-1 border-b border-gray-300";
    if (!underline) className="py-1";
    return (
        <div className={className}>
            <p className="text-blue-600 text-xs">{content}</p>
        </div>
    )
}

export default function BlankPriceTable({rows}: {rows: string[]}) {

    const rowDivs = rows.map((row, idx)=>{
        let underline = true;
        if (idx === rows.length-1) underline = false;
        return <TableRow key={row} content={row} underline={underline} />
    })

    return (
        <div className="w-full border-2 border-gray-300 rounded px-2 pt-2 pb-1">
            <h3 className="text-sm font-semibold">Blank Pricing (Per item)</h3>
            {rowDivs}
        </div>
    )
}