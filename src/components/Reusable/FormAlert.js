import { useState, useEffect } from "react"
import { Notification } from "@mantine/core";
export default function FormAlert({title, message}){
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
    return(
      <>
         {show && (
            <Notification icon={<i class="ri-check-double-line"></i>} title={title} color="cyan">
              {message}
            </Notification>
          )}
      </>
     

    )
}