import { Route, Switch } from "wouter"
import { Navbar } from "./components/navbar"
import Home from "./pages/home"
import PlanetList from "./pages/planet-List"
import PlanetDetail from "./pages/planet-detail"
import NotFound from "./pages/not-found"

function App() {

  return (
    <>
      <Navbar />

      <Switch>

        <Route path="/" component={Home} />
        <Route path="/planets" component={PlanetList} />
        <Route path="/planeta/:id" component={PlanetDetail} />
        <Route component={NotFound} />

      </Switch>
    </>
  )
}

export default App
