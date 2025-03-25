import {useState, useContext, createContext} from "react"
import {FormEvent, ChangeEvent} from "react";

const totalSteps = 3;
const StepContext = createContext<number>(1);
const useStepContext = () => {
  return useContext(StepContext);
};

const Form = () => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);

  const handleNextStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const submitter = e.nativeEvent instanceof SubmitEvent
    submitter  && step <= totalSteps
    ? setStep((prev) => prev + 1) 
    : setStep((prev) => prev - 1)
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target

    switch(id) 
    {
      case "name": 
        setName(value);
        break;

      case "email": 
        setEmail(value);
        break;

      default:
        break;
    }
  }

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;;
    setTopics((prev) =>
      checked ? [...prev, value] : prev.filter((topic) => topic !== value)
    );
  }

  return (
    <StepContext.Provider value={step}>
    <div className="bg-main-bg h-dvh min-h-dvh flex flex-col justify-center items-center text-custom-white">
      <div className="h-4/5 sm:h-3/5 lg:h-3/5 2xl:h-3/5 w-4/5 sm:w-3/6 lg:w-3/8 2xl:w-2/7 block rounded-2xl overflow-clip">
        {step === 1 && <StepOne handleNextStep={handleNextStep} handleInput={handleInput} />}
        {step === 2 && <StepTwo handleNextStep={handleNextStep} handleChecked={handleChecked} topics={topics} />}
        {step === 3 && <StepThree handleNextStep={handleNextStep} name={name} email={email} topics={topics} />}

        {/*  placeholder for next actions(e.g. sending data to server) after final step  */}
        {void (step > totalSteps && window.location.reload())}

      </div>
      <StepRings />
    </div>
    </StepContext.Provider>
  );
};

const StepRings = () => {
  const step = useContext(StepContext);
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);
  
  const inactiveClass = "size-3 bg-step-bg rounded-full";
  const activeClass = "size-3 bg-custom-purple-300 rounded-full outline-5 outline-step-outline";
  const completedClass = "size-3 bg-custom-purple-300 rounded-full";
  
  const getStepClass = (stepNumber: number) => {
    if (step > stepNumber) return completedClass;
    if (step === stepNumber) return activeClass;
    return inactiveClass;
  };

  return (
    <div className="flex flex-row gap-3 items-center p-4">
      <p className="text-step-text text-sm">Step {step} of {totalSteps}</p>
      {steps.map((stepNumber) => (
        <div key={stepNumber} className={getStepClass(stepNumber)}></div>
      ))}
    </div>
  );
};

const StepOne = ({
  handleNextStep, 
  handleInput,
}:{
  handleNextStep: (e: FormEvent<HTMLFormElement>) => void,
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
  },
 ) => {

  return (
    <form
      className="bg-form flex flex-col gap-2 h-full p-6 justify-between"
      onSubmitCapture={handleNextStep}
    >
      <label className="block text-custom-white text-xl mb-6">
        Registration
      </label>
      
      <label htmlFor="name" 
          className="block text-custom-white text-sm">Name</label>
      <input
        type="text"
        name="name"
        onChange={handleInput}
        id="name"
        // required
        placeholder="Enter your name "
        className="
        text-sm h-1/6 rounded-xl p-2 
        border-def-input border-2 
        focus:outline-none focus:border-step-text focus:bg-custom-purple-300"
      />

      <label htmlFor="email" className="block text-custom-white text-sm">Email</label>
      <input
        type="email"
        name="email"
        onChange={handleInput}
        id="email"
        // required
        placeholder="Enter your email"
        className="
        text-sm h-1/6 rounded-xl p-2 
      border-def-input border-2
        focus:outline-none focus:border-step-text focus:bg-custom-purple-300"
      />
        <SubmitButton/>
    </form>
  );
};

const StepTwo = ({
  handleChecked,
  handleNextStep,
  topics,
}:{
  handleChecked: (e: ChangeEvent<HTMLInputElement>) => void;
  handleNextStep: (e: FormEvent<HTMLFormElement>) => void;
  topics: string[]; 
}) => {

  // Mock topics
  let topicNames = ["JavaScript", "Python", "Ruby"];

  return (
    <form
      className="bg-form flex flex-col gap-1 h-full p-6 justify-between"
      onSubmitCapture={handleNextStep}
      onReset={handleNextStep}
    >
      <label className="block text-custom-white text-xl">
        Which topics are you interested in?
      </label>

      <div
        id="topics"
        className="flex flex-col items-baseline h-4/6 m-2 p-2 overflow-x-hidden"
      >
        {topicNames.map((topic, i) => (
          <div
            className="bg-step-bg flex flex-row items-center justify-between h-1/6 p-5 m-2 w-full border-2 border-def-input rounded-md"
            key={i}
          >
            <input
              type="checkbox"
              id={`topic-${i}`}
              value={topic}
              onChange={handleChecked}
              checked={topics.includes(topic)}
              className="h-5 w-6 appearance-none border-2 border-step-text rounded checked:bg-custom-purple-300 cursor-pointer"
            />
            <label
              htmlFor={`topic-${i}`}
              className="text-base text-center w-full"
            >
              {topic}
            </label>
          </div>
        ))}
      </div>
      <SubmitButton />
    </form>
  );
};

const StepThree = ({
  name,
  email,
  topics,
  handleNextStep,
}:{
  name:string,
  email: string,
  topics: string[],
  handleNextStep: (e: FormEvent<HTMLFormElement>) => void
}) => {
  return (
    <form
      className="bg-form flex flex-col h-full p-6 min-h-0"
      onSubmit={handleNextStep}
      onReset={handleNextStep}
    >
      <label className="block text-custom-white text-xl font-bold mb-4">
        Summary
      </label>

      <div className="flex flex-col gap-4 flex-1 overflow-hidden">
        <div className="flex flex-col gap-2">
          <p className="text-step-text text-base">
            Name: <span className="text-custom-white font-medium">{name}</span>
          </p>
          <p className="text-step-text text-base">
            Email:{" "}
            <span className="text-custom-white font-medium">{email}</span>
          </p>
        </div>

        <div className="flex flex-col flex-1 min-h-0">
          <p className="text-step-text text-base mb-1">Topics:</p>
          <ul className="text-custom-white ml-4 overflow-y-auto">
            {topics.length ? (
              topics.map((topic, i) => <li key={i}>{topic}</li>)
            ) : (
              <p>N/A</p>
            )}
          </ul>
        </div>
      </div>
      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const step = useStepContext();
  const backBtn = () => {
    if (step > 1) {
      return (
        <button
          type="reset"
          id="prevBtn"
          className="
      bg-[linear-gradient(180deg,#845eee_0%,#652cd1_100%)] 
      w-3/9 rounded-2xl min-w-26 max-h-10 h-full
      hover:brightness-125"
        >
          &lt; Back
        </button>
      );
    }
  };

  return (
    <div className="bg-form min-h-10 flex justify-around">
      {backBtn()}
      <button
        type="submit"
        id="nextBtn"
        className="
        bg-[linear-gradient(180deg,#845eee_0%,#652cd1_100%)] 
        w-3/9 rounded-2xl min-w-26 max-h-10 h-full
        hover:brightness-125"
      >
        Continue &gt;
      </button>
    </div>
  );
};

export default Form;
