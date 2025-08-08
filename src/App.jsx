import React from "react";
import Header from "./components/Header/Header";
import Features from "./components/Features";
import Footer from "./components/Footer/Footer";
import FAQ from "./components/FAQ";
import Review from "./components/Review";
import AiCoach from "./components/AiCoach";
import HowItWorks from "./components/HowItWorks";
import Integrations from "./components/Integrations";
import Capabilities from "./components/Capabilities";

const App = () => {
  return (
    <div className="maxContainer">
      <Header />
      <AiCoach />
      <Features />
      <Capabilities /> 
      <Integrations /> 
      <HowItWorks />
      <Review />
      <FAQ />
      <Footer />
    </div>
  );
};

export default App;
