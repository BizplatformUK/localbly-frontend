import {Checkbox, Title, Text } from "@mantine/core"
import styles from '../../../../styles/Products.module.css'
export default function Featured({formik, category}){
    return(
        <>
              <div className={styles.formFlex}>
                <div className={styles.formCheck}>
                    <label className={formik.values.fhome ? styles.featured : styles.normal}>
                        <Checkbox size="lg" checked={formik.values.fhome} onChange={(event) => formik.setFieldValue('fhome',event.currentTarget.checked)} />
                        <div>
                            <Title order={6}>Featured Home</Title>
                            <p>Mark this product to be featured on your websites homepage</p>
                        </div>
                    </label>
                </div>
                <div className={styles.formCheck}>
                    <label className={formik.values.fcat ?  styles.featured : styles.normal}>
                        <Checkbox size="lg" checked={formik.values.fcat} onChange={(event) => formik.setFieldValue('fcat', event.currentTarget.checked)} />
                        <div>
                            <Title order={6}>Featured Category Page</Title>
                            <p>Mark this product to be featured on the {category} category page</p>
                        </div>
                    </label>
                </div>
            </div>
        </>
    )
}