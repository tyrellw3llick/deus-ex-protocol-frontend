import { Hero } from "./components/Hero";
import { ProjectInfo } from "./components/ProjectInfo";
import { Roadmap } from "./components/Roadmap";
import { Tokenomics } from "./components/Tokenomics";

export function LandingPage() {
  return (
    <>
      <Hero />
      <ProjectInfo />
      <Tokenomics />
      <Roadmap />
    </>
  )

}
