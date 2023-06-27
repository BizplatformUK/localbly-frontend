import { Autocomplete } from '@mantine/core';
import { useContext, useState } from 'react';
import { productsContext } from '../../Context/Productcontext';
import { Input, Skeleton } from '@mantine/core';
export default function SelectSubCategory({formik}){
    const [isOpen, setIsOpen] = useState(false)
    const {productState, subcategories, getSubcategories} = useContext(productsContext)
    async function handleChange(){
        //productState.setLoading(true)
        setIsOpen(!isOpen)
        await getSubcategories()
    }
    const handleSelectOption = (option) => {
        productState.setSelectedSubCat(option);
        formik.setFieldValue("subId", option.id);
        setIsOpen(false);
    };
    return(
        <>
        <div className="select-box">
            <Input.Wrapper withAsterisk label="Select Product Sub-Category" sx={{marginTop: '1rem'}}>
                <Input size="md" disabled={productState.selectedCat ? false : true} value={productState.selectedSubCat.name || ''}   onClick={handleChange} />
            </Input.Wrapper>
            {isOpen && <div className='options-container'>
                <Input type="text" placeholder='search subcategories'  sx={{margin:'0.4rem'}} />
                <ul>
                    {productState.loading ? 
                    <div>
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                    </div> : subcategories?.map((option) => (
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