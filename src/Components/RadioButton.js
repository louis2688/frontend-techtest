import React from "react";
import Radio from "@material-ui/core/Radio";

const RadioButton = (props) => {
  return (
    <div>
      {props.row.map((item, index) => {
        return (
          <div key={index}>
            <label>{item.value}</label>

            <Radio
              disabled={item.disabled}
              name={item.groupNumber}
              checked={props.selectedValue.selected === item.id ? true : false}
              
              onChange={() => props.onChange(item, props.groupNumber)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RadioButton;
