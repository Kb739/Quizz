import React, { useCallback } from 'react'
import he from 'he'
function Mcq(props) {

    const [choices, setChoices] = React.useState([])

    React.useEffect(() => {
        setChoices(arrangeChoices(props))
    }, [props.question])

    function arrangeChoices(props) {
        const arr = [...props.incorrect_answers]
        const randomIndex = Math.floor(Math.random() * arr.length)
        arr.splice(randomIndex, 0, props.correct_answer)
        return arr;
    }

    const options = choices.map(answer => <button>{he.decode(answer)}</button>)
    return (
        <div>
            <p className='question'>
                {he.decode(props.question)}
            </p>
            <li className='answers'>
                {options}
            </li>

        </div>

    )
}
export default Mcq;