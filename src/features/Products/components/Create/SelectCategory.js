import { useContext, useState } from 'react';
import { productsContext } from '../../Context/Productcontext';
import { Input, Skeleton } from '@mantine/core';
export default function SelectCategory({formik}){
    const [isOpen, setIsOpen] = useState(false);
    const {productState, fetchCategories, categories} = useContext(productsContext)

    async function handleChange(e){
        //productState.setLoading(true)
        setIsOpen(!isOpen)
        await fetchCategories()
    }
    const handleSearch = async(e)=>{
        productState.setLoading(true)
        productState.setSearchTerm(e.target.value)
    }
    const handleSelectOption = (option) => {
        //setSelected(option.name);
        productState.setSelectedCat(option);
        formik.setFieldValue("catId", option.id);
        setIsOpen(false);
    };

    return(
        <>
        <div className="select-box">
            <Input.Wrapper withAsterisk label="Select Product Category" sx={{marginTop: '1rem'}}>
                <Input size="md" rightIcon={isOpen ? <i class="ri-arrow-up-s-line"></i> : <i class="ri-arrow-down-s-line"></i> } value={productState.selectedCat.name || ''}  onClick={handleChange} />
            </Input.Wrapper>
            {isOpen && <div className='options-container'>
                <Input type="search categories" fullWidth icon={<i class="ri-search-line"></i>} placeholder="Search" sx={{margin: '0.4rem'}} value={productState.searchTerm} onChange={handleSearch}/>
                <ul>
                    {productState.loading ? 
                    <div>
                        <Skeleton height={8} radius="xl" />
                        <Skeleton height={8} mt={6} radius="xl" />
                    </div> : categories?.map((option) => (
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