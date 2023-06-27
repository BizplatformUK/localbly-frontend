
import { Radio, Flex, Text, Title, Card } from '@mantine/core';
export default function RadioButton({checked, setChecked, text}){
    const handleChange = (e) => {
        console.log(checked)
    };

    const onChange = (e)=> {
        if(e.target.checked){
            //formik.setFieldValue('featured', !checked)
            setChecked(!checked)
        }
    }
    console.log(checked)
    return (
        <div className='featured-item'>
                <label className={checked ? 'active' : ''}>
                        <Radio checked={checked} onClick={onChange} onChange={handleChange} />
                        <div>
                            <Title order={6} color={checked ? 'blue': 'dark'}>Featured {text}</Title>
                            <Text fz="sm" color={checked ? 'blue': 'dark'}>Mark this {text} as featured on your websites homepage</Text>
                        </div>
                </label>
        </div>
                
      
    );
  }

