import React, { useEffect, useState } from "react";
import {
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import "./App.css";
import Todo from "./Todo";
import db, { colRef } from "./firebase";

function App() {
  const [tasks, setTasks] = useState([]);
  const [todo, setTodo] = useState("");
  const [sort, setSort] = useState("");
  const [sortBox, setSortBox] = useState(false);

  useEffect(() => {
    if (sort === "all" || sort === "") {
      onSnapshot(colRef, (snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
        );
      });
    }

    if (sort === "completed") {
      const sorted = query(colRef, where("completed", "==", true));
      onSnapshot(sorted, (snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
        );
      });
    }

    if (sort === "uncompleted") {
      const sorted = query(colRef, where("completed", "==", false));
      onSnapshot(sorted, (snapshot) => {
        setTasks(
          snapshot.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
        );
      });
    }
  }, [sortBox]);

  // console.log(tasks);

  const updateTaskTrue = (taskId) => {
    const updVal = doc(db, "tasks", taskId);

    updateDoc(updVal, { completed: true })
      .then(() => console.log("done"))
      .catch((err) => console.log(err.message));
  };

  const updateTaskFalse = (taskId) => {
    const updVal = doc(db, "tasks", taskId);

    updateDoc(updVal, { completed: false })
      .then(() => console.log("done"))
      .catch((err) => console.log(err.message));
  };

  const delTask = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId))
      .then(() => console.log("Task deleted successfully"))
      .catch((err) => console.log("error", err.message));
  };

  function addTodo(e) {
    e.preventDefault();
    addDoc(colRef, { detail: todo, completed: false });
    setTodo("");
  }

  return (
    <>
      <h1 className="title" id="title">
        to do list
      </h1>
      <form className="ip-field" autoComplete="off">
        <input
          type="text"
          className="ip-todo"
          id="ip-todo"
          style={{ transition: "all 300ms" }}
          value={todo}
          placeholder="Type your task ..."
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          title="click to add"
          className="add-btn-field"
          onClick={addTodo}
          style={{ transition: "all 300ms" }}
        >
          <svg
            fill="#38165D"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
          </svg>
        </button>

        <div
          className="svg"
          style={{ transition: "all 300ms" }}
          title="SortBy"
          onClick={() => setSortBox(!sortBox)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ionicon"
            viewBox="0 0 512 512"
            fill="#38165D"
          >
            <path d="M296 464a23.88 23.88 0 01-7.55-1.23L208.3 436.1a23.92 23.92 0 01-16.3-22.78V294.11a.44.44 0 00-.09-.13L23.26 97.54A30 30 0 0146.05 48H466a30 30 0 0122.79 49.54L320.09 294a.77.77 0 00-.09.13V440a23.93 23.93 0 01-24 24z" />
          </svg>
        </div>

        <div
          className="sortContainer"
          style={{ display: sortBox ? "block" : "none" }}
        >
          <ul>
            <li
              onClick={() => {
                setSort("all");
                setSortBox(false);
              }}
            >
              All
            </li>
            <li
              onClick={() => {
                setSort("completed");
                setSortBox(false);
              }}
            >
              Completed
            </li>
            <li
              onClick={() => {
                setSort("uncompleted");
                setSortBox(false);
              }}
            >
              Uncompleted
            </li>
          </ul>
        </div>
      </form>
      <div className="list-field">
        <div className="list">
          <table>
            <tbody>
              {tasks.map((task, index) => {
                return (
                  <>
                    <Todo
                      task={task}
                      key={index}
                      del={delTask}
                      updateTaskFalse={updateTaskFalse}
                      updateTaskTrue={updateTaskTrue}
                      ind={index}
                    />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default App;
