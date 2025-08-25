import { Route, Switch } from "wouter";
import NavBar from "./components/nav-bar";
import Home from "./pages/home";
import Page404 from "./pages/page404";
import SocioDetail from "./pages/socio-detail";
import Socios from "./pages/socios";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/socios" component={Socios} />
        <Route path="/socios/:id" component={SocioDetail} />

        <Route component={Page404} />
      </Switch>
    </>
  );
}

export default App;
