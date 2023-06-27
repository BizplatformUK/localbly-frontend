import { useState, useContext, useEffect } from "react";
import { useToggle, useCounter  } from '@mantine/hooks';
import { Button, Input, LoadingOverlay, TextInput } from "@mantine/core";
import { useFetchCollection } from "../../Hooks/useFetchCollection";
import { GlobalContext } from "../../context/globalContext";
import Skeleton from "../Loaders/Skeleton";
import { useDebouncedState } from '@mantine/hooks';

export default function SubcategoryDropdown({formik, collection}){
    const [count, handlers] = useCounter(1, { min: 1, max: 10 });
    const [value, toggle] = useToggle([false, true]);
    const [term, setTerm] = useDebouncedState('', 200);
    const [collectionName, setCollectionName] = useState(collection === null ? 'Select Collection': collection);
    const {collections, loading} = useFetchCollection(count, term);
    const handleSelect = (option)=> {
        setCollectionName(option.name)
        formik.setFieldValue('collection', option.id);
        toggle()
    }

    return(
        <>
            <div className="select-box">
                <Input.Wrapper label="Select Collection" description="Add this product to a collection">
                    <Input size="md" onClick={()=>toggle()} value={collectionName} readOnly/>
                </Input.Wrapper>
                {value && <div className='options-container'>
                    <TextInput defaultValue={term} onChange={(event)=>setTerm(event.currentTarget.value)} placeholder="Search collections" sx={{margin:'0.4rem'}} />
                        {loading ? <Skeleton /> : 
                            <ul>
                                {collections?.map((option) => (
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