import React, { useState, useEffect } from "react";

const Pagination = ({ displayPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = displayPerPage * counter;
    onPaginationChange(value - displayPerPage, value);
  }, [counter,onPaginationChange,displayPerPage]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / displayPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <button onClick={() => onButtonClick("prev")} class="previous round">
        &#8249;
      </button>
      <div className="page-count">
        <h6>{counter}</h6>
      </div>

      <button onClick={() => onButtonClick("next")} class="next round">
        &#8250;
      </button>
    </div>
  );
};

export default Pagination;
