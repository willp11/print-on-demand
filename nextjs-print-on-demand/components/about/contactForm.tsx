import { Formik, Field, Form } from "formik";
import * as Yup from 'yup';
import SubmitBtn from '../ui/submitBtn';
import { useState } from "react";

interface IContactForm {
    name: string,
    email: string,
    message: string,
}

export default function ContactForm() {

    const [loading, setLoading] = useState(false);

    const ContactSchema = Yup.object().shape({
        name: Yup.string().required('Required'),
        email: Yup.string().email('Invalid email').required('Required'),
        message: Yup.string().required('Required')
    });

    const submitHandler = (values: IContactForm) => {
        console.log('submit');
    }

    return (
        <div className="w-full max-w-[600px] mx-auto rounded border border-gray-300 p-2 mt-4">
            <h2 className="text-2xl font-bold mb-1">Contact Form</h2>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    message: ''
                }}
                validationSchema={ContactSchema}
                onSubmit={(
                    values: IContactForm
                ) => submitHandler(values)}
            >
                {({ errors, touched }) => (
                    <Form className="flex flex-col">
                        <div className="mb-1 flex flex-col">
                            <label htmlFor="name" className="font-semibold">Name</label>
                            <Field name="name" placeholder="Type name..."  className="p-1 w-full max-w-[400px] border border-gray-300" />
                            {errors.name && touched.name ? (
                                <div className="text-xs">*{errors.name}</div>
                            ) : null}
                        </div>
                        
                        <div className="mb-1 flex flex-col">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <Field name="email" type="email" placeholder="Type email..."  className="p-1 w-full max-w-[400px] border border-gray-300" />
                            {errors.email && touched.email ? (
                                <div className="text-xs">*{errors.email}</div>
                            ) : null}
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="message" className="font-semibold">Message</label>
                            <Field component="textarea" rows="8" name="message" placeholder="Type message..."  className="p-1 w-full max-w-[600px] border border-gray-300" />
                            {errors.message && touched.message ? (
                                <div className="text-xs">*{errors.message}</div>
                            ) : null}
                        </div>

                        <SubmitBtn content="SUBMIT" isLoading={loading}/>
                    </Form>
                )}
            </Formik>
        </div>
    )
}