import { useState, useContext, useEffect } from "react";
import { useToggle, useCounter  } from '@mantine/hooks';
import { Button, Input, LoadingOverlay, TextInput } from "@mantine/core";
import { useFetchOffers } from "../../Hooks/useFetchOffers";
import { GlobalContext } from "../../context/globalContext";
import Skeleton from "../Loaders/Skeleton";
import { useDebouncedState } from '@mantine/hooks';
export default function OffersDropdown({formik, offer}){
    const [count, handlers] = useCounter(1, { min: 1, max: 10 });
    const [value, toggle] = useToggle([false, true]);
    const [term, setTerm] = useDebouncedState('', 200);
    const [offerName, setOffer] = useState(offer === null ? 'Select Offer': offer);
    const {offers, loading} = useFetchOffers(count);
    const handleSelect = (option)=> {
        setOffer(option.name)
        formik.setFieldValue('offer', option.id);
        toggle()
    }
    return(
        <>
            <div className="select-box">
                <Input.Wrapper label="Select Offer" description="Add this product to an offer">
                    <Input size="md" onClick={()=>toggle()} value={offerName} readOnly />
                </Input.Wrapper>
                {value && <div className='options-container'>
                    <TextInput defaultValue={term} onChange={(event)=>setTerm(event.currentTarget.value)} placeholder="Search collections" sx={{margin:'0.4rem'}} />
                        {loading ? <Skeleton /> : 
                            <ul>
                                {offers?.map((option) => (
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