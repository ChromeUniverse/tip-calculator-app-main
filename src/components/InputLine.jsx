import React from 'react'

function InputLine(props) {

  const style = {
    color: props.value === 0 ? 'var(--grayish-cyan)' : 'var(--very-dark-cyan)',
    backgroundImage: `url('/images/${props.type === 'bill' ? 'icon-dollar.svg' : 'icon-person.svg'}')`
  }

  return (
    <div className="input-line">
      <div className="input-line-top">
        <p className='input-line-top-title'>{props.title}</p>
        <p className="input-error-prompt">{props.error}</p>
      </div>
      <input
        style={style}
        className={`input ${props.error ? "input-error" : ""}`}
        type="text"
        value={props.type === 'bill' ? (props.value/100).toFixed(2) : props.value}
        // onKeyDown={(event) => props.handleKeyDown(event, props.type)}
        onChange={(event) => props.handleChange(event, props.type)}
      />
    </div>
  );
}

export default InputLine