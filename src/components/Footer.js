import React from 'react'
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return <footer className="page-footer font-small blue"> 
            <div className="footer-copyright text-center py-3">
                {t('Rights')}
            </div>
        </footer>
}

export default Footer