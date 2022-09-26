import LoginForm from "../../components/auth/loginForm";
import Head from "next/head";

export default function Login() {
    return (
        <div className="w-full p-2">
            <Head>
                <title>Print-It Login</title>
            </Head>
            <LoginForm />
        </div>
    )
}