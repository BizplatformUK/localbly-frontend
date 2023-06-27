import SelectImage from '../../../components/form/selectImage';
import { useState, useContext } from 'react';
import { ServicesContext } from '../Contexts/ServicesContext';
import { useFormik } from 'formik';
import Image from 'next/image';
import { Button, Input, Loader, Textarea } from '@mantine/core';
import Notiflix from 'notiflix';
import { sendFormData, sendImageData, } from '../../../utils/utilFunctions';
export default function CreateService(){
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const {addToServices} = useContext(ServicesContext)
    const formik = useFormik({
        initialValues:{
            name: "",
            price: "",
            description: ""
        },
        onSubmit: handleSend
   })

   async function handleSend(values, {resetForm}){
    setLoading(true)
     const imageUrl = await sendImageData('services', file)
     const params = {name:values.name, price:values.price, description:values.description, image:imageUrl}
     const data = await sendFormData( params, 'api/post/add-service','POST')
     if(data.code == 3){
         setLoading(false)
         Notiflix.Notify.failure(`${data.error}`, {position: 'center-top'});
     }
     if(data.code == 0){
         setLoading(false)
         Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
         const service = {id:data.response.id, name:data.response.name, picture:data.response.image}
         addToServices(service)
         setFile(null);
         setImageUrl(null)
         resetForm()
     }
   }
  
    return(
        <>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            {imageUrl && <div className='edit-image'><Image src={imageUrl} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="create service" fill /></div>}
                <label>Service Picture</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Image"/>
                <Input.Wrapper withAsterisk label="Service Name">
                    <Input name="name" size="md" id="service" placeholder="Service Name" value={formik.values.name} {...formik.getFieldProps('name')}/>
                </Input.Wrapper>
                <Input.Wrapper withAsterisk label="Service Price">
                    <Input size="md" type="number" value={formik.values.price} {...formik.getFieldProps('price')}/>
                </Input.Wrapper>
                <div className='form-group'>
                    <Textarea placeholder="About service" label="About service" autosize minRows={2} withAsterisk  {...formik.getFieldProps('description')}/>
                </div>
                <Button type="submit" fullWidth size="md" leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Upload' }</Button>
            </form>
        </>
    );
}