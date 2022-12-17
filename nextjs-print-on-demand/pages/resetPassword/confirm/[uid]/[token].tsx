import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import ConfirmResetPasswordForm from "../../../../components/auth/confirmResetPasswordForm";
import Head from "next/head";

export default function ResetPassword() {

    const router = useRouter();
    const [uid, setUid] = useState<string>("");
    const [token, setToken] = useState<string>("");

    useEffect(()=>{
        if (router.query?.uid && typeof router.query?.uid === "string") setUid(router.query?.uid);
        if (router.query?.token && typeof router.query?.token === "string") setToken(router.query?.token);
    }, [router])

    return (
        <div className="w-full p-2">
            <Head>
                <title>Print-It Reset Password</title>
            </Head>
            <ConfirmResetPasswordForm uid={uid} token={token} />
        </div>
    )
}