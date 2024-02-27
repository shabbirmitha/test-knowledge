import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import SelectSubject from './SelectSubject'
import QuizScreen from './QuizScreen'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import SelectUser from './SelectUser'
import { useQuiz } from '../context/QuizContext'


export default function App() {

    const { status } = useQuiz();



    return <div className='app'>
        <Header />
        <Main>
            {status === 'ready' && <SelectUser />}
            {status === 'loggedIn' && <StartScreen />}
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'selection' && <SelectSubject />}
            {status === 'active' && <>

                <Progress />
                <QuizScreen />
                <Footer />
            </>
            }
            {status === 'finished' && <FinishScreen />}
        </Main>


    </div>
}
