import React, { useState , useEffect} from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
  useEffect(() => {
    // Start the timer
    const timer = setTimeout(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          
          onAnswered(false);
          return 10; // Reset the timer for the next question
        } else {
          return prevTime - 1; // Decrement the timer
        }
      });
    }, 1000);

    // Cleanup function to clear the timeout
    return () => clearTimeout(timer);
  }, [timeRemaining, onAnswered]);

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
