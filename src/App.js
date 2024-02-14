import React from 'react'
import NavigationBar from './components/Navigation'
import Introduction from './components/Introduction';
import Platforms from './components/Platforms';
import Features from './components/Features';
import Footer from './components/Footer';
import Contacts from './components/Contacts';

const App = () => {
    return <main>
        <NavigationBar/>
        <Introduction/>
        <Platforms/>
        <Features/>
        <Contacts/>
        <Footer/>
    </main>
}

export default App