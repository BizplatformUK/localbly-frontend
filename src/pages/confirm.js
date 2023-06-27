import { Notification } from "@mantine/core"
export default function Confirm(){
    return(
        <>
        <Notification icon={<i class="ri-check-double-line"></i>} color="teal" title="Password Reset Request">
           We have sent you an email with further instructions on changing your password
        </Notification>
        </>
    )
}