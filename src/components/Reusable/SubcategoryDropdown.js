import { useState, useEffect, useContext } from "react";
import { useToggle, useCounter  } from '@mantine/hooks';
import {Input, TextInput } from "@mantine/core";
import { useShallowEffect } from '@mantine/hooks';
import Skeleton from "../Loaders/Skeleton";
import { useDebouncedState } from '@mantine/hooks';

export default function SubcategoryDropdown({formik, state, setState}){
    const [count, handlers] = useCounter(1, { min: 1, max: 10 });
    const [value, toggle] = useToggle([false, true]);
    const [term, setTerm] = useDebouncedState('', 200);
    const [subcats, setSubcats] = useState()
    const [loading, setLoading] = useState(false)
    const isLong = term.length >= 1;
    const url = isLong ? `api/get/search-subcategories?page=${count}&term=${term}` : `api/get/get-cat-subcategories?page=${count}&id=${state.catId}`;

    useShallowEffect(()=>{
       async function getSubcategories(){
            if(state.catId === null){return}
            setLoading(true)
            const response = await fetch(url);
            const data = await response.json()
            setSubcats(data.items);
            setLoading(false);
       }
       getSubcategories()
    }, [count, term, state.catId]);

    const handleSelect = (option)=> {
        setState({subcatId:option.id, subcat:option.name})
        toggle()
    }

    return(
        <>
            <div className="select-box">
                <Input.Wrapper label="Select a sub-category" withAsterisk>
                    <Input size="md" onClick={()=>toggle()} value={state.subcat === null ? 'Select Sub-category': state.subcat} readOnly/>
                </Input.Wrapper>
                {value && <div className='options-container'>
                    <TextInput defaultValue={term} onChange={(event)=>setTerm(event.currentTarget.value)} placeholder="Search Subcategories" sx={{margin:'0.4rem'}} />
                        {loading ? <Skeleton /> : 
                            <ul>
                                {subcats?.map((option) => (
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