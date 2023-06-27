import {useContext } from "react";
import { MarketingContext } from "../contexts/MarketingContext";
import Empty from "../../../components/ui/Empty";
import Offer from "./Offer";
import Skeleton from "../../../components/Loaders/Skeleton";
import CreateOffer from "./CreateOffer";
import { Pagination, Menu, Table, Box, LoadingOverlay, TextInput, Button } from "@mantine/core";
import AddNew from "../../../components/Reusable/AddNew";
export default function OfferList(){
   const {offers, opened, setOpened, totalPages, editLoading, setEditLoading, count, filter, handleItemClick, loading, handlers, value, setValue} = useContext(MarketingContext)
   const isPresent = totalPages > 1;
   console.log(offers)
    return(
        <>
        <div className="sorting-top">
            <TextInput icon={<i className="ri-search-line"></i>} size="md" placeholder="Search Categories" defaultValue={value} onChange={(event) => setValue(event.currentTarget.value)} maw={340}/>
            <Menu opened={opened} onChange={setOpened} width={150} sx={{marginBlock: '0.7rem'}}>
                <Menu.Target><Button leftIcon={<i className="ri-equalizer-line"></i>} size="md" variant="light" color="blue">Filter By</Button></Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>All</Menu.Item>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>Featured</Menu.Item>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>Expired</Menu.Item>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>COUPON</Menu.Item>
                    <Menu.Item onClick={(event) => handleItemClick(event.currentTarget.textContent)}>OFFER</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </div>
        {offers?.length === 0 ? 
        <div className="zero"><Empty text="Offers or Coupons" /><AddNew text="Offers/Coupons"><CreateOffer /></AddNew></div>:
            <Box maw="100%">
                 <LoadingOverlay visible={editLoading} overlayBlur={2} />
                {loading ? <Skeleton /> :
                    <Table>
                        <thead>
                            <tr>
                                <th>Offers/Coupons</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers?.map(offer=>{
                                return(<tr key={offer?.id}><Offer {...offer} /></tr>)
                            })}
                        </tbody>
                    </Table> 
                }
            </Box>
        }
        {isPresent && <Pagination total={totalPages} onNextPage={handlers.increment} value={count} onChange={(value)=>handlers.set(value)}  onPreviousPage={handlers.decrement}/>}
        </>
    );
}