import React, {useState} from "react";

const Practice1 = () => {
  /*
   * 1. Import useState from react
   * 2. Add a count value to state
   * 3. Display the count in an h1
   * 4. Add a button to increase the count
   */

   const [count, setCount] = useState(7)

   const increment = () => {
     const current = count
     setCount(current + 1)
   }

  return (
    <>
      <h1>{count}</h1>
      <button onClick={increment}>
        ++
      </button>
    </>
  );
};

export default Practice1;
