import React, { useState } from "react";

const Todos = React.memo(
  ({ id, provided, todos, completed, title, snapshot, setTodos }) => {
    // console.log("todos is rendering");
    let idx = todos.findIndex((todos) => todos.id === id);
    let [isEditing, setIsEditing] = useState(false);
    let [editedTitle, setEditedTitle] = useState(title);

    return (
      <div
        key={id}
        //   {...provided.draggableProps}
        //   ref={provided.innerRef}
        //   {...provided.dragHandleProps}
        className={`flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 ${
          snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
        } border rounded`}
      >
        <div className="items-center">
          <input
            type="checkbox"
            name="checkTodo"
            defaultChecked={completed}
            onClick={() => {
              let copy = [...todos];
              completed
                ? (copy[idx].completed = false)
                : (copy[idx].completed = true);
              setTodos(copy);
            }}
          ></input>{" "}
          {isEditing ? (
            <input
              placeholder={editedTitle}
              onChange={(e) => {
                setEditedTitle(e.currentTarget.value);
              }}
            ></input>
          ) : (
            <span className={completed ? "line-through" : "none"}>{title}</span>
          )}
        </div>
        <div className="items-center">
          {isEditing ? (
            <button
              className="mr-6"
              onClick={() => {
                setIsEditing(false);
                let copy = [...todos];
                copy[idx].title = editedTitle;
                setTodos(copy);
              }}
            >
              save
            </button>
          ) : (
            <button
              className="mr-6"
              onClick={() => {
                setIsEditing(true);
              }}
            >
              edit
            </button>
          )}

          <button
            onClick={() => {
              let copy = [...todos];
              copy.splice(idx, 1);
              setTodos(copy);
            }}
          >
            x
          </button>
        </div>
      </div>
    );
  }
);

export default Todos;
