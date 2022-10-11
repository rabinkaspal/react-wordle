import React, { useEffect } from "react";
import { IoBackspaceOutline } from "react-icons/io5";
import { BsArrowReturnLeft } from "react-icons/bs";

const Keypad = ({ letters, usedKeys }) => {
    const handleBtnClick = key => {
        window.dispatchEvent(
            new KeyboardEvent("keyup", {
                key,
            })
        );
    };

    useEffect(() => {}, [usedKeys]);

    return (
        <div className="keypad">
            {letters.map((row, i) => (
                <div className="row" key={i}>
                    {row.map((l, i) => (
                        <div
                            key={i}
                            onClick={() => handleBtnClick(l)}
                            className={usedKeys[l]}
                        >
                            {l}
                        </div>
                    ))}
                </div>
            ))}

            <div className="buttons">
                <div
                    className="kp-icons delete"
                    onClick={() => handleBtnClick("Backspace")}
                >
                    <IoBackspaceOutline />
                </div>
                <div
                    className="kp-icons enter"
                    onClick={() => handleBtnClick("Enter")}
                >
                    <BsArrowReturnLeft />
                </div>
            </div>
        </div>
    );
};

export default Keypad;
