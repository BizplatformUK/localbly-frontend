import { useEffect, useState } from "react"
import SelectImage from "../../../../components/form/selectImage";
import { Button, Card, Input, Avatar, Flex, Divider, Loader, ColorInput } from "@mantine/core";
import { useFormik } from "formik";
import Notiflix from "notiflix"
import Image from "next/image";
import { sendFormData, sendImageData } from "../../../../utils/utilFunctions";

export default function Profile({shop}){
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const[loading, setLoading] = useState(false);
    const [value, setValue] = useState(shop.brandcolor);
    const formik = useFormik({
        initialValues: {
            name:shop.name,
            location:shop.location,
            town:shop.town,
            numbers:shop.phoneNumbers,
            email:shop.email === 'na' ? '' : shop.email
        },
        onSubmit: handleSend
    })

    async function handleSend(values){
        setLoading(true)
        const imageUrl = file ? await sendImageData('logos', file) : null;
        const params = {name:values.name, town:values.town, logo:imageUrl || shop.logo, location:values.location, phoneNumbers:values.numbers, email:values.email, color:value}
        const res = await sendFormData(params, 'api/post/edit-profile', 'POST');
        if(res.code === 3){
            setLoading(false);
            Notiflix.Notify.failure(`${res.error}`, {position: 'center-top'});
            return;
        }
        setValue(res.result.color)
        setImageUrl(res.result.logo);
        setLoading(false);
        Notiflix.Notify.success(`${res.message}`, {position: 'center-top'});
    }

    return(
        <>
        <form onSubmit={formik.handleSubmit} className="update-profile">
            <Card shadow="sm" padding="md">
                <Flex align="center" gap="sm">
                    <div className='site-logo'><Image src={imageUrl === null ? shop.logo : imageUrl} priority="true"  fill alt={shop?.name}/></div>
                    <SelectImage setFile={setFile} file={file} setImageUrl={setImageUrl} text="Change Logo"/>
                </Flex>
                <Divider my="sm" />
                <Input.Wrapper label="Business Name">
                    <Input id="name" size="md"  name="name" defaultValue={shop?.name}  {...formik.getFieldProps('name')}/>
                </Input.Wrapper>
                <Input.Wrapper label="Shop Location">
                    <Input size="md" type="text" defaultValue={shop?.location} {...formik.getFieldProps('location')} />
                </Input.Wrapper>
                    <Input.Wrapper label="Town">
                        <Input size="md" type="text" defaultValue={shop?.town} {...formik.getFieldProps('town')} />
                    </Input.Wrapper>
                <Input.Wrapper label="Phone Numbers" description="You can enter multiple numbers serparated by commas e.g, 07XXXX, 07XXXX">
                    <Input size="md" type="text" defaultValue={shop?.phoneNumbers} {...formik.getFieldProps('numbers')} />
                </Input.Wrapper>
                <Input.Wrapper label="Email Address" description="You can enter multiple emails serparated by commas e.g, janedoe@gmail.com, johndoe@gmail.com">
                    <Input size="md" type="text" defaultValue={shop?.email} {...formik.getFieldProps('email')} />
                </Input.Wrapper>
                <ColorInput  label="Brand Color"  value={value} onChange={setValue}    description="Choose your shop's brand color" />
                <Divider my="sm" />
                <Button type="submit" size="md" disabled={loading ? true : false}>{loading ? <span>Loading<Loader variant="dots" /></span> : 'Save Changes'}</Button>
            </Card>
    </form>
         


        </>
    )
}