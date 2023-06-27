import { FileButton, Button, Text } from '@mantine/core';
export default function SelectImage({setFile, setImageUrl, text}){
    const handleFileChange = (newFile) => {
        if(!newFile){return}
        setFile(newFile);
        setImageUrl(URL.createObjectURL(newFile));
    }
    return(
        <>
            <div className="select-image">
                <FileButton onChange={handleFileChange} accept="image/png,image/jpeg" >
                    {(props) => <Button leftIcon={<i className="ri-image-line"></i>} size="md" {...props}>{text}</Button>}
                </FileButton>
               
            </div>
        </>
    )
}