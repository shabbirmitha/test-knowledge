import { useQuiz } from "../context/QuizContext";
import Homelander from '../images/homelander.png'
import Tommy from '../images/Tommy.jpg'
import Jon from '../images/Jon.png'
import White from '../images/White.png'

function SelectUser() {

    const { dispatch } = useQuiz();

    function handleSubmit(e) {
        e.preventDefault();
        const user = { name: e.target.alt, image: e.target.src }
        dispatch({ type: "logIn", payload: user })
    }
    return (
        <form>
            <h2>Select a Profile</h2>
            <div className="profiles">
                <Profile name={"Jon Snow"} image={Jon} handleSubmit={handleSubmit} />
                <Profile name={"Homelander"} image={Homelander} handleSubmit={handleSubmit} />
                <Profile name={"Thomas Shelby"} image={Tommy} handleSubmit={handleSubmit} />
                <Profile name={"Whalter White"} image={White} handleSubmit={handleSubmit} />
            </div>
        </form>
    )
}


function Profile({ name, image, handleSubmit }) {
    return <button onClick={handleSubmit}>
        <img src={image} alt={name} />
        <h4>{name}</h4>
    </button>

}

export default SelectUser
