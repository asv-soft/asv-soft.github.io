import React from 'react'
import { useTranslation } from 'react-i18next';

const Introduction = () => {
    const { t } = useTranslation();

    return <header>
        <h1 className="header-title">
            {t('Header-title')}
        </h1>
        <div className="overlay">
            <div className="table center">
                <div className="monitor-wrapper center">
                    <div className="monitor center">
                        <p>
                            {t('Header-monitor')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </header>
}

export default Introduction