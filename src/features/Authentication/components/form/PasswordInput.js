import { useDisclosure, useDidUpdate, useDebouncedState  } from '@mantine/hooks';
import { PasswordInput, Stack, Button, Text, Loader, Title } from '@mantine/core';
import { useState } from 'react';

export default function InputPassword({formik}){
    const [visible, { toggle }] = useDisclosure(false);
    const [password, setPassword] = useDebouncedState('', 200);
    const [confirmPass, setConfirmPass] = useDebouncedState('', 200);
    const [match, setMatch] = useState(true)

    useDidUpdate(()=> {
        setMatch(confirmPass === password)
        if(match){
            formik.setFieldValue('password', password)
        }
    }, [confirmPass])
    return (
        <>
            <Stack maw={380} mx="auto">
                    <PasswordInput
                        label="Password"
                        defaultValue={password}
                        visible={visible}
                        size="md"
                        onVisibilityChange={toggle}
                        onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                    <PasswordInput
                        label="Confirm password"
                        defaultValue={confirmPass}
                        visible={visible}
                        size="md"
                        onVisibilityChange={toggle}
                        error = {!match && 'Passwords do not match'}
                        onChange={(event) => setConfirmPass(event.currentTarget.value)}
                      
                    />
            </Stack>
        </>
    )
}