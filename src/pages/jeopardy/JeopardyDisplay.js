function JeopardyDisplay(props) {
  console.log(props);
  return (
    <div>
      <div>
        <b>Question:</b>
        <span>{props.question}</span>
      </div>
      <div>
        <b>Category:</b>
        <span>{props.category}</span>
      </div>
      <div>
        <b>Value:</b>
        <span>{props.value}</span>
      </div>
      <div>
        <b>Score:</b>
        <span>{props.score}</span>{" "}
      </div>
      <div>
        <b>Answer:</b>
        <span>{props.answer}</span>
      </div>
      <div>
        <input
          type="text"
          name="answer"
          value={props.answer}
          onChange={props.handleChange}
        />

        <button onClick={props.handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default JeopardyDisplay;
