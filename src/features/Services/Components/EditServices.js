import SelectImage from "../../../components/form/selectImage"
import { useFormik } from "formik"
import { useState, useContext } from "react"
import Notiflix from "notiflix"
import { Button, Input, Loader, Textarea } from '@mantine/core';
import { ServicesContext } from "../Contexts/ServicesContext"
import { sendImageData, sendFormData } from "../../../utils/utilFunctions"
export default function EditService({id, name, price, description, picture, handleClose}){
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const {updateService} = useContext(ServicesContext)
    const formik = useFormik({
        initialValues: {
            name,
            price,
            description
        },
        onSubmit: handleSend
    })

    async function handleSend(values){
        setLoading(true)
        const imageUrl = file ? await sendImageData('services', file) : null;
        const params = {serviceId:id, name:values.name, price:values.price, description:values.description, image:imageUrl || picture,}
        const cat = await sendFormData(params, 'api/post/edit-service', 'POST');
        if(cat.code == 0){
            updateService(cat.response);
            handleClose()
            Notiflix.Notify.success(`${cat.message}`, {position: 'center-top'});
        }
    }
    return(
        <>
            <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <img src={imageUrl ? imageUrl : picture} alt="Selected file" className="selected-image" />
                <label>Service Picture</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Picture" />
                <Input.Wrapper label="Service Name">
                    <Input name="name" size="md" id="service" placeholder="Service Name" value={formik.values.name} {...formik.getFieldProps('name')}/>
                </Input.Wrapper>
                <Input.Wrapper label="Service Price">
                    <Input size="md" type="number" value={formik.values.price} {...formik.getFieldProps('price')}/>
                </Input.Wrapper>
                <div className='form-group'>
                    <Textarea placeholder="About service" label="About service" autosize minRows={2} withAsterisk  {...formik.getFieldProps('description')}>{formik.values.description}</Textarea>
                </div>
                <Button type="submit" fullWidth size="md" leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Upload' }</Button>
            </form>
        </>
    )
}