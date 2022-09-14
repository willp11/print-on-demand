interface ListItemProps {
    item: {title: string, route: string},
    handleNavigate: (url: string) => void
}

export default function NavListItem({item, handleNavigate}: ListItemProps) {
    return (
        <p  key={item.title}
            className="w-full py-1 pl-2 cursor-pointer text-sm text-black font-semibold hover:bg-gray-100 hover:text-blue-600" 
            onClick={()=>handleNavigate(item.route)}
        >
            {item.title}
        </p>
    )
}