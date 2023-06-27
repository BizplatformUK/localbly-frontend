import styles from '../styles/Marketing.module.css';
import { Radio, Flex } from '@mantine/core';
export default function RadioButtons({value, setValue}){
    return(
        <>
             <Radio.Group
                value={value}
                onChange={setValue}
                name="type"
                label="Coupon or Offer"
                description="Select the option you want to create between coupons and offers"
                withAsterisk
            >
                <Flex direction={{base:'column', sm:"row"}} gap={{base:'sm', sm: 'lg'}} align={{sm:'center'}}>
                    <label className={value === 'OFFER' ? styles.activeRadioLabel : styles.radioLabel}><Radio value="OFFER" label="Offers" /></label>
                    <label className={value === 'COUPON' ? styles.activeRadioLabel : styles.radioLabel}><Radio value="COUPON" label="Coupons" /></label>
                </Flex>
            </Radio.Group>
        </>
    )
}