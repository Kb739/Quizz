import React from 'react'
import Mcq from './Mcq'
import { nanoid } from 'nanoid'
function Questions() {

    const [data, setData] = React.useState([])
    const [quizEnd, setQuizEnd] = React.useState(false)
    const [quizRestart, setQuizRestart] = React.useState(false)

    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple').
            then((response) => response.json()).
            then(result => setData(() => {
                const arr = result.results;
                return arr.map(obj => ({ info: { ...obj, selected_answer: "" }, id: nanoid() }))
            }))
    }, [quizRestart])

    function updateSelection(answer, id) {
        if (!quizEnd) {
            setData((prevData) => prevData.map(qns => (qns.id === id ?
                {
                    ...qns,
                    info:
                    {
                        ...qns.info,
                        selected_answer: answer
                    }
                } : qns)
            ))
        }

    }

    const questions = data.map(qns => {
        return (
            <div key={qns.id}>
                <Mcq {...qns.info} onSelect={(answer) => updateSelection(answer, qns.id)} />
                <div className='line'></div>
            </div>
        )
    })

    function verify() {
        setQuizEnd(true)
        setData(prevData => prevData.map(qns => ({
            ...qns,
            info:
            {
                ...qns.info,
                reveal_answer: true
            }
        })))
    }
    function calculateScore() {
        const totalScore = data.reduce((score, qns) => {
            return qns.info.selected_answer === qns.info.correct_answer ? score + 1 : score
        }, 0)
        console.log(totalScore)
        return `${totalScore}/${data.length}`
    }

    function restartQuiz() {
        setQuizRestart(prev => !prev)
        setQuizEnd(false)
    }

    function hasAqcuiredData() {
        return data.length > 0;
    }

    return (
        <>
            {hasAqcuiredData() ?
                <div className='quiz'>
                    {questions}
                    <footer>
                        {
                            !quizEnd ? <button className='check' onClick={verify}>Check answers</button>
                                : <>
                                    <p>You scored {calculateScore()} correct answers</p>
                                    <button className='check' onClick={restartQuiz}>Play again</button>
                                </>
                        }
                    </footer>

                </div> : ''}
        </>

    )
}
export default Questions;