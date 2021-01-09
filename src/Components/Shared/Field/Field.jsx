import React from 'react';

function Field(props) {
    console.log(props);
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input
                type={props.type}
                name={props.name}
                id={props.id}
                className={props.className}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
    )
}

export default Field

