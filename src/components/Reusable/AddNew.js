import MediumModal from "./Modal"
import { useDisclosure } from '@mantine/hooks';
import { Button} from "@mantine/core";
export default function AddNew({text, children}){
    const [opened, { open, close }] = useDisclosure(false);
    return(
        <>
        <Button leftIcon={<i className="ri-add-line"></i>} size="lg" onClick={open}>Add New</Button>
        <MediumModal opened={opened} close={close} text={`Add New ${text}`}>
            {children}
        </MediumModal>
        </>
    )
}