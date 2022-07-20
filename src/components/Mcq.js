import React, { useCallback } from 'react'
import { nanoid } from 'nanoid'
import he from 'he'

function Mcq(props) {

    const [buttons, setButtons] = React.useState([])

    React.useEffect(() => {
        setButtons(reorderButtons(props))
    }, [props.question])

    function reorderButtons(props) {
        const arr = [...props.incorrect_answers]
        const randomIndex = Math.floor(Math.random() * arr.length)
        arr.splice(randomIndex, 0, props.correct_answer)
        return arr.map(answer => ({ id: nanoid(), value: answer }))
    }

    function buttonClick(id) {
        const clickedButton = buttons.find(btn => btn.id === id)
        props.onSelect(clickedButton.value)
    }

    const options = buttons.map(btn => {
        const style = { backgroundColor: props.selected_answer === btn.value ? '#D6DBF5' : 'white' }
        return (
            < button style={style}
                key={btn.id} onClick={() => buttonClick(btn.id)}> {he.decode(btn.value)}
            </button >
        )
    })

    return (
        <div>
            <p className='question'>
                {he.decode(props.question)}
            </p>
            <li className='choices'>
                {options}
            </li>

        </div>

    )
}
export default Mcq;