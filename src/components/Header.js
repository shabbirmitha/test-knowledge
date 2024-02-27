import { useQuiz } from "../context/QuizContext";


function Header() {

  const { user, dispatch } = useQuiz();

  return (
    <header className='app-header'>
      <img src='logo.png' alt='React logo' />
      <h1>Test Knowledge</h1>
      {user &&
        <button className="logout" onClick={() => dispatch({ type: "logout" })}>
          Log Out
        </button>}
    </header>
  );
}

export default Header;
