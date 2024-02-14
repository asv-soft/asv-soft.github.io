import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap'
import Flights from '../img/screenshot-flights.bmp'
import Connections from '../img/screenshot-connections.bmp'
import Params from '../img/screenshot-parameters-editor.bmp'
import Settings from '../img/screenshot-settings-extended.bmp'
import { useTranslation } from 'react-i18next';

const Features = () => {
    const { t } = useTranslation();

    return <Container>
            <br/>
            <h1>
                <span className='key'>{t('Key')}</span> {t('Features')}
            </h1>
            <br/>
            <Row xs={1} md={2} className="g-4">
                <Col key={0}>
                    <Card bg='dark' border="dark" text='light'>
                        <Card.Body>
                        <Card.Title><h3><span className='key'>{t('Autonomous')}</span> {t('Flights')}</h3></Card.Title>
                        <Card.Img variant="top" src={Flights}/>
                        <Card.Text>
                        <br/>
                            {t('Autonomous-flights')}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col key={1}>
                    <Card bg='dark' border="dark" text='light'>
                        <Card.Body>
                        <Card.Title><h3><span className='key'>{t('Safety')}</span> {t('And')} <span className='key'>{t('Reliability')}</span></h3></Card.Title>
                        <Card.Img variant="top" src={Connections}/>
                        <Card.Text>
                        <br/>
                            {t('Safety-and-reliability')}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col key={2}>
                    <Card bg='dark' border="dark" text='light'>
                        <Card.Body>
                        <Card.Title><h3><span className='key'>{t('Intuitive')}</span> {t('Interface')}</h3></Card.Title>
                        <Card.Img variant="top" src={Settings}/>
                        <Card.Text>
                        <br/>
                            {t('Intuitive-interface')}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col key={3}>
                    <Card bg='dark' border="dark" text='light'>
                        <Card.Body>
                        <Card.Title><h3><span className='key'>{t('Advanced')}</span> {t('Control')}</h3></Card.Title>
                        <Card.Img variant="top" src={Params}/>
                        <Card.Text>
                        <br/>
                            {t('Advanced-control')}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col key={4}>
                    <Card bg='dark' border="dark" text='light'>
                        <Card.Body>
                        <Card.Title><h3> <span className='key'>{t('High-quality')}</span> {t('Video-and-photography')}</h3></Card.Title>
                        <Card.Text>
                        <br/>
                            {t('High-quality-video-and-photography')}
                        </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
}

export default Features