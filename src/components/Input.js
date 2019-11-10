import React from 'react';
import '../css/components/inputStyle.css';


const Input = (props) => {

    const firstUpdate = React.useRef(true);
    React.useLayoutEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
        }
    },[]);
    
    return(
        <div className="form-group">
            <label htmlFor={props.name} className="form-label">{props.title}</label>
            <input 
                className = {(firstUpdate.current || props.isValid) ? "form-control" : "error"}
                id={props.name}
                type={props.inputType}
                value={props.value}
                name = {props.name}
                onChange={props.handleChange}
                placeholder={props.placeholder}
            />
            {(!firstUpdate.current && !props.isValid) && 
                <span className='error'>{props.errorMessage}</span>}  
        </div>
    );
}

export default Input