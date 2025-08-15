import { Route, Switch } from "wouter"
import { Navbar } from "./components/navbar"
import Home from "./pages/home"
import PlanetList from "./pages/planet-List"
import PlanetDetail from "./pages/planet-detail"

function App() {

  const planetas = [
    { id: 1, planeta: "Mercurio" },
    { id: 2, planeta: "Venus" },
    { id: 3, planeta: "Tierra" },
    { id: 4, planeta: "Marte" },
    { id: 5, planeta: "Jupiter" },
    { id: 6, planeta: "Saturno" },
    { id: 7, planeta: "Urano" },
    { id: 8, planeta: "Neptuno" }
  ]



  return (
    <>
      <Navbar />

      <Switch>
        {/* renderizar un componente simple */}
        <Route path="/" component={Home} />

        {/* renderizar un componente al que se le pasan props */}
        <Route path="/planets">
          <PlanetList planetas={planetas} />
        </Route>

        <Route path="/planeta/:id">
          <PlanetDetail planetas={planetas} />
        </Route>

      </Switch>
    </>
  )
}

export default App
