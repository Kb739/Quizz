import React from 'react'
import './style.css'
import Intro from './components/Intro'
import Questions from './components/Questions'

function App() {
    const [start, setStart] = React.useState(false)

    function startQuiz() {
        setStart(true)
    }

    return (
        <main>
            <img className='blob-2' src={require('./images/blob 5.png')} alt='blob' />
            <img className='blob-1' src={require('./images/blob 1.png')} alt='blob' />
            {start ? <Questions /> : <Intro />}
        </main>
    )
}
export default App;