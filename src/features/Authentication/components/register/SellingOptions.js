import { useState, useEffect } from "react";
import styles from '../../assets/styles/Auth.module.css'
import { Checkbox, Card } from "@mantine/core";
import { useShallowEffect } from '@mantine/hooks';
const options = [
  {value: 'Physical store'},
  {value: 'Whatsapp'},
  {value: 'Facebook'}, 
  {value: 'Instagram'}
]

const SellingOptions = ({formik}) => {
  const [value, setValue] = useState([]);

  useShallowEffect(()=>{
    formik.setFieldValue("socials", value);
  },[value])
  return(
    <>
      <div className={styles.formGroup}>
      <div className={styles.inputTitle}>
          <h3>Where Do You Sell</h3>
          <p>Which avenues do you use to sell your products/services: You can choose multiple avenues</p>
      </div>
        {
          options.map((option, i)=> 
               <Checkbox.Group value={value} onChange={setValue} key={i}>
                  <label>
                    <Card withBorder radius="md" color="cyan" sx={{marginTop: '0.6rem'}} shadow={value.includes(option.value) ? 'lg' : ''}>
                      <Checkbox value={option.value} checked={value.includes(option.value)} label={option.value} />
                    </Card>
                  </label>
              </Checkbox.Group>
          )
        }
      </div>
      
    </>
  );
}

export default SellingOptions;

