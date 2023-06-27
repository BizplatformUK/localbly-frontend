import { useState, useContext, useEffect} from 'react';
import SelectImage from '../../../components/form/selectImage';
import { useFormik } from 'formik';
import { Button, Input, Loader} from '@mantine/core';
import RadioButton from '../../../components/form/RadioButton';
import Notiflix from 'notiflix';
import Image from 'next/image';
import { CollectionContext } from '../Contexts/CollectionContext';
import { sendFormData, sendImageData, } from '../../../utils/utilFunctions';
export default function CreateCollection(){
   const [checked, setChecked] = useState(false)
   const [file, setFile] = useState(null);
   const [imageUrl, setImageUrl] = useState(null);
   const [loading, setLoading] = useState(false)
   const {addToCollection} = useContext(CollectionContext)
   const formik = useFormik({
        initialValues:{
            name: "",
            featured: false
        },
        onSubmit: handleSend
   })

   

    async function handleSend(values, {resetForm}) {
       setLoading(true)
        const imageUrl = await sendImageData('collections', file)
        const params = {name:values.name, image:imageUrl, featured:checked}
        const data = await sendFormData(params, 'api/post/add-collection', 'POST')
        if(data.code == 3){
            setLoading(false)
            Notiflix.Notify.failure(`${data.error}`, {position: 'center-top'});
        }
        if(data.code == 0){
            setLoading(false)
            Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
            addToCollection(data.response)
            setFile(null);
            setImageUrl(null)
            setChecked(false)
            resetForm()
        }
    }
    return(
        <>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className='create-category'>
            {imageUrl && <div className='edit-image'><Image src={imageUrl} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="Creat collection" fill /></div>}
                
                <label>Collection Picture</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Picture" />
                <div className='form-group'>
                    <label htmlFor="category">Name of Collection</label>
                    <Input id="category" size="md" placeholder='Collection name'  name="name" value={formik.values.name} {...formik.getFieldProps('name')} />
                </div>
                 <RadioButton setChecked={setChecked} checked={checked} text="Collection" />
                 <Button type="submit" fullWidth size="md" leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Upload' }</Button>
            </form>
        </>
    );
}