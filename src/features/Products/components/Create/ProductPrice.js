import { Input, Switch, Flex, Box} from "@mantine/core"
import styles from '../../../../styles/Products.module.css'
export default function ProductPrice({setChecked, checked, formik}){
    return(
        <>
            <Box>
                <label className={checked ? styles.active : styles.inactive}>Is this product on sale?</label>
                    <Flex align="center" gap="md" sx={{marginTop: '0.6rem'}}>
                        <Switch onLabel="YES" offLabel="NO" size="xl" checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}/>
                    </Flex>
                {checked && <Input.Wrapper label="Product Sale Price" maw={360}>
                    <Input type="number" size="md" value={formik.values.salePrice} {...formik.getFieldProps('salePrice')} />
                </Input.Wrapper>}
            </Box>
            
        </>
    )
}