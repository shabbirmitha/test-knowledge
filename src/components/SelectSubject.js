import { useEffect, useState } from "react"
import { useQuiz } from "../context/QuizContext";

function SelectSubject() {

    const [engineering, setEngineering] = useState("ComputerEngineering")
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const { totalQuestions, getData, dispatch } = useQuiz();


    const engs = ["ComputerEngineering", "MechanicalEngineering",
        "AerospaceEngineering",
        "BiomedicalEngineering",
        "MarineEngineering",
        "AgriculturalEngineering",
        "NuclearEngineering",
        "ElectronicEngineering",
        "PetroleumEngineering",
        "ArchitecturalEngineering"]


    useEffect(() => {
        getData(engineering);
    }, [engineering, getData])

    useEffect(() => {
        const subs = totalQuestions.map(item => item.subject)
        const subsarr = new Set(subs)
        setSubjects([...subsarr])
    }, [totalQuestions])

    function handleChange(e) {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedSubjects([...selectedSubjects, value]);
        } else {
            setSelectedSubjects(selectedSubjects.filter((item) => item !== value));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (selectedSubjects.length <= 0) return;
        const questionsToAsk = totalQuestions.filter(item => selectedSubjects.includes(item.subject))
        dispatch({ type: "loadQuestions", payload: questionsToAsk })
        dispatch({ type: "start" })
    }



    return (
        <div>
            <h3 className="customHeadings">Select Engineering</h3>

            <select value={engineering} onChange={(e) => setEngineering(e.target.value)} className="engineeringSubject">
                {engs.map(item => <option
                    key={item}
                    value={item}
                >{item}</option>)}
            </select>

            {
                subjects.length > 0 &&
                <form onSubmit={handleSubmit} className="subjectOptions">
                    <h3 className="customHeadings">Select Subjects</h3>
                    <div>
                        {subjects.map(item => <div key={item} >
                            <input value={item} onChange={handleChange} type="checkbox" />
                            <h5>{item}</h5>
                        </div>
                        )}
                    </div>
                    <button type="submit" className="btn">Start</button>
                </form>
            }
        </div>
    )
}


export default SelectSubject
