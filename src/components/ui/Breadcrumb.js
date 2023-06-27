import Link from "next/link";
import { getData } from "../../utils/utilFunctions";
import { useEffect, useState } from "react";
import { Breadcrumbs, Title, Text, NavLink } from "@mantine/core";
import { useRouter } from "next/router";
export default function PageBreadcrumbs(){
    const router = useRouter()
    const { pathname } = router;
    const pathSegments = pathname.split('/');
    const desiredWord = pathSegments[pathSegments.length - 1];
    return(
        <>
            <div className="top=section">
                <Breadcrumbs separator="→" mt="xs" pt="md">
                    <Link href="/dashboard" >Home</Link>
                    <Text fz="sm">{desiredWord}</Text>
                </Breadcrumbs>
                <Title order={2} size="h5" tt="uppercase" color="blue" pt="md">{desiredWord}</Title>
            </div>
        </>
    );
}