import Link from "next/link"
import { useState, useEffect } from "react"
import { getNextMonthDate, FormatDate } from "../../../../utils/utilFunctions"
import { Card, Input, Divider, Text, Title, Flex} from "@mantine/core";
export default function PlanCard({shop}){

    const currentDate = new Date(shop.createdAt);
    const dateOneMonthFromNow = getNextMonthDate(currentDate);
    const nextDate = FormatDate(dateOneMonthFromNow)
       
   
    return(
        <>
          <Card withBorder radius="md" padding="md">
            <Flex justify="space-between" gap="md" align="center" wrap="wrap">
                <div className="left-side">
                    <div className="version">
                        <Title order={2}>{shop.version}</Title>
                        <Text fz="sm">Kes <span>0.00</span></Text>
                    </div>
                    <div className="upgrade">
                        <Link href="/packages" className="upgrade-btn">Upgrade</Link>
                    </div>
                </div>
                <Divider size="sm" orientation="vertical" />
                <div className="right-side">
                    <ul>
                        <li><span>Next Billing Date:</span><strong>{nextDate}</strong></li>
                        <li><span>Next Billing Price</span><strong>{shop.rating}.00</strong></li>
                    </ul>
                </div>
            </Flex>
          </Card>
        </>
    )
}