import { Title, Text, Button } from "@mantine/core"
import Link from "next/link"
import Image from "next/image"
export default function AccessDenied(){
    return(
        <>
            <div className="access-denied">
                <Image src="/icons/access.png" width={150} height={150} alt="Access denied" />
                <Title order={4} color="red">Access Denied</Title>
                <Text fz="md">You do not have authorization to access this page</Text>
                <Link href="/" className="home-btn">Home</Link>
            </div>
        </>
    )
}