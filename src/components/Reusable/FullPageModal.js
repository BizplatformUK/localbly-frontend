import styles from '../../styles/Modal.module.css'
export default function FullPageModal({open, children, onClose, text}){
    if(!open){return <></>}
    return(
        <>
            <div initial={{scale:0}} animate={{scale:1, transition:{duration:0.6} }} className={styles.FullmodalWrapper}>
                <div className={styles.closeModal}><button type="button" onClick={onClose} className={styles.backBtn}><i class="ri-arrow-left-circle-fill"></i><h6>Back</h6></button></div>
                <div className={styles.fullmodalHeader}>
                   <h3>{text}</h3>
               </div>
                <div className={styles.modalContent}>
                    {children}
                </div>
            </div>
        </>
    )
}