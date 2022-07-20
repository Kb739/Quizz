import React from 'react'
import Mcq from './Mcq'
import { nanoid } from 'nanoid'
function Questions() {

    const [data, setData] = React.useState([])
    React.useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple').
            then((response) => response.json()).
            then(result => setData(() => {
                const arr = result.results;
                return arr.map(obj => ({ info: { ...obj, selected_answer: "" }, id: nanoid() }))
            }))
    }, [])

    function updateSelection(answer, id) {
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

    const questions = data.map(qns => {
        return (
            <div key={qns.id}>
                <Mcq {...qns.info} onSelect={(answer) => updateSelection(answer, qns.id)} />
                <div className='line'></div>
            </div>
        )

    })

    return (
        <div className='quiz'>
            {questions}
        </div>
    )
}
export default Questions;