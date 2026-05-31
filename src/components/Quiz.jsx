import { encode, decode } from 'html-entities';

export default function Quiz(props) {
    
    let shuffledArray = [...props.incorrect_answers, props.correct_answer]
    shuffledArray = shuffle(shuffledArray)

    function shuffle(array) {
        let currentIndex = array.length;
        while (currentIndex != 0) {

            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
        return array
    }

    return <div className="question">
        <h2>{decode(props.question)}</h2>
        <form>
            <fieldset id={props.id}>
                <div className="answers-container">

                    <input type="radio" name="answer" id={props.id + "first"} />
                    <label htmlFor={props.id + "first"}>{decode(shuffledArray[0])}</label>
                    <input type="radio" name="answer" id={props.id + "second"} />
                    <label htmlFor={props.id + "second"}>{decode(shuffledArray[1])}</label>
                    <input type="radio" name="answer" id={props.id + "third"} />
                    <label htmlFor={props.id + "third"}>{decode(shuffledArray[2])}</label>
                    <input type="radio" name="answer" id={props.id + "forth"} />
                    <label htmlFor={props.id + "forth"}>{decode(shuffledArray[3])}</label>

                </div>
            </fieldset>
        </form>
        <hr />
    </div>


}