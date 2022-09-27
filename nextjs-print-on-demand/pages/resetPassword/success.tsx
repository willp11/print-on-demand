import { useRouter } from "next/router";
import Head from "next/head";

export default function Success() {

    const router = useRouter();

    return (
        <div className="w-full p-2">
            <Head>
                <title>Print-It Reset Successful</title>
            </Head>
            <section className="w-full max-w-[500px] p-4 mx-auto my-4 bg-gray-100 rounded shadow-md flex flex-col justify-start items-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-2">Reset Password</h1>
                <p>Your password was successfully reset.</p>
                <p className="cursor-pointer text-blue-600 font-semibold underline mt-2" onClick={()=>router.push('/login')}>LOGIN</p>
            </section>
        </div>
    )
}