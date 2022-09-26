import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import SubmitBtn from '../ui/submitBtn';

interface ISignUpForm {
    email: string,
    password: string,
    confirmPassword: string 
}

export default function SignUpForm() {

    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters.').required("Required"),
        confirmPassword: Yup.string().required("Required").oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });

    const submitHandler = (values: ISignUpForm) => {
        console.log(values);
    }

    return (
        <section className="w-full max-w-[500px] p-4 mx-auto my-4 bg-gray-100 rounded shadow-md flex flex-col justify-start items-center">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">Sign Up</h1>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    confirmPassword: ''
                }}
                validationSchema={LoginSchema}
                onSubmit={(
                    values: ISignUpForm
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

                        <label htmlFor="confirmPassword" className="font-semibold mt-2">Confirm Password</label>
                        <Field name="confirmPassword" placeholder="Repeat password..." type="password" className="p-1 w-[300px]" />
                        {errors.confirmPassword && touched.confirmPassword ? (
                            <div className="text-xs">*{errors.confirmPassword}</div>
                        ) : null}

                        <SubmitBtn content="SIGN UP" />
                    </Form>
                )}
            </Formik>
        </section>
    )
}