import { useEffect, useState } from "react"
import { useFormik } from "formik";
import styles from '../../assets/Profile.module.css'
import Notiflix from "notiflix";
import { Button, Card, Input, Divider, Loader, Title } from "@mantine/core";
import { sendFormData } from "../../../../utils/utilFunctions";
export default function MyProfile(){
   const [loading, setLoading] = useState(false)
   const [user, setUser] = useState();

   const formik = useFormik({
        initialValues: {
            name:'',
            email:'',
            number:'',
        },
        onSubmit: handleSend
    })

    useEffect(()=> {
        async function getUser(){
           const response = await fetch ('api/get/get-user');
           const data = await response.json()
           setUser(data);
           formik.setValues({
            name: data?.name || '',
            email: data?.email || '',
            number: data?.number || '',
          });
        }
        getUser()
    },[])
   
    async function handleSend(values){
        setLoading(true)
        const params = {name:values.name,  number:values.number, email:values.email}
        const data = await sendFormData(params, 'api/post/update-user', 'POST');
        if(data.code === 3){
            setLoading(false);
            Notiflix.Notify.failure(`${data.error}`, {position: 'center-top'});
            return;
        }
        setLoading(false);
        formik.values.name = data.result.name;
        formik.values.number = data.result.number;
        formik.values.email = data.result.email;
        Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
    }
    return(
        <>
       {<form  onSubmit={formik.handleSubmit} className="update-profile">
            <Card shadow="sm" padding="md">
                <Title order={6}>Update Your Profile</Title>
                <Divider my="sm" />
                <div className={styles.formFlex}>
                    <Input.Wrapper label="Name">
                        <Input id="name" size="md" value={formik.values.name}  name="name" {...formik.getFieldProps('name')}  />
                    </Input.Wrapper>
                    <Input.Wrapper label="Phone Number">
                        <Input size="md" value={formik.values.number} name="number" id="number" type="text" {...formik.getFieldProps('number')} />
                    </Input.Wrapper>
                </div>
                <Input.Wrapper label="Email Address">
                    <Input size="md" value={formik.values.email} type="text" name="email" id="email" {...formik.getFieldProps('email')} />
                </Input.Wrapper>
                <Divider my="sm" />
                <Button type="submit" size="md" disabled={loading ? true : false}>{loading ? <span>Loading<Loader variant="dots" /></span> : 'Save Changes'}</Button>
            </Card>
    </form>}
        </>
    )
}