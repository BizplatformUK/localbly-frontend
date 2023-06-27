
import styles from '../../assets/styles/Auth.module.css'
import { useState, useContext} from "react";
import { useFormik } from 'formik';
import Bizdetails from "./Bizdetails";
import SellingOptions from "./SellingOptions";
import Dropdown from './Dropdown';
import FinalStep from './Final';
import { useRouter } from 'next/router';
import Stepper from '../../../../components/ui/Stepper';
import { AuthContext } from '../../context/Authcontext';
import { sendFormData, sendImageData } from '../../../../utils/utilFunctions';
import { Title, Text } from '@mantine/core';

export default function GetStarted(){
    const [isOpen, setIsOpen] = useState(true);
    const [selectedOption, setSelectedOption] = useState()
    const {handleBack, handleNext, activeStep} = useContext(AuthContext)
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const formik = useFormik({
        initialValues:{
          shopname:'',
          town:'',
          type:'',
          socials:[],
          location:'',
          phonenumbers:'',
          about: ''
        },
        onSubmit
    })
    const router = useRouter()
    
    async function onSubmit(values){
        setLoading(true)
        const imageUrl = await sendImageData('logos', file)
        const params = {
            name:values.shopname, 
            town:values.town, 
            type:values.type, 
            socials:values.socials, 
            logo:imageUrl, 
            location:values.location, 
            phoneNumbers:values.phonenumbers,
            about:values.about
        }
        const data = await sendFormData(params, '/api/auth/createshop', 'POST');
        if(data.code == 3){
            setLoading(false)
            setErrors(complete.error)
        }
        if(data.code == 0){
            router.push('/dashboard')
        }
    }
  
   
    return (
        <>
            <form onSubmit={formik.handleSubmit} className={styles.createForm}>
                <Stepper activeStep={activeStep} handleNext={handleNext} handleBack={handleBack} loading={loading}>
                    <Bizdetails label="step 1" formik={formik}/>
                    <SellingOptions label="step 2" formik={formik} />
                    <div className='biz-type'>
                        <Title order={3} sx={{marginTop: '1rem'}}>Shop Category</Title>
                        <Text fz="md" sx={{marginBottom: '1rem'}}>Select the category that best describes your shop</Text>
                        <Dropdown  isOpen={isOpen} formik={formik} setIsOpen={setIsOpen} setSelectedOption={setSelectedOption}  selectedOption={selectedOption} />
                    </div>
                    <FinalStep formik={formik} file={file} setFile={setFile} imageUrl={imageUrl} setImageUrl={setImageUrl} />
                </Stepper>
            </form>
        </>
    )
   
}