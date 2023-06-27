import { useToggle, useCounter  } from '@mantine/hooks';
import { Input, TextInput } from "@mantine/core";
import { useFetchCategories } from "../../Hooks/useFetchCategories";
import { useDebouncedState } from '@mantine/hooks';
import Skeleton from "../Loaders/Skeleton";
import { useContext, useEffect, useState } from 'react';
import { useShallowEffect } from '@mantine/hooks';
import { GlobalContext } from '../../context/globalContext';
export default function CategoryDropdown({setState, state}){
    const [count, handlers] = useCounter(1, { min: 1, max: 10 });
    const [value, toggle] = useToggle([false, true]);
    const [term, setTerm] = useDebouncedState('', 200);
    const {categories, loading} = useFetchCategories(count, term);
    

    const handleSelect = (option)=> {
        setState({catId:option.id, name:option.name})
        //formik.setFieldValue('catId', option.id);
        toggle()
    }
    
 
    return(
        <>
            <div className="select-box">
               <Input.Wrapper withAsterisk label="Select A Category">
                    <Input size="md" onClick={()=>toggle()} value={state.name === null ? 'Select Category': state.name} placeholder="Category" className="select" readOnly/>
               </Input.Wrapper>
                {value && <div className='options-container'>
                    <TextInput icon={<i class="ri-search-line"></i>} placeholder="Search Categories" defaultValue={term} onChange={(event)=>setTerm(event.currentTarget.value)} sx={{margin:'0.4rem'}} />
                    {loading ? <Skeleton /> : 
                            <ul>
                                {categories?.map((option) => (
                                    <li key={option.id} onClick={()=>handleSelect(option)}>
                                        {option.name}
                                    </li>
                                ))}
                            </ul>
                        }
                </div>}
            </div>
        </>
    )

}