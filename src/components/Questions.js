import userEvent from '@testing-library/user-event';
import React, { useEffect } from 'react'

function Questions() {

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        console.log('calleffect')
        fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple').
            then((response) => response.json()).
            then(result => setData(result.results))
    }, [])

    return (
        <h1>
            Questions
        </h1>
    )
}
export default Questions;