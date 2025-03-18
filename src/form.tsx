import { useEffect, useState, FormEvent, ChangeEvent} from "react";


const Form = () => {
  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [topics, setTopics] = useState<string[]>([]);

  const handleNextStep = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep((prev) => prev + 1);
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const {id, value} = e.target
    switch(id) {
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
    const { id, checked } = e.target;
    setTopics((prev) =>
      checked ? [...prev, id] : prev.filter((topic) => topic !== id)
    );
  }

  return (
    <div className="bg-main-bg h-dvh min-h-dvh flex flex-col justify-center items-center text-custom-white">
      <div className="h-3/6 sm:h-2/5 lg:h-2/5 2xl:h-2/5 w-4/5 sm:w-3/7 lg:w-3/8 2xl:w-2/7 block rounded-2xl overflow-clip">
        {step === 1 && <StepOne handleNextStep={handleNextStep} handleInput={handleInput}/>}
        {step === 2 && <StepTwo handleNextStep={handleNextStep} handleChecked={handleChecked}/>}
        {step === 3 && <StepThree name={name} email={email} topics={topics}/>}
      </div>
      <StepRings step={step}/>
    </div>
  );
};

const StepRings = ({ step }: { step: number }) => {
  const inactiveClass = "size-3 bg-step-bg rounded-full";
  const activeClass = "size-3 bg-custom-purple-300 rounded-full outline-5 outline-step-outline";
  const completedClass = "size-3 bg-custom-purple-300 rounded-full";
  
  const totalSteps = 3;
  const steps = Array.from({ length: totalSteps }, (_, index) => index + 1);

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
  handleNextStep, handleInput
}:{
  handleNextStep: (e: FormEvent<HTMLFormElement>) => void,
  handleInput: (e: ChangeEvent<HTMLInputElement>) => void
  },
 ) => {

  return (
    <form
      className="bg-form flex flex-col gap-2 h-full nth-[n]:p-6 justify-between"
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
  handleChecked, handleNextStep
}:{
    handleChecked: (e: ChangeEvent<HTMLInputElement>) => void,
    handleNextStep: (e: FormEvent<HTMLFormElement>) => void,
  }
) => {

  return (
    <form
      className="bg-form flex flex-col gap-2 h-full nth-[n]:p-6 justify-between"
      onSubmitCapture={handleNextStep}
    >
      <label className="block text-custom-white text-xl">
        Which topics are you interested in?
      </label>

      <div id="topics" className="flex flex-col items-baseline h-3/6 m-2 p-2 overflow-scroll">
        <div className="bg-step-bg flex flex-row items-center justify-between h-1/6 p-5 m-2 w-full border-2 border-def-input rounded-md">
          <input
            type="checkbox"
            id="topic1"
            name="topic1"
            value="topic1"
            onChange={handleChecked}
            className="h-5 w-6 appearance-none border-2 border-step-text rounded checked:bg-custom-purple-300 cursor-pointer"
          />
          <label htmlFor="topic1" className="text-base text-center w-full">
            Topic1
          </label>
        </div>

        <div className="bg-step-bg flex flex-row items-center justify-between h-1/6 p-5 m-2 w-full border-2 border-def-input rounded-md">
          <input
            type="checkbox"
            id="topic2"
            name="topic2"
            value="topic2"
            onChange={handleChecked}
            className="h-5 w-6 appearance-none border-2 border-step-text rounded checked:bg-custom-purple-300 cursor-pointer"
          />
          <label htmlFor="topic2" className="text-base text-center w-full">
            Topic2
          </label>
        </div>

        <div className="bg-step-bg flex flex-row items-center justify-between h-1/6 p-5 m-2 w-full border-2 border-def-input rounded-md">
          <input
            type="checkbox"
            id="topic3"
            name="topic3"
            value="topic3"
            onChange={handleChecked}
            className="h-5 w-6 appearance-none border-2 border-step-text rounded checked:bg-custom-purple-300 cursor-pointer"
          />
          <label htmlFor="topic3" className="text-base text-center w-full">
            Topic3
          </label>

        </div>
      </div>
      <SubmitButton/>
    </form>
  );
};

const StepThree = ({name, email, topics}: {name:string, email: string, topics: string[]}) => {
  return (
    <div className="bg-form flex flex-col h-full p-6 justify-between">
      <label className="block text-custom-white text-xl">
        Summary
      </label>
      <div className="flex justify-center flex-col">
      <div className="flex justify-center flex-col gap-1">
      <p className="text-step-text text-base">Name: <span className="text-custom-white">{name}</span></p>
      <p className="text-step-text text-base">Email: <span className="text-custom-white">{email}</span></p>
      </div>

      <div className="flex justify-center flex-col gap-1 mt-4">
        <p className="text-step-text text-base">Topics: </p>
        <ul className="text-custom-white ml-2">
          {topics.length ? topics.map((topic, i) => (
            <li key={i}>{topic}</li>
            ))
          : 
          <p>N/A</p>}
        </ul>
        </div>

      </div>


      <SubmitButton/>
    </div>
  )
}

const SubmitButton = () => {

  return (
    <div className="bg-form min-h-10 flex place-items-end justify-center">
    <button
      type="submit"
      className="
        bg-[linear-gradient(180deg,#845eee_0%,#652cd1_100%)] 
        w-3/9 rounded-2xl min-w-26 max-h-10 h-full
        hover:brightness-125
      "
    >
      Continue &gt;
    </button>
  </div>
  )
}

export default Form;
