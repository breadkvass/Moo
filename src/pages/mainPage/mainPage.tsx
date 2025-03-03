import { FC, useEffect } from 'react';
import { useContext } from "react";
import { getInfo } from '../../utils/api';
import { CompanyInfoContext } from '../../utils/companyContext';
import DOMPurify from 'dompurify';
import Layout from '../../components/layout/layout';
import SpinnerIcon from '../../components/spinnerIcon/spinnerIcon';
import styles from './mainPage.module.css';

type RawHTMLProps = {
    dirtyHTML: string
}

const MainPage = () => {
    const [companyInfo, {setInfo, setIsLoading, setIsError}] = useContext(CompanyInfoContext);

    useEffect(() => {
        setIsLoading(true);
        getInfo()
            .then(res => setInfo(res.data.info))
            .catch(() => setIsError(true))
            .finally(() => setIsLoading(false))
    }, [])

    const RawHTML: FC<RawHTMLProps> = ({dirtyHTML}) => {
        const cleanHTML = DOMPurify.sanitize(dirtyHTML);
        return <p className={styles.title} dangerouslySetInnerHTML={{__html: cleanHTML}} />;
    }

    return (
        <Layout>
            {(
                companyInfo.isLoading ?
                    <SpinnerIcon /> : (
                    companyInfo.isError ?
                        <p className={styles.error}>Ошибка загрузки</p> : (
                            companyInfo && <RawHTML dirtyHTML={companyInfo.info}/> 
            )))}
        </Layout>
    )
}

export default MainPage;