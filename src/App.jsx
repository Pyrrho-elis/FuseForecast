import "./index.css";
import Graph from "./components/Graph";
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Nav />
      <div className="flex-col justify-center align-center mx-auto my-3 gap-4 max-w-[600px] bg-base-200">
        <Hero />
        <Graph />
      </div>
      <Analytics />
    </>
  );
}

export default App;
