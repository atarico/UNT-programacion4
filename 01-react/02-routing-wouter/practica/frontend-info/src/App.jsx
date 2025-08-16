import { Route } from 'wouter';
import NavBar from './components/navBar';
import Home from './pages/Home';
import Technologies from './pages/technologies';
import Details from './pages/details';

export default function App() {
  return (
    <>
      <h1>Holi</h1>
      <NavBar />

      <Route path="/" component={Home} />
      <Route path="/tecnologias" component={Technologies} />
      <Route path="/details" component={Details} />

    </>
  )
}