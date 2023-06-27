import styles from '../../styles/Spinner.module.css'
export default function PageLoader(){
    return(
        <>
            <div className={styles.loadingOverlay}>
                <div className={styles.innerLoader}><div className={styles.pageLoader} ></div></div>
            </div>
        </>
    );
}