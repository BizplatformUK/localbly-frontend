import { Autocomplete } from '@mantine/core';
import { useContext, useState } from 'react';
import { productsContext } from '../../Context/Productcontext';
import { Input, Skeleton } from '@mantine/core';
export default function SelectCollection({formik}){
    const [isOpen, setIsOpen] = useState(false);
    const {productState, collections, getCollections} = useContext(productsContext)

    async function handleChange(){
        //productState.setLoading(true)
        setIsOpen(!isOpen)
        await getCollections()
    }
    const handleSelectOption = (option) => {
        productState.setSelectedCollection(option);
        formik.setFieldValue("collection", option.id);
        setIsOpen(false);
    };
    return(
        <>
        <div className="select-box">
            <Input.Wrapper  label="Select Product Collection(optional)" sx={{marginTop: '1rem'}} description="Add this product to an existing products collection">
                <Input size="md"   onClick={handleChange} />
            </Input.Wrapper>
            {isOpen && <div className='options-container'>
                <ul>
                    {productState.loading ? 
                    <div>
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                    </div> : collections?.map((option) => (
                        <li key={option.id} onClick={() => handleSelectOption(option)}>
                            {option.name}
                        </li>
                    ))}
                </ul>
            </div>}
        </div>
        </>
    );
}