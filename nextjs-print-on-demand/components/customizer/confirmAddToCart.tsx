export default function ConfirmAddToCart({total, loading}: {total: number, loading: boolean}) {
    return (
        <div className="w-full border border-gray-300 p-2 m-2 flex justify-around items-center rounded">
            <p className="ml-4 text-xl font-bold">
                Total: ${total.toFixed(2)}
            </p>
            <button disabled={loading} className="btn w-32">{loading ? "loading..." : "Confirm"}</button>
        </div>
    )
}