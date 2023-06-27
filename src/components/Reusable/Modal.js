import { Modal, ScrollArea } from '@mantine/core';
export default function MediumModal({children, opened, close, text}){
    return(
        <>
            <Modal opened={opened} onClose={close} size="md" title={text} scrollAreaComponent={ScrollArea.Autosize} >
                {children}
            </Modal>
        </>
    );
}