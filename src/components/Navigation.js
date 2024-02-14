import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import i18next from 'i18next';
import Nav from 'react-bootstrap/Nav';
import {FaGithub} from 'react-icons/fa'
import {MdLanguage} from 'react-icons/md'
import { useTranslation } from 'react-i18next';
import cookies from 'js-cookie'
import { sendMetric } from './SendMetric';

const NavigationBar = () =>{
    const languages = [
        {
            code: 'en',
            name: 'English'
        },
        {
            code: 'ru',
            name: 'Русский'
        }
    ]
    
    const { t } = useTranslation();
    
    var currentLanguageCode = cookies.get('i18next')

  return (
    <Navbar collapseOnSelect expand='sm' bg="dark" variant="dark">
        <Container>
            <Navbar.Toggle aria-controls='navbarScroll' data-bs-target='#navbarScroll'/>
            <Navbar.Brand href="">      
                <h1 className='gradient-nav-title'>     
                    Asv.Drones
                </h1>   
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Nav.Item >
                        <Nav.Link href="#downloads" onClick={() => {sendMetric('click', 'ClickOnDownloads');}}>{t('Downloads')}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="https://docs.asv.me/" onClick={() => {sendMetric('click', 'ClickOnDocumentation');}}>{t('Documentation')}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="https://github.com/asv-soft" onClick={() => {sendMetric('click', 'ClickOnGitHub');}}><FaGithub/></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <NavDropdown flip='True' menuVariant="dark" title={<MdLanguage/>} id="basic-nav-dropdown">
                        {languages.map(({ code, name }) => (
                            <NavDropdown.Item key={code} onClick={() => {i18next.changeLanguage(code); cookies.set('i18next', code);}}
                                style={{backgroundColor: currentLanguageCode === code ? '#1668ff' : '#35393d',      
                                        border: currentLanguageCode === code ? '1px solid #35399d' : '#35393d'}}>
                                {name}
                            </NavDropdown.Item>
                        ))}
                        </NavDropdown>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}
export default NavigationBar;