import { FC, useEffect } from 'react';
import { useContext } from "react";
import { getInfo } from '../../utils/api';
import { CompanyInfoContext } from '../../store/companyContext';
import Layout from '../../components/layout/layout';
import styles from './mainPage.module.css';
import DOMPurify from 'dompurify';

type RawHTMLProps = {
    dirtyHTML: string
}

const MainPage = () => {
    const { companyInfo, setInfo } = useContext(CompanyInfoContext);

    useEffect(() => {
        getInfo()
        .then(res => setInfo(res.data.info))
        
    },[])

    const RawHTML: FC<RawHTMLProps> = ({dirtyHTML}) => {
        const cleanHTML = DOMPurify.sanitize(dirtyHTML);
        return <p className={styles.title} dangerouslySetInnerHTML={{__html: cleanHTML}} />;
    }

    return (
        <Layout>
            <RawHTML dirtyHTML={companyInfo}/>
        </Layout>
    )
}

export default MainPage;