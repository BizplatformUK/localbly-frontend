import { Textarea, Button, Loader } from "@mantine/core"
import { useState } from "react";
import Notiflix from "notiflix";
export default function ProductDescription({formik, styles}){
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState(false);
    const generate = async()=> {
        if(formik.values.name === ''){
            Notiflix.Notify.failure('Product name cannot be empty', {position: 'center-top'});
            return;
        }
        setLoading(true)
        const response = await fetch(`/api/get/generate?text=${formik.values.name}`,{
            method:'POST',
            headers: {'Content-Type': 'application/json'}
        });
        const desc = await response.json();
        formik.setFieldValue('aidesc', desc.content);
        setDescription(true);
        setLoading(false)
    }

    return(
        <>
        <div className={styles.textarea}>
            <div className={styles.topFormGroup}>
                <label>Product Description</label>
                <Button type="button" onClick={generate} variant="light" leftIcon={<i class="ri-file-text-line"></i>}>Generate AI Text</Button>
            </div>
           {loading && <div><span>Generating Text</span> <Loader variant="dots" /></div>}
            {
                description ? 
                <Textarea placeholder="Give your product a description" disabled={loading} defaultValue={formik.values.aidesc } {...formik.getFieldProps('aidesc')}/> : 
                <Textarea placeholder="Give your product a description" disabled={loading} defaultValue={formik.values.description } {...formik.getFieldProps('description')}/>
            }  
        </div>
          
        </>
    )
}