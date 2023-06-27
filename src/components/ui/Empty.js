import { Text } from "@mantine/core"
import Image from "next/image"
export default function Empty({text}){
    return(
        <>
           <div className="empty">
                <div className="image"><Image src="/icons/Empty.svg" width={150} height={150} alt="No data to show" /></div>
                <Text fz="md" ta="center">Looks like you dont have any {text} uploaded Click the button below to upload your first {text}</Text>
           </div>
        </>
    )
}