import React from "react";

function Calculator(props) {
  return (
    <div className="display">
      <div className="display-line">
        <div className="display-line-left">
          <p className="display-caption-1">Tip Amount</p>
          <p className="display-caption-2">/ person</p>
        </div>
        <p className="display-line-price">${(props.tipPerPerson / 100).toFixed(2)}</p>
      </div>
      <div className="display-line">
        <div className="display-line-left">
          <p className="display-caption-1">Total</p>
          <p className="display-caption-2">/ person</p>
        </div>    
        <p className="display-line-price">${(props.totalPerPerson / 100).toFixed(2)}</p>
      </div>
      <button className={`display-btn ${props.hideReset ? 'display-btn-hide' : ''}`} onClick={props.handleResetButton}>Reset</button>
    </div>
  );
}

export default Calculator;
