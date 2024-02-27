import { useQuiz } from "../context/QuizContext";

function FinishScreen() {

    const { points, maxPoints, highestScore, dispatch, user } = useQuiz();

    const percent = (points / maxPoints) * 100;

    let emoji;
    if (percent === 100) emoji = '🥇';
    if (percent >= 80 && percent < 100) emoji = '🎉';
    if (percent >= 50 && percent < 80) emoji = '🙂';
    if (percent > 0 && percent < 50) emoji = '🤔';
    if (percent === 0) emoji = '🤦‍♂️';

    return (
        <>
            <p className="result">
                {(user.name === "Jon Snow" && points === 0) ? "You know nothing Jon Snow." : (
                    <>
                        <span>{emoji}</span> You scored <strong>{points}</strong> out of {maxPoints} ({Math.ceil(percent)}%).

                    </>)
                }
            </p>
            <p className="highscore">({user.name}'s Highscore: {highestScore} points)</p>
            <button onClick={() => dispatch({ type: 'retake' })} className="btn btn-ui" style={{ margin: '10px' }}>Retake Quiz</button>
            <button onClick={() => dispatch({ type: 'restart' })} className="btn btn-ui" style={{ margin: '10px' }}>Restart Quiz</button>
        </>
    )
}

export default FinishScreen
