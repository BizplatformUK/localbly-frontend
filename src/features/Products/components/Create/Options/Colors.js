import { Input, Button} from '@mantine/core';
import { useValidatedState, useToggle, useDidUpdate } from '@mantine/hooks';
import { useState } from 'react';

export default function ColorsOption({setColorsArr,colorsArr }){
    const [show, toggle] = useToggle([false,true]);
    /*const [{ value, lastValidValue, valid }, setString] = useValidatedState(state.colors, (val) => /^(\w+(,\w+)+)$/.test(val), true);
    
    const [colors, setColors] = useState()
    useDidUpdate(() => {
        if(state.colors === null){
            setString('');
        }
    },[state.colors]);*/
    const handleSelect = (event)=> {
        const col = event.currentTarget.value;
        setColorsArr(col);
        //const colorsArr = lastValidValue?.split(","); 
    }

    return(
        <>
            <Button size="sm" leftIcon={<i className="ri-add-line"></i>} variant="light" color="blue" onClick={toggle}>Colors</Button>
            {show && <div>
                <Input.Wrapper label="Color options" description="Enter colors serparated by commas e.g red, green, black" sx={{marginTop: '0.6rem', marginBottom:'0.4rem'}} >
                    <Input type="text" maw={360} defaultValue={colorsArr} onChange={(event)=>handleSelect(event)}  />
                </Input.Wrapper>
            </div>}
        </>
    )
}