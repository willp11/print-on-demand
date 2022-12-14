import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import SubmitBtn from '../ui/submitBtn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {handleDjangoErrors} from '../../utils/errors';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'next/router';
import {ArrowLeftIcon} from '@heroicons/react/24/outline';

interface IResetPasswordForm {
    email: string,
}

export default function ResetPasswordForm() {

    const router = useRouter();

    const ResetPasswordSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required')
    });

    const { token } = useUser();

    // Redirect if already logged in
    useEffect(()=>{
        if (token !== "" && token !== undefined) router.push('/')
    }, [token, router]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string[] | never>([]);
    const [emailSent, setEmailSent] = useState(false);

    const submitHandler = async (values: IResetPasswordForm) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        const url = `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}/auth/password/reset/`;
        const data = {
            email: values.email
        }
        setLoading(true);
        try {
            const res = await axios.post(url, data, {headers: headers});
            if (res.data?.detail === "Password reset e-mail has been sent.") setEmailSent(true);
        } catch(e: any) {
            if (e?.response?.data) {
                setError(handleDjangoErrors(e));
            }
        } finally {
            setLoading(false);
        }
    }

    const responseErrors = error.map(err=>{
        return <div className="text-xs" key={err}>{err}</div>
    });

    return (
        <section className="relative w-full max-w-[500px] p-4 mx-auto my-4 bg-gray-100 rounded shadow-md flex flex-col justify-start items-center">
            <ArrowLeftIcon className="w-6 h-6 hover:stroke-blue-600 absolute top-2 left-2 cursor-pointer" onClick={()=>router.back()} />
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Reset Password</h1>

            {
                !emailSent ? 
                <Formik
                    initialValues={{
                        email: ''
                    }}
                    validationSchema={ResetPasswordSchema}
                    onSubmit={(
                        values: IResetPasswordForm
                    ) => submitHandler(values)}
                >
                    {({ errors, touched }) => (
                        <Form className="flex flex-col">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <Field name="email" placeholder="Type email..."  className="p-1 w-[300px]" />
                            {errors.email && touched.email ? (
                                <div className="text-xs">*{errors.email}</div>
                            ) : null}
                            <SubmitBtn content="RESET" isLoading={loading}/>
                        </Form>
                    )}
                </Formik> :

                <div>
                    <p>Check your email and follow the link to reset your password.</p>
                </div>
            }

            {(responseErrors.length > 0 && !emailSent) && 
                <div className="flex flex-col mt-2">
                    {responseErrors}
                </div>
            }
        </section>
    )
}