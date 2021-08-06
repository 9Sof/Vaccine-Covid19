import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Confirmation from "./pages/Confirmation";
import Admin from "./pages/Admin";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/register" component={Register} />
        <Route path="/:id" component={Confirmation} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default App;
