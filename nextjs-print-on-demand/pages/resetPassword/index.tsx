import ResetPasswordForm from "../../components/auth/resetPasswordForm";
import Head from "next/head";

export default function ResetPassword() {
    return (
        <div className="w-full p-2">
            <Head>
                <title>Print-It Reset Password</title>
            </Head>
            <ResetPasswordForm />
        </div>
    )
}