import React from 'react'
import { Container } from 'react-bootstrap'
import {FaWindows, FaLinux} from 'react-icons/fa'
import {SiMacos} from 'react-icons/si'
import {AiFillAndroid} from 'react-icons/ai'
import { useTranslation } from 'react-i18next';

const Platforms = () => {

    const { t } = useTranslation();

    return <Container>
            <br/>
            <h1>
                <span className='key'>{t('Supported')}</span> {t('Platforms')}
            </h1>
            <ul className='platforms'>
                <li>
                    <FaWindows size={50}/>
                </li>
                <li>
                    <FaLinux size={50}/>
                </li>
                <li>
                    <SiMacos size={50}/>
                </li>
                <li>
                    <AiFillAndroid size={50}/>
                </li>
            </ul> 
            <p className='platforms'>
                {t('Platforms-description')}
            </p>
        </Container>
}

export default Platforms