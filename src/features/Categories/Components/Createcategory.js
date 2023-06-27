import { useState, useContext} from 'react';
import SelectImage from '../../../components/form/selectImage';
import { useFormik } from 'formik';
import RadioButton from '../../../components/form/RadioButton';
import { Input, Button, Loader } from '@mantine/core';
import Notiflix from 'notiflix';
import Image from 'next/image';
import { categoryContext } from '../context/categoriesContextApi';
import { sendFormData, sendImageData, } from '../../../utils/utilFunctions';
export default function Createcategory({handleClose}){
    const [checked, setChecked] = useState(false)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const {addCategoryToList} = useContext(categoryContext)
    const formik = useFormik({initialValues:{category:"", featured: false}, onSubmit: handleSend})

    async function handleSend(values) {
        setLoading(true)
        const imageUrl = await sendImageData('categories', file)
        const params = {name:values.category, image:imageUrl, featured:checked}
        const data = await sendFormData(params, 'api/post/add-category', 'POST');

        if(data.code == 3){
            setLoading(false)
        }
        if(data.code == 0){
            setLoading(false)
            addCategoryToList(data.data)
            setFile(null)
            setImageUrl(null);
            Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
            setChecked(false)
            formik.resetForm()
        }
    }
    return(
        <>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data" className='create-category'>
                
            {imageUrl && <div className='edit-image'><Image src={imageUrl} className="edit-image-img" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt="create category" fill /></div>}
                <label>Category Picture</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Picture" />
                <div className='form-group'>
                    <label htmlFor="category">Name of Category</label>
                    <Input placeholder="Name of Category" size="md" value={formik.values.category} {...formik.getFieldProps('category')}/>
                </div>
                <RadioButton setChecked={setChecked} checked={checked}text="Category" />
                <Button type="submit" size="md" leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Upload' }</Button>
            </form>
        </>
    );
}