import CreateOffer from './CreateOffer'
import MediumModal from "../../../components/Reusable/Modal";
import { Card, Title, Text, Avatar } from "@mantine/core";
import { useDisclosure } from '@mantine/hooks';
import { MarketingProvider } from '../contexts/MarketingContext';
export default function OfferCard(){
    const [opened, { open, close }] = useDisclosure(false);
    return(
        <MarketingProvider>
            <Card padding="lg" withBorder radius="md"  onClick={open} sx={{backgroundColor: '#fef1f8'}} className="card">
                <Avatar color="cyan" radius="xl"><i className="ri-add-line"></i></Avatar>
                <Title order={4} sx={{paddingTop: '1rem'}}>Add New</Title>
                <Text fz="sm">Offer/Coupon</Text>
           </Card>
           <MediumModal opened={opened} close={close} text='Add New Category'>
                <CreateOffer/>
            </MediumModal>
        </MarketingProvider>
    );
}