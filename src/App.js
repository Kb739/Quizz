import React from 'react'
import './style.css'
import Home from './components/Home'

function App() {
    return (
        <main>
            <img className='blob-2' src={require('./images/blob 5.png')} alt='blob' />
            <img className='blob-1' src={require('./images/blob 1.png')} alt='blob' />
            <Home />
        </main>
    )
}
export default App;