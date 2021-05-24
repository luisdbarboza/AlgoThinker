import React, { useState } from "react";
import classes from "./Select.module.scss";
import clx from "classnames";

const Select = () => {
  const [{ selected, showOptions }, setSelectState] = useState({
    selected: "JavaScript",
    showOptions: false,
  });

  const options = ["JavaScript", "Python", "Java"];

  const optionsSelect = options.map((option, index) => {

    return (
      <div className={classes.option} key={index}>
        <div
          key={index}
          className={
            option === selected ? classes.selectedOption : classes.hiddenOption}
        >
          {option}
          <div className={classes.dropdownIcon}>
            <img
              className={showOptions ? classes.up : undefined}
              src="/assets/img/icons/arrow_drop_down-black.svg"
              alt="show-content"
            />
          </div>
        </div>
        {option === selected && showOptions && (
          <div className={classes.dropdownContent}>
            {options.map((option, index) => {
              return (
                <div
                  key={index}
                  className={
                    clx({
                      [classes.dropdownOption]: true,
                      [classes.selected]: option === selected
                    })
                  }
                  onClick={() => {
                    setSelectState((prevState) => {
                      return { ...prevState, selected: option };
                    });
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  });

  return (
    <div
      className={classes.customSelect}
      onClick={() => {
        setSelectState((prevState) => {
          return { ...prevState, showOptions: !showOptions };
        });
      }}
    >
      {optionsSelect}
    </div>
  );
};

export default Select;
