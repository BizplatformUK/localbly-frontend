import styles from '../features/Authentication/assets/styles/Auth.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Title, Text } from '@mantine/core';
import Register from '../features/Authentication/components/form/RegisterForm';
export default function RegisterPage(){
    
    return(
        <>
            <div className={styles.registerPage}>
                <div className={styles.leftside}>
                <div className='site-logo'><Image src="/logo.png" priority="true"  fill alt="localbly logo"/></div>
                    <div className={styles.leftSidecontent}>
                        <img src="/icons/shop.svg" />
                        <div className={styles.content}>
                            <Title order={2}>Sign up</Title>
                            <Text fz="md">Sign up and start creating your online store for free</Text>
                        </div>
                    </div>
                </div>
                 <div className={styles.rightSide}>
                    <div className={styles.signupform}>
                        <div className={styles.loginFormTitle}>
                            <h3>Create Account</h3>
                            <p>It only takes a few minutes</p>
                        </div>
                        <Register styles={styles}/>
                        <div className="or">
                            <span className="divider"></span>
                            <div className="or-content"><h3>OR</h3></div>
                            <span className="divider"></span>
                        </div>
                        <Link href="/login" className="alt-btn">Login</Link>
                    </div>
                 </div>           
            </div>
        </>
    );
}