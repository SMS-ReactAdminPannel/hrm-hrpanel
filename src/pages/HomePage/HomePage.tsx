import { useState, useEffect } from "react";
import Image from "../../assets/HomePage/yohologo.png";
import HomeIntro1 from "../../components/HomeIntro/HomeIntro1";
import HomeIntro2 from "../../components/HomeIntro/HomeIntro2";
import HomeIntro3 from "../../components/HomeIntro/HomeIntro3";
import HomeIntro4 from "../../components/HomeIntro/HomeIntro4";
import HomeIntro5 from "../../components/HomeIntro/HomeIntro5";
import HomeIntro6 from "../../components/HomeIntro/HomeIntro6";
import { Link } from "react-router-dom";



const HomePage = () => {
  const [step, setStep] = useState(1);
  

 

  const handleContinue = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleSkip = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1: return <HomeIntro1 />;
      case 2: return <HomeIntro2 />;
      case 3: return <HomeIntro3 />;
      case 4: return <HomeIntro4 />;
      case 5: return <HomeIntro5 />;
      case 6: return <HomeIntro6 />;
      default: return null; 
    }
  };

 
  
  return (
    <div className="fixed w-[50%]  ml-[25%] ">
        <div className=" bg-white m-auto rounded-xl p-4">
          <img src={Image} alt="Logo" className="w-36" />

          {renderStep()}

          <div className="flex justify-between ">
            {step > 1 ? (
              <button
                className="bg-gray-200 text-black p-2 px-6 rounded-lg text-end mr-4"
                onClick={handleBack}
              >
                Back
              </button>
            ) : (
              <div />
            )}

            <div>
              {step > 1 && step <= 6 && (
                <button
                  className="text-black p-2 px-6 rounded-lg text-end mr-4"
                  onClick={handleSkip}
                >
                  Skip
                </button>
              )}

              {
              step == 6 ? <Link to={"/login"} className="bg-green-900 text-white p-2 px-6 rounded-lg text-end">
                Finish
                </Link> :
              <button
                className={`${step <= 6 ? "bg-green-900" : "bg-green-900"
                  } text-white p-2 px-6 rounded-lg text-end`}
                onClick={handleContinue}
              >
                {step < 7 ? "Continue" : ""}
              </button>
              }
            </div>
          </div>
        </div>
    </div>
  );
};

export default HomePage;
