
import CreateCollection from './CreateCollection'
import MediumModal from "../../../components/Reusable/Modal";
import { Card, Title, Text, Avatar } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { CollectionProvider } from "../Contexts/CollectionContext";
export default function CollectionsCard(){
    const [opened, { open, close }] = useDisclosure(false);

    return(
        <CollectionProvider>
            <Card padding="lg" withBorder radius="md"  onClick={open} sx={{backgroundColor: '#e8f2fe'}} className="card">
                <Avatar color="cyan" radius="xl"><i className="ri-add-line"></i></Avatar>
                <Title order={4} sx={{paddingTop: '1rem'}}>Add New</Title>
                <Text fz="sm" color="dark">Collection</Text>
           </Card>
           <MediumModal opened={opened} close={close} text='Add New Category'>
                <CreateCollection/>
            </MediumModal>
        </CollectionProvider>
    );
}