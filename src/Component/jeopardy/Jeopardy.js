import React, { Component } from "react";
//import our service
import JeopardyService from "../../jeopardyService";
import JeopardyDisplay from "../../pages/jeopardy/JeopardyDisplay";

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

  handleChange = (event) => {
    const formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;

    this.setState({ formData });
  };

  handleSubmit = (event) => {
    let score = this.state.score;
    event.preventDefault();
    console.log("handleSubmit");
    if (
      this.state.formData.answer.toLowerCase() ===
      this.state.data.answer.toLowerCase()
    ) {
      // console.log("match");
      this.setState((state, props) => ({
        // score: state.score + state.data.value,
        formData: {
          answer: "",
        },
      }));
      // } else {
      // console.log("noMatch");
      this.setState((state, props) => ({
        // score: state.score - state.data.value,
        formData: {
          answer: "",
        },
      }));
      // }
      score += this.state.data.value;
    } else {
      score -= this.state.data.value;
    }
    this.setState({ score, answer: "" });

    this.getNewQuestion();
  };
  //when the component mounts, get a the first question
  componentDidMount() {
    this.getNewQuestion();
  }
  //display the results on the screen
  render() {
    console.log(this.state.data);
    // let category = this.state.data.category && this.state.category;
    if (!this.state.data.id) {
      return (
        <div>
          <p>Loading </p>
        </div>
      );
    }
    return (
      <div>
        <JeopardyDisplay
          question={this.state.data.question}
          category={this.state.data.category.title}
          value={this.state.data.value}
          score={this.state.score}
          answer={this.state.formData.answer}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
export default Jeopardy;
