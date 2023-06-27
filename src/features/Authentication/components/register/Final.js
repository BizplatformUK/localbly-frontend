
import SelectImage from "../../../../components/form/selectImage"
import styles from '../../assets/styles/Auth.module.css'
import { useState, useEffect } from "react";
import { Input, TextInput } from "@mantine/core";
import Image from "next/image";
export default function FinalStep({formik, file, setFile, setImageUrl, imageUrl}){
    return(
        <>
            <div className={styles.finalstep}>
                {imageUrl ? <Image src={imageUrl} alt="shop logo" width={150} height={150} className={styles.logoImg}  /> : <></>}
                <div className={styles.logo}>
                    <label>Shop Logo</label>
                    <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Select Logo" />
                </div>
                 <div className={styles.formGroup}>
                    <label>Town</label>
                    <Input type="text" size="lg"  value={formik.values.town}  {...formik.getFieldProps('town')}/>
                 </div>
                
                <div className={styles.formGroup}>
                    <label>Where is Your shop Located</label>
                    <Input type="text" size="lg" value={formik.values.location} {...formik.getFieldProps('location')}/>
                </div>
            
                <div className={styles.formGroup}>
                    <label>Enter phone numbers serparated by commas, e.g 0709999, 0709xxxxx</label>
                    <Input type="text" size="lg" value={formik.values.phonenumbers} {...formik.getFieldProps('phonenumbers')}/>
                </div>
                <div className={styles.formGroup}>
                    <label>Shop Description</label>
                    <TextInput size="lg" value={formik.values.about} {...formik.getFieldProps('about')} />
                </div>
            </div>
        </>
    );
}