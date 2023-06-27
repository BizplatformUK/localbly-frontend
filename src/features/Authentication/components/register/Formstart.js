import { useState } from "react";
import { Button } from "@mantine/core";
export default function Formstart({nextStep, formik, styles}){
    const [checked, setChecked] = useState()

    if(checked){
        formik.values.haveWebsite = checked;
    }
    return(
        <>
            <h2>start</h2>
            <Button size="md" onClick={()=>nextStep()}>Continue</Button>
        </>
    );
}