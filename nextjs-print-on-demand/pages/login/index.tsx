import LoginForm from "../../components/auth/loginForm";
import Head from "next/head";

export default function Login() {
    return (
        <>
            <Head>
                <title>Print-It Login</title>
            </Head>
            <LoginForm />
        </>
    )
}