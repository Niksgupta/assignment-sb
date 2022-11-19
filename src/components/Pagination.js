import React, { useState, useEffect } from "react";

const Pagination = ({ displayPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = displayPerPage * counter;
    onPaginationChange(value - displayPerPage, value);
  }, [counter]);

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
      <a onClick={() => onButtonClick("prev")} class="previous round">
        &#8249;
      </a>
      <div className="page-count">
        <h6>{counter}</h6>
      </div>

      <a onClick={() => onButtonClick("next")} class="next round">
        &#8250;
      </a>
    </div>
  );
};

export default Pagination;
