import { Button, Input, Loader } from "@mantine/core"
import { useRef } from "react"
import { useState } from "react"
import Notiflix from "notiflix"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"

export default function ChangePassword(){
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const handleReset = async()=> {
        setLoading(true)
        const email = emailRef.current.value;
        const params = {email}
        const response = await fetch('api/auth/reset-password', {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(params)
        })
        if(response.status === 200){
            setLoading(false)
            router.push('/confirm')
        }
    }
    return(
        <>
           <div className="change-password">
                <div className="password-title">
                    <h3>Reset Password</h3>
                    <p>Click on the button below to reset your password</p>
                </div>
                <Input.Wrapper withAsterisk label="enter your email address">
                    <Input size="md" placeholder="email address" ref={emailRef}/>
                </Input.Wrapper>
                <Button type="button" disabled={loading} color="blue" mt="md" size="md" onClick={handleReset}>
                    {loading ? <span>Loading <Loader variant="dots" /></span> : "Reset Password"}
                </Button>
           </div>
        </>
    )
}