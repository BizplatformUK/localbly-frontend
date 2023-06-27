import { useState, useEffect } from "react";
import { Input, Text, Title } from "@mantine/core";
import styles from '../../assets/styles/Auth.module.css'
export default function Bizdetails({formik}){
    return(
        <>
         <div className={styles.formGroup}>
            <div>
                <Title order={3}>Name of Shop</Title>
                <Text fz="md">Give your shop a name</Text>
            </div>
            <Input type="text" size="lg" placeholder="Shop Name" value={formik.values.shopname} {...formik.getFieldProps('shopname')} sx={{marginTop: '1rem'}}/>
         </div>
        </>
    );
}