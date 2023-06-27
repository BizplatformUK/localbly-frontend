import { Skeleton } from "@mantine/core"
import styles from '../../styles/Skeleton.module.css'
export default function PageSkeleton(){
    return(
        <>
            <main className={styles.dashboard}>
                <div className={styles.leftSide}>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <section className={styles.mainContent}>

                </section>
                <div className={styles.rightSide}>
                    <div className={styles.user}>
                        <Skeleton height={50} circle mb="xl" />
                        <Skeleton height={8} mt={6} width="50%" radius="xl" />
                    </div>
                </div>
            </main>
        </>
    )
}