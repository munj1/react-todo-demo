import { useEffect, useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import "./App.css";
import Todos from "./components/Todos";
import Form from "./components/Form";

function App() {
  // console.log("app is rendering");
  const initiateTodos = () => {
    if (localStorage.getItem("todos")) {
      return JSON.parse(localStorage.getItem("todos"));
    }
    return [];
  };

  const [todos, setTodos] = useState(initiateTodos());
  const [input, setInput] = useState("");

  const handleEnd = (result) => {
    if (!result.destination) return;
    let fromIdx = todos.findIndex((todo) => todo.id === result.draggableId);
    let toIdx = result.destination.index;
    let copy = [...todos];
    copy[fromIdx] = todos[toIdx];
    copy[toIdx] = todos[fromIdx];
    setTodos(copy);
  };

  useEffect(() => {
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1>할일 목록</h1>
          <button
            onClick={() => {
              setTodos([]);
            }}
          >
            Delete all
          </button>
        </div>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="todo">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {todos.map((todo, i) => {
                  return (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <div
                          key={todo.id}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          {...provided.dragHandleProps}
                        >
                          <Todos
                            todos={todos}
                            setTodos={setTodos}
                            title={todo.title}
                            id={todo.id}
                            key={todo.id}
                            completed={todo.completed}
                            provided={provided}
                            snapshot={snapshot}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div>
          <Form
            todos={todos}
            input={input}
            setInput={setInput}
            setTodos={setTodos}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
