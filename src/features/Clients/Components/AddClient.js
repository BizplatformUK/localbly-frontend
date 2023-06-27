import Image from "next/image";
import SelectImage from "../../../components/form/selectImage";
import { useState, useRef, useContext} from "react";
import { Input, Button, Loader } from "@mantine/core";
import { useFormik } from "formik";
import { sendFormData, sendImageData } from "../../../utils/utilFunctions";

import { ClientsContext } from "../Contexts/ClientsContext";
import Notiflix from "notiflix"
export default function AddClient(){
    const[loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const {addToClients} = useContext(ClientsContext);

    const formik = useFormik({
        initialValues:{
            client: "",
            type: 'Corporate',
        },
        onSubmit: uploadClient
    })
    async function uploadClient(values){
        setLoading(true)
        const imgurl = await sendImageData('clients', file);
        const params = {client:values.client, type:values.type, logo:imgurl}
        const data = await sendFormData(params, 'api/post/add-client', 'POST');
        if(data.code === 3){
            setLoading(false);
            return
        }
        setLoading(false);
        setImageUrl(null)
        setFile(null)
        Notiflix.Notify.success(`${data.message}`, {position: 'center-top'});
        formik.resetForm()
        addToClients(data.response)
    }
    return(
        <>
             <form onSubmit={formik.handleSubmit}  encType="multipart/form-data">
             {imageUrl && <Image src={imageUrl} className="edit-image-img" alt="add client" width={150} height={40} />}
                <label>Client Logo</label>
                <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Client Logo" />
                <Input.Wrapper label="Client Name">
                    <Input type="text" size="sm" value={formik.values.client} {...formik.getFieldProps('client')}/>
                </Input.Wrapper>
                <Button type="submit" fullWidth size="md" sx={{marginTop:'1rem'}} leftIcon={<i class="ri-upload-2-line"></i>} disabled={loading ? true : false}  >{loading ? <span>Uploading<Loader variant="dots" /></span>: 'Upload' }</Button>
             </form>
        </>
    )
}