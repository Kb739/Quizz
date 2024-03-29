import React from 'react'
import Mcq from './Mcq'
import { nanoid } from 'nanoid'
function Questions() {

    const [loading, setLoading] = React.useState(true)
    const [data, setData] = React.useState([])
    const [showAnswers, setShowAnswers] = React.useState(false)
    const [quizRestart, setQuizRestart] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple').
            then((response) => response.json()).
            then(result => {
                setData(() => {
                    const arr = result.results;
                    return arr.map(obj => ({ info: { ...obj, selected_answer: "" }, id: nanoid() }))
                })
                setLoading(false)
            })
    }, [quizRestart])

    function updateSelection(answer, id) {
        if (!showAnswers) {
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
        setShowAnswers(true)
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
        setShowAnswers(false)

    }

    return (
        <>
            {!loading ?
                <div className='quiz'>
                    {questions}
                    <footer>
                        {
                            !showAnswers ? <button className='check' onClick={verify}>Check answers</button>
                                : <>
                                    <h3 className="score-text">You scored {calculateScore()} correct answers</h3>
                                    <button className='check' onClick={restartQuiz}>Play again</button>
                                </>
                        }
                    </footer>

                </div> : ''}
        </>

    )
}
export default Questions;