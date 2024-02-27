import { useQuiz } from "../context/QuizContext"

function StartScreen() {

    const { dispatch, user } = useQuiz();

    return (
        <div className="start">
            <h2>Welcome {user.name}</h2>
            <h3>questions to test your mastery</h3>
            <button onClick={() => dispatch({ type: 'getStart' })} className="btn btn-ui">Let's start!</button>
        </div>
    )
}

export default StartScreen
