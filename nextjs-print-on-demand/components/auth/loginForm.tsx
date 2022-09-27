import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import SubmitBtn from '../ui/submitBtn';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {handleDjangoErrors} from '../../utils/errors';
import { useUser } from '../../hooks/useUser';
import { useRouter } from 'next/router';

interface ILoginForm {
    email: string,
    password: string,
}

export default function LoginForm() {

    const router = useRouter();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters.').required('Required')
    });

    const { token, setToken } = useUser();

    useEffect(()=>{
        if (token !== "") router.push('/')
    }, []);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string[] | never>([]);

    const submitHandler = async (values: ILoginForm) => {
        const headers = {
            'Content-Type': 'application/json'
        }
        const url = `http://localhost:8000/auth/login/`;
        const data = {
            email: values.email,
            password: values.password
        }
        setLoading(true);
        try {
            const res = await axios.post(url, data, {headers: headers});
            if (setToken) setToken(res?.data?.key);
        } catch(e: any) {
            if (e?.response?.data) {
                setError(handleDjangoErrors(e));
            }
        } finally {
            setLoading(false);
        }
    }

    const responseErrors = error.map(err=>{
        return <div className="text-xs">{err}</div>
    });

    return (
        <section className="w-full max-w-[500px] p-4 mx-auto my-4 bg-gray-100 rounded shadow-md flex flex-col justify-start items-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Login</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={(
                    values: ILoginForm
                ) => submitHandler(values)}
            >
                {({ errors, touched }) => (
                    <Form className="flex flex-col">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <Field name="email" placeholder="Type email..."  className="p-1 w-[300px]" />
                        {errors.email && touched.email ? (
                            <div className="text-xs">*{errors.email}</div>
                        ) : null}

                        <label htmlFor="password" className="font-semibold mt-2">Password</label>
                        <Field name="password" placeholder="Type password..." type="password" className="p-1 w-[300px]" />
                        {errors.password && touched.password ? (
                            <div className="text-xs">*{errors.password}</div>
                        ) : null}

                        <SubmitBtn content="LOGIN" isLoading={loading}/>
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