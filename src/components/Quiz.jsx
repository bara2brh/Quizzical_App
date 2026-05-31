export default function Quiz() {
    return <div className="quiz-container">
        <div className="question">
            <h2>How would one say goodbye in Spanish?</h2>
            <div className="answers-container">
                <input type="radio" name="answer" id="first"/>
                <label htmlFor="first">first</label>
                <input type="radio" name="answer" id="second"/>
                <label htmlFor="second">second</label>
                 <input type="radio" name="answer" id="third"/>
                <label htmlFor="third">third</label>
                  <input type="radio" name="answer" id="forth"/>
                <label htmlFor="forth">forth</label>
            </div>
          <hr />
        </div>

    </div>
}