import "./index.css";
import Graph from "./components/Graph";
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Nav />
      <div id='frame' style='width:970px;'><iframe data-aa='2336860' src='//ad.a-ads.com/2336860?size=970x250' style='width:970px; height:250px; border:0px; padding:0; overflow:hidden; background-color: transparent;'></iframe><a style='display: block; text-align: right; font-size: 12px' id='preview-link' href='https://a-ads.com/?partner=2336860'>Advertise here</a></div>
      <div className="flex-col justify-center align-center mx-auto my-3 gap-4 max-w-[600px] bg-base-200">
        <Hero />
        <Graph />
      </div>
      <Analytics />
    </>
  );
}

export default App;
