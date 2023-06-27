import { Children, useState } from "react";
import { Button, Flex, Loader } from "@mantine/core";
export default function Stepper({ children, activeStep, handleNext, handleBack, loading }){
    const steps = Children.toArray(children)
    const progress = ((activeStep) / steps.length) * 100;

    function getStepClass(index) {
        const stepStatus = index < activeStep ? "completed" : index === activeStep ? "active" : "";
        return `step ${stepStatus}`;
    }

    return(
        <>
            <div className="stepper">
            <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="stepper-buttons">
                {steps[activeStep]}
                <Flex align="center" justify="space-between" sx={{marginTop: '1rem'}}>
                    {activeStep !== 0 && (
                        <Button type="button" size="lg" leftIcon={<i class="ri-arrow-left-circle-line"></i>} onClick={handleBack}>Back</Button>
                    )}
                    {activeStep !== steps.length - 1 && (
                        <Button  type="button" size="lg" rightIcon={<i class="ri-arrow-right-circle-line"></i>} onClick={handleNext}>Next</Button>
                    )}
                    {activeStep === steps.length - 1 && (
                        <Button type="submit" color="green" size="lg" disabled={loading ? true : false}>{loading ? <span>Loading<Loader size="lg" variant="dots" /></span> : 'Create Shop' }</Button>
                    )}
                </Flex>
            </div>
            </div>
        </>
    )
}
