import { decode } from 'html-entities';
import { useMemo } from 'react';
import clsx from 'clsx';

export default function Quiz(props) {
    const shuffledArray = useMemo(() => {
        return shuffle([
            ...props.incorrect_answers,
            props.correct_answer
        ]);
    }, []);

    function shuffle(array) {
        let currentIndex = array.length;

        while (currentIndex !== 0) {
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex],
                array[currentIndex]
            ];
        }

        return array;
    }

    return (
        <div className="question">
            <h2>{decode(props.question)}</h2>

            <form>
                <fieldset id={props.id}>
                    <div className="answers-container">
                        {shuffledArray.map((answer, index) => {
                            const labelClass = clsx({
                                "correct-answer":
                                    props.isGameOver &&
                                    answer === props.correct_answer,

                                "wrong-answer":
                                    props.isGameOver &&
                                    answer === props.selectedAnswer &&
                                    answer !== props.correct_answer
                            });
                            return <div key={index}>
                                <input
                                    type="radio"
                                    data-question_id={props.id}
                                    name={props.id}
                                    value={decode(answer)}
                                    id={`${props.id}-${index}`}
                                    onChange={(e) =>
                                        props.handleChange(e.target)
                                    }
                                    disabled={props.isGameOver}
                                />

                                <label className={labelClass} htmlFor={`${props.id}-${index}`}>
                                    {decode(answer)}
                                </label>
                            </div>
                        })}
                    </div>
                </fieldset>
            </form>

            <hr />
        </div>
    );
}