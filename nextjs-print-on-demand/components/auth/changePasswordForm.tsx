import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import SubmitBtn from '../ui/submitBtn';
import CancelBtn from "../ui/cancelBtn";
import { useState, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import {handleDjangoErrors} from '../../utils/errors';
import { useUser } from '../../hooks/useUser';

interface IChangePassForm {
    password: string,
    confirmPassword: string
}

interface IChangePassProps {
    goBack: () => void
}

export default function ChangePasswordForm({goBack}: IChangePassProps) {

    const { token } = useUser();

    const ConfirmResetSchema = Yup.object().shape({
        password: Yup.string().min(8, 'Password must be at least 8 characters.').required("Required"),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string[] | never>([]);

    const submitHandler = async (values: IChangePassForm) => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        }
        const url = `http://localhost:8000/auth/password/change/`;
        const data = {
            new_password1: values.password,
            new_password2: values.confirmPassword
        }
        setLoading(true);
        try {
            const res = await axios.post(url, data, {headers: headers});
            console.log(res);
        } catch(e: any) {
            if (e?.response?.data) {
                setError(handleDjangoErrors(e));
            }
            console.log(e);
        } finally {
            setLoading(false);
            goBack();
        }
    }

    const responseErrors = error.map(err=>{
        return <div className="text-xs">{err}</div>
    });

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={ConfirmResetSchema}
                onSubmit={(
                    values: IChangePassForm
                ) => submitHandler(values)}
            >
                {({ errors, touched }) => (
                    <Form className="flex flex-col">
                        <label htmlFor="password" className="text-sm text-gray-500 font-semibold">Password</label>
                        <Field name="password" placeholder="Type password..." type="password" className="p-1 border border-gray-300 w-[190px]" />
                        {errors.password && touched.password ? (
                            <div className="text-xs">*{errors.password}</div>
                        ) : null}

                        <label htmlFor="confirmPassword" className="text-sm text-gray-500 font-semibold">Confirm Password</label>
                        <Field name="confirmPassword" placeholder="Repeat password..." type="password" className="p-1 border border-gray-300 w-[190px]" />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div className="text-xs">*{errors.confirmPassword}</div>
                        ) : null}
                        <div onClick={goBack}>
                            <CancelBtn content="CANCEL" style={{width: "190px", marginTop: "0.5rem"}} />
                        </div>
                        <SubmitBtn content="SUBMIT" isLoading={loading} style={{width: "190px", marginTop: "0.25rem"}} />
                    </Form>
                )}
            </Formik>
            
            {responseErrors.length > 0 && 
                <div className="flex flex-col mt-2">
                    {responseErrors}
                </div>
            }
        </div>
    )
}