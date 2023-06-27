import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import styles from '../../assets/styles/Auth.module.css'
import { Button, Input } from '@mantine/core';
import { getData } from '../../../../utils/utilFunctions';
import Skeleton from '../../../../components/Loaders/Skeleton';
import { useToggle } from '@mantine/hooks';
export default function Dropdown({formik,  selectedOption, setSelectedOption}){
    const [types, setTypes] = useState()
    const [loading, setLoading] = useState(true)
    const [value, toggle] = useToggle([false, true]);

    const getTypes = async()=>{
        const types = await getData('api/get/get-types');
        if(types){
            setTypes(types.items)
            setLoading(false)
        }
    }

    useEffect(()=> {
        getTypes()
    }, [])
    const handleSelectOption = (option) => {
        setSelectedOption(option);
        formik.setFieldValue("type", option.id);
        setIsOpen(false);
    };
    return (
       <>
        <div className="select-box">
            <Input.Wrapper label="Shop Category">
                <Input size="lg" value ={selectedOption || 'select type'} leftIcon={value ? <i class="ri-arrow-up-s-line"></i>  : <i class="ri-arrow-down-s-line"></i> }  onClick={toggle} />
            </Input.Wrapper>
            {value && <div className={`options-container ${value ? 'open' : ''}`}>
                {loading ? <Skeleton /> : <ul>
                    {types?.map((option) => (
                        <li key={option.id} onClick={() => handleSelectOption(option)}>
                        {option.name}
                        </li>
                    ))}
                </ul>}
            </div>}
        </div>
       </>
      );
}
