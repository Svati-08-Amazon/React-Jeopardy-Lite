import { Route, Switch } from "react-router-dom";
import "./App.css";
import Welcome from "./Component/welcome/Welcome";
import Clock from "./Component/clock/Clock";
import Contact from "./Component/contact/Contact";
import Jeopardy from "./Component/jeopardy/Jeopardy";
import Navigation from "./Component/navigation/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <Welcome {...props} name="Svati" />}
        />
        <Route path="/clock" component={Clock} />
        <Route path="/contact" component={Contact} />
        <Route path="/welcome/:name" component={Welcome} />
        <Route path="/jeopardy" component={Jeopardy} />
        <Route>
          <div>404 Page</div>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
