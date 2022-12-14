import React, { useState, useEffect } from 'react'

// custom components
import logo from './assets/logo.svg'
import Display from './components/Display'
import InputPanel from './components/InputPanel'

// module imports
import validator from "validator";

function App() {

  const initialState = { bill: 0, selectedTip: false, customTip: 0, people: 0 };
  const [input, setInput] = useState(initialState);

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
    const tipPercentage = (input.selectedTip !== false) ? tips[input.selectedTip] : input.customTip;
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

  function handleChange(e, type) {

    console.log(e.target.value, e.keyCode, type);

    if (e.target.value === '') {
      setInput((oldInput) => ({ ...oldInput, [type]: 0 }));
    } else if (validator.isNumeric(e.target.value)) {
      console.log('got here', validator.blacklist(e.target.value, '.'));
      setInput((oldInput) => ({
        ...oldInput,
        [type]: Number(validator.blacklist(e.target.value, '.')),
      }));
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
    // handleKeyDown(event, 'customTip');
    handleChange(event, 'customTip');
  }

  function handleResetButton() {
    setInput(initialState);
  }

  return (
    <main className="main">
      <img src={logo} alt="" />
      <div className="calculator">
        <InputPanel
          input={input}
          tips={tips}
          errors={errors}
          // handleKeyDown={handleKeyDown}
          handleChange={handleChange}
          handleTipsClick={handleTipsClick}
          handleCustomTip={handleCustomTip}          
        />
        <Display
          tipPerPerson={output.tipPerPerson}
          totalPerPerson={output.totalPerPerson}
          handleResetButton={handleResetButton}
          hideReset={input.bill === 0 && input.people === 0}
        />
      </div>
    </main>
  );
}

export default App