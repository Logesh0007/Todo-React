import React from "react";

function Todo({ task, del, updateTaskTrue, updateTaskFalse }) {
  const delFunc = () => {
    del(task.id);
  };

  console.log(task);

  return (
    <tr
      className="row-task"
      style={{
        transition: "all 300ms",
        textDecoration: task.data.completed ? "line-through" : "",
      }}
    >
      <div
        className="tr-content"
        id="task-list"
        style={{ opacity: task.data.completed ? "0.5" : "1" }}
      >
        {task.data.detail}
      </div>
      <div className="opt-cont">
        {task.data.completed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="uncomplete"
            viewBox="0 0 512 512"
            fill={task.data.completed ? "rgb(0,255,0)" : "white"}
            style={{
              backgroundColor: task.data.completed ? "white" : "rgb(0,255,0)",
            }}
            onClick={() => {
              updateTaskFalse(task.id);
            }}
          >
            <title>Uncomplete</title>
            <path d="M400 48H112a64.07 64.07 0 00-64 64v288a64.07 64.07 0 0064 64h288a64.07 64.07 0 0064-64V112a64.07 64.07 0 00-64-64zm-35.75 138.29l-134.4 160a16 16 0 01-12 5.71h-.27a16 16 0 01-11.89-5.3l-57.6-64a16 16 0 1123.78-21.4l45.29 50.32 122.59-145.91a16 16 0 0124.5 20.58z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="complete"
            viewBox="0 0 512 512"
            onClick={() => {
              updateTaskTrue(task.id);
            }}
          >
            <title>Complete</title>
            <path
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="32"
              d="M416 128L192 384l-96-96"
            />
          </svg>
        )}

        <svg
          onClick={delFunc}
          className="del"
          style={{ transition: "all 200ms" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM394.8 466.1C393.2 492.3 372.3 512 346.9 512H101.1C75.75 512 54.77 492.3 53.19 466.1L31.1 128H416L394.8 466.1z" />
          <title>Delete</title>
        </svg>
      </div>
    </tr>
  );
}

export default Todo;
