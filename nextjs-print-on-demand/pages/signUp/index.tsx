import SignUpForm from "../../components/auth/signUpForm";
import Head from "next/head";

export default function SignUp() {
    return (
        <div className="w-full p-2">
            <Head>
                <title>Print-It Sign-Up</title>
            </Head>
            <SignUpForm />
        </div>
    )
}