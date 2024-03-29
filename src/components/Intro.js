import React from 'react'

function Intro(props) {
    return (
        <div className='intro'>
            <h1 className='intro--title'>Quizzical</h1>
            <p className='intro--about'>
                <em>"Everyone loves sport. And everyone loves a quiz."</em>
            </p>
            <button className='intro--start' onClick={props.onclick}>Start quizz</button>
        </div>
    )
}
export default Intro;