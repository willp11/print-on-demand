import GridItem from "./gridItem";

const productList = [
    {
        id: 1,
        name: "SOL'S REGENT T-SHIRT",
        price: 3.69,
        image: "/images/products/SOL_REGENT_TSHIRT.webp"
    },
    {
        id: 2,
        name: "SOL'S REGENT T-SHIRT",
        price: 3.69,
        image: "/images/products/SOL_REGENT_TSHIRT.webp"
    },
    {
        id: 3,
        name: "SOL'S REGENT T-SHIRT",
        price: 3.69,
        image: "/images/products/SOL_REGENT_TSHIRT.webp"
    },
    {
        id: 4,
        name: "SOL'S REGENT T-SHIRT",
        price: 3.69,
        image: "/images/products/SOL_REGENT_TSHIRT.webp"
    },
    {
        id: 5,
        name: "SOL'S REGENT T-SHIRT",
        price: 3.69,
        image: "/images/products/SOL_REGENT_TSHIRT.webp"
    }
]

export default function ProductGrid() {

    const products = productList.map(product=>{
        return <GridItem key={product.id} product={product} />
    })

    return (
        <div className="mx-auto my-2 w-[225px] xs:w-[450px] md:w-[675px] lg:w-[900px] grid gap-y-2 grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
            {products}
        </div>
    )
}