import React from 'react';

function Field(props) {

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
                onBlur={props.onBlur}
                // touched={props.touched}
                errors={props.errors}

            />

            <p className="text-danger">
                {props.touched && props.errors && props.errors}
            </p>
        </div>
    )
}

export default Field

