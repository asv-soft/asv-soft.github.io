import React from 'react'
import { Button, Container } from 'react-bootstrap'
import {FaTelegram} from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import { sendMetric } from './SendMetric';

const Contacts = () => {
    const { t } = useTranslation();

    return <Container>
            <br/>
            <h1>
                <span className='key'>{t('Contact')} </span>{t('Us')}
            </h1>
            <p className='contact-platforms'>
                {t('Contact-join-us')}
            </p>
            <ul className='contact-platforms'>
                <li>
                    <Button href='https://t.me/asvdrones' onClick={() => {sendMetric('click', 'ClickOnTelegramChannel');}}>
                        <div className='contact-inline-content'>
                            <div className='contact-platforms'>
                                {t('Contact-telegram')}
                            </div>
                            <FaTelegram size={50}/>
                        </div>
                    </Button>
                </li>
            </ul>
            <p className='contact-platforms'>
                {t('Contact-mail')}<span className='key'>me@asv.me</span>.
            </p>
        </Container>
}
export default Contacts