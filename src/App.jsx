import React, { useState, useEffect } from 'react'

// custom components
import logo from './assets/logo.svg'
import Display from './components/Display'
import InputPanel from './components/InputPanel'

// module imports
import validator from "validator";

function App() {

  const [input, setInput] = useState({
    bill: 14555,
    selectedTip: false,
    customTip: 23,
    people: 4,
  });

  const [errors, setErrors] = useState({
    bill: '',
    people: '',
  })

  const [output, setOutput] = useState({
    tipPerPerson: 12,
    totalPerPerson: 0
  })

  const tips = [5, 10, 15, 25, 50];

  useEffect(() => {

    // check edge cases
    if (input.people === 0 && input.bill === 0) { 
      setOutput({ tipPerPerson: 0, totalPerPerson: 0 });
      return setErrors(oldErrors => ({ ...oldErrors, people: "" }));
    } else if (input.people === 0 && input.bill !== 0) {
      return setErrors(oldErrors => ({ ...oldErrors, people: "Can't be zero" }));
    } else {
      setErrors(oldErrors => ({ ...oldErrors, people: "" }));
    }

    // check selected tip first, then check custom tip    
    const tipPercentage = (input.selectedTip) ? tips[input.selectedTip] : input.customTip;
    const tip = input.bill * (tipPercentage / 100);
    const billTotal = input.bill + tip;

    setOutput({
      tipPerPerson: Math.round(tip / input.people),
      totalPerPerson: Math.round(billTotal / input.people)
    })

  }, [input])
  

  function handleKeyDown(e, type) {
    if (validator.isNumeric(e.key)) {
      setInput((oldInput) => {
        const newInput = Number(oldInput[type].toString() + e.key);
        if (newInput.toString().length > 6) {
          return { ...oldInput, [type]: oldInput[type] };
        }
        return { ...oldInput, [type]: newInput };
      });
    } else if (e.key === "Backspace" || e.key === "Delete") {
      setInput((oldInput) => {
        const newInput = Number(
          oldInput[type]
            .toString()
            .slice(0, oldInput[type].toString().length - 1)
        );
        return { ...oldInput, [type]: newInput };
      });
    }
  }  

  function handleTipsClick(index) {
    if (input.selectedTip === index) {
      return setInput(oldInput => ({ ...oldInput, selectedTip: false }));
    };
    setInput(oldInput => ({ ...oldInput, selectedTip: index, customTip: 0 }));
  }

  function handleCustomTip(event) {
    setInput(oldInput => ({ ...oldInput, selectedTip: false }));
    handleKeyDown(event, 'customTip');
  }

  function handleResetButton() {
    // console.log('clicked!');
    setInput({ bill: 0, selectedTip: false, customTip: 0, people: 0 });
  }

  return (
    <main className="main">
      <img src={logo} alt="" />
      <div className="calculator">
        <InputPanel
          input={input}
          tips={tips}
          errors={errors}
          handleKeyDown={handleKeyDown}
          handleTipsClick={handleTipsClick}
          handleCustomTip={handleCustomTip}          
        />
        <Display
          tipPerPerson={output.tipPerPerson}
          totalPerPerson={output.totalPerPerson}
          handleResetButton={handleResetButton}
        />
      </div>
    </main>
  );
}

export default App