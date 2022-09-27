import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import SubmitBtn from '../ui/submitBtn';
import { useState } from 'react';
import axios from 'axios';
import {handleDjangoErrors} from '../../utils/errors';
import { useRouter } from 'next/router';

interface IConfirmResetForm {
    password: string,
    confirmPassword: string
}

export default function ConfirmResetPasswordForm({uid, token}: {uid: string, token: string}) {

    const router = useRouter();

    const ConfirmResetSchema = Yup.object().shape({
        password: Yup.string().min(8, 'Password must be at least 8 characters.').required("Required"),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string[] | never>([]);

    const submitHandler = async (values: IConfirmResetForm) => {
        console.log("submit");
        const headers = {
            'Content-Type': 'application/json'
        }
        const url = `http://localhost:8000/auth/password/reset/confirm/${uid}/${token}/`;
        const data = {
            new_password1: values.password,
            new_password2: values.confirmPassword,
            uid: uid,
            token: token
        }
        setLoading(true);
        try {
            const res = await axios.post(url, data, {headers: headers});
            console.log(res);
            if (res.data?.detail === "Password has been reset with the new password.") router.push('/resetPassword/success')
        } catch(e: any) {
            if (e?.response?.data) {
                setError(handleDjangoErrors(e));
            }
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    const responseErrors = error.map(err=>{
        return <div className="text-xs">{err}</div>
    });

    return (
        <section className="w-full max-w-[500px] p-4 mx-auto my-4 bg-gray-100 rounded shadow-md flex flex-col justify-start items-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Reset Password</h1>
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={ConfirmResetSchema}
                onSubmit={(
                    values: IConfirmResetForm
                ) => submitHandler(values)}
            >
                {({ errors, touched }) => (
                    <Form className="flex flex-col">
                        <label htmlFor="password" className="font-semibold mt-2">Password</label>
                        <Field name="password" placeholder="Type password..." type="password" className="p-1 w-[300px]" />
                        {errors.password && touched.password ? (
                            <div className="text-xs">*{errors.password}</div>
                        ) : null}

                        <label htmlFor="confirmPassword" className="font-semibold mt-2">Confirm Password</label>
                        <Field name="confirmPassword" placeholder="Repeat password..." type="password" className="p-1 w-[300px]" />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div className="text-xs">*{errors.confirmPassword}</div>
                        ) : null}

                        <SubmitBtn content="RESET" isLoading={loading} />
                    </Form>
                )}
            </Formik>
            
            {responseErrors.length > 0 && 
                <div className="flex flex-col mt-2">
                    {responseErrors}
                </div>
            }
        </section>
    )
}