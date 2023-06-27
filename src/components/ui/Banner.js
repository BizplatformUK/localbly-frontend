import Empty from "./Empty";
import { Title, Text, Card, Table } from "@mantine/core";
import Skeleton from "../Loaders/Skeleton";
import { useContext, useEffect, useState } from "react";
import RemoveMultiple from "../form/RemoveMultiple";
import BannerItem from "./BannerItem";
import { BannerContext } from "../../context/BannerContext";

export default function BannerList(){
    const {fetchItems, items, loading} = useContext(BannerContext)
    const [ids, setIds] = useState([])

    useEffect(()=> {
        fetchItems()
    },[])
    return(
        <>
        <Card withBorder radius="md" sx={{marginTop: '1rem'}}>
            <Title order={5}>Website Banner</Title>
            <Text fz="sm">These are the items appearing on your websites banner section</Text>
            <RemoveMultiple ids={ids} url='/api/delete/remove-multiple-items' />
             {items?.length === 0 ?  
                <div className="zero"><Empty text="Banner items" /></div> :
                    <>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            {loading ? <Skeleton /> :
                                <tbody>
                                    {items?.map(item=>{ 
                                        return(<tr key={item.id}><BannerItem {...item} value={ids} setValue={setIds} /></tr>)
                                    })}
                                </tbody> 
                            }
                        </Table>
                    </>
            }
        </Card>
            
        </>
    );
}