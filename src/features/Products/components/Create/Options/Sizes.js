
import { Input, Button} from '@mantine/core';
import { useValidatedState, useToggle, useDidUpdate } from '@mantine/hooks';

export default function SizeOption({setSizesArr,sizesArr}){
    const [show, toggle] = useToggle([false,true]);
    const handleSelect = (event)=> {
        setSizesArr(event.currentTarget.value)
    }

    return(
        <>
            <Button size="sm" leftIcon={<i class="ri-add-line"></i>} variant="light" color="blue" onClick={toggle} sx={{marginTop: '0.6rem', display: 'block'}}>Size</Button>
            {show && <div>
                <Input.Wrapper label="Size options" description="Enter sizes serparated by commas e.g 44,46, etc" sx={{marginTop: '0.6rem', marginBottom:'0.4rem'}} >
                    <Input type="text" maw={360} defaultValue={sizesArr} onChange={(event) => handleSelect(event)}/>
                </Input.Wrapper>
            </div>}
        </>
    )
}