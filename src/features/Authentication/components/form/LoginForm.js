import { signIn} from 'next-auth/react';
import { useRouter } from "next/router";
import { useState} from "react"
import { useFormik } from 'formik';
import { Alert, Button, PasswordInput, Input, Loader } from '@mantine/core';
import { validation } from "../../assets/Validation/validation";

export default function LoginForm(){
    const router = useRouter();
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errors, setErrorMsg] = useState({error:''});

    const formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validate:validation,
        onSubmit
    })
    async function onSubmit(values){
        setLoading(true)
        const res = await signIn('credentials', {
            redirect:false,
            email:values.email,
            password:values.password,
            callbackUrl: '/dashboard'
        })
        
        if(res.error !== null){
            setError(res.error);
            setLoading(false);
        } else{
            router.push('/dashboard')
        }
        
    }
  
    return(
        <>
            {error && 
               <Alert icon={<i className="ri-error-warning-line"></i>} title="Error!" color="red" variant="filled">
                 {error}
               </Alert>
            }
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="login">Email Address</label>
                    <Input placeholder="Your email" size="md" {...formik.getFieldProps('email')} />
                    {formik.errors.email && formik.touched.email ? <Alert color="red">{formik.errors.email}</Alert> : <></> }
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <PasswordInput placeholder='password' size="md" withAsterisk {...formik.getFieldProps('password')} />
                </div>
                <Button type="submit" fullWidth size="lg" disabled={loading ? true : false}>{loading ? <span>Logging in <Loader size="lg" variant="dots" /></span> : 'Login' }</Button>
            </form>
        </>
    );
}