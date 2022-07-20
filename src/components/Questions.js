import React from 'react'
import Mcq from './Mcq'

function Questions() {

    const [data, setData] = React.useState([])

    React.useEffect(() => {
        console.log('calleffect')
        fetch('https://opentdb.com/api.php?amount=5&category=9&type=multiple').
            then((response) => response.json()).
            then(result => setData(result.results))
    }, [])

    const questions = data.map(info => <Mcq{...info} />)

    return (
        <div>
            {questions}
        </div>
    )
}
export default Questions;