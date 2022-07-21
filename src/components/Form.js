import React from "react";

const Form = React.memo(({ todos, input, setInput, setTodos }) => {
  //   console.log("Form is rendering");
  return (
    <form
      className="flex pt-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (todos.length === 0) {
          return setTodos([
            {
              id: Math.round(Math.random() * 100000000).toString(),
              title: input,
              completed: false,
            },
          ]);
        }

        let tmpObj = {
          id: (parseInt(todos[todos.length - 1].id) + 1).toString(),
          title: input,
          completed: false,
        };
        setTodos([...todos, tmpObj]);
        e.currentTarget.inputBar.value = "";
      }}
    >
      <input
        className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
        type="text"
        placeholder="해야 할 일을 입력하세요"
        name="inputBar"
        onChange={(e) => {
          setInput(e.currentTarget.value);
        }}
      />
      <button
        type="submit"
        value="입력"
        className="w-20 p-2 text-blue-400 border-2 border-blue-400 rounded hover:text-white hover:bg-blue-200"
      >
        입력
      </button>
    </form>
  );
});

export default Form;
