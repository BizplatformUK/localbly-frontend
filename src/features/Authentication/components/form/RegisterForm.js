import { useFormik } from 'formik';
import {validation} from "../../assets/Validation/validation";
import Notiflix from 'notiflix';
import { useRouter } from 'next/router';
import { useState } from "react";
import { useDisclosure } from '@mantine/hooks';
import { Button, Loader, Input, Alert  } from '@mantine/core';
import styles from '../../assets/styles/Auth.module.css';
import InputPassword from './PasswordInput';

export default function Register(){
    const router = useRouter();
    const [visible, { toggle }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)
    const hasQueryParam = router.query && router.query.paramName !== undefined
    const [error, setError] = useState()
    const formik = useFormik({
        initialValues:{
            username:"",
            email: "",
            number: "",
            password:""
        },
        validate:validation,
        onSubmit
    })
    
    async function onSubmit(values){
        try{
        setLoading(true)
        const role = hasQueryParam ? 'admin' : 'super-admin';
        const data = {name:values.username, email:values.email, number:values.number, password:values.password, role}
        const response = await fetch('/api/auth/register', {
            method:'POST',
            headers:{'Content-Type':'Application/json'},
            body:JSON.stringify(data)
        })
        const user = await response.json()
        if(user.code == 3){
            setLoading(false)
            setError(user.error)
        }
        if(user.code == 0){
            router.push('/login')
        }
        console.log(values)
            
        }catch(error){
            console.log(error.message)
        }
    }
    return(
        <>
            
            <form onSubmit={formik.handleSubmit} className={styles.registerForm}>
                <Input.Wrapper label="Full Name" sx={{marginBottom: '0.4rem'}}>
                    <Input size="md" name="username" id="username" {...formik.getFieldProps('username')}/>
                </Input.Wrapper>
                <Input.Wrapper label="Email Address" sx={{marginBottom: '0.4rem'}}>
                    <Input size="md" name="email" type="email" id="email" {...formik.getFieldProps('email')}/>
                    {formik.errors.email && formik.touched.email ?  <Alert color="red">{formik.errors.email}</Alert>: <></>}
                </Input.Wrapper>
                <Input.Wrapper label="Phone Number" sx={{marginBottom: '0.4rem'}}>
                    <Input size="md" name="number" type="text" id="number" {...formik.getFieldProps('number')} />
                </Input.Wrapper>
                <InputPassword formik={formik} />
                <Button type="submit" fullWidth size="lg" sx={{marginTop:'0.6rem'}} disabled={loading ? true : false}>{loading ? <span>Logging in <Loader size="lg" variant="dots" /></span> : 'Create Account' }</Button>
            </form>
        </>
    );
}