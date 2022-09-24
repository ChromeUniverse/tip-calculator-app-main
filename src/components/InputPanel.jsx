import React from "react";
import InputLine from "./InputLine";

function InputPanel(props) {  

  const style = {
    textAlign: props.input.customTip === 0 ? 'center' : 'right',
    paddingRight: props.input.customTip === 0 ? '0' : '15px',
    color: props.input.customTip === 0 ? 'var(--grayish-cyan)' : 'var(--very-dark-cyan)',
  }

  return (
    <div className="input-panel">
      <InputLine
        title="Bill"
        error={props.errors.bill}
        value={props.input.bill}
        type="bill"
        // handleKeyDown={props.handleKeyDown}
        handleChange={props.handleChange}
      />

      <div className="tips">
        <p className="tips-title">Select Tip %</p>
        <div className="tips-grid">
          {props.tips.map((tip, index) => (
            <div
              key={index}
              className={`tips-grid-item ${
                props.input.selectedTip === index ? "tips-grid-item-selected" : ""
              }`}
              onClick={() => props.handleTipsClick(index)}
            >
              {tip}%
            </div>
          ))}
          <input
            style={style}
            className="tips-grid-item tips-grid-input"
            type="text"
            value={props.input.customTip === 0 ? 'Custom' : props.input.customTip}
            onKeyDown={props.handleCustomTip}
          />
        </div>
      </div>

      <InputLine
        title="Number of People"
        error={props.errors.people}
        value={props.input.people}
        type="people"
        // handleKeyDown={props.handleKeyDown}
        handleChange={props.handleChange}
      />
    </div>
  );
}

export default InputPanel;
