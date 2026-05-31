export default function Start(props) {
    return <div className="start-container">
        <h1>Quizzical</h1>
        <p>Test your trivia knowledge</p>
        <button className="btn start-btn" onClick={props.handleClick}>Start quiz</button>
    </div>
}