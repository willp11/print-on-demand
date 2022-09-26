import * as Yup from 'yup';
import {Formik, Form, Field, ErrorMessage} from 'formik';

export default function SignUpForm() {

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });
    
    return (
        <>
        </>
    )
}