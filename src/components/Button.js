import React from 'react';

import '../css/components/buttonStyle.css';

const Button = (props) => {
    return (
        <div className="form-group">
            <button
                className = {props.type == 'primary' ? 'btn btn-primary': 'btn btn-secondary'}
                onClick = {props.action}
                disabled = {props.disabled}>
                {props.title}
            </button>    
        </div>
    )
}

export default Button;