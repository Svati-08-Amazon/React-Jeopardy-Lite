import React, { Component } from "react";
//import our service
import JeopardyService from "../../jeopardyService";
class Jeopardy extends Component {
  //set our initial state and set up our service as this.client on this component
  constructor(props) {
    super(props);
    this.client = new JeopardyService();
    this.state = {
      data: {},
      score: 0,
      formData: {
        answer: "",
      },
    };
  }
  //get a new random question from the API and add it to the data object in state
  getNewQuestion() {
    return this.client.getQuestion().then((result) => {
      this.setState({
        data: result.data[0],
      });
    });
  }

  handelChange = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("handleSubmit");
    if (this.state.formData.answer === this.state.data.answer) {
      console.log("match");
      this.setState((state, props) => ({
        score: state.score + state.data.value,
        formData: {
          answer: "",
        },
      }));
    } else {
      console.log("noMatch");
      this.setState((state, props) => ({
        score: state.score - state.data.value,
        formData: {
          answer: "",
        },
      }));
    }
  };
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }
  //display the results on the screen
  render() {
    console.log(this.state.data);
    if (!this.state.data.id) {
      return (
        <div>
          <p>Loading </p>
        </div>
      );
    }
    return (
      <div>
        <label>Question:</label>
        <br />
        <div>{this.state.data.question}</div>

        <div>
          <label>Category:</label>
          <p>{this.state.data.category.title}</p>
        </div>

        <div>
          <label>Value:</label>
          <p>{this.state.data.value}</p>
        </div>

        <div>
          <label>Score:</label>
          <p>{this.state.score}</p>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="answer">Answer</label>
            <input
              type="text"
              name="answer"
              value={this.state.formData.answer}
              onChange={this.handelChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
export default Jeopardy;
