import React, { useState, useEffect } from "react";
import * as todoservice from "../../../Services/TodosService";

const Todo = ({ task, allTasks, setallTasks }) => {
  let utoken = "";
  const [taskIsLoadingCompleted, settaskIsLoadingCompleted] = useState(false);
  const [taskIsDeleteing, settaskIsDeleteing] = useState(false);


  // useEffect(() => {
  //   settaskIsLoadingCompleted(false);
  //   debugger
  // }, [allTasks])


  // =======================================================================
  let toggleCompleted = (taskId, isCompleted) => {
    utoken = JSON.parse(localStorage.getItem("todoToken"));
    settaskIsLoadingCompleted(true)

    todoservice.toggleCompleted(utoken, taskId, isCompleted).then((res) => {
      console.log("toggleCompleted", res);
      let wantedElement = allTasks.find((el) => el._id == taskId);
      allTasks[allTasks.indexOf(wantedElement)].completed = !isCompleted;
      let newAllTasks = [...allTasks];
      setallTasks(newAllTasks);
      settaskIsLoadingCompleted(false)
    })

  };

  // =================================================

  // settaskIsDeleteing(true);
  let deleteTask = (taskId) => {
    settaskIsDeleteing(true);

    utoken = JSON.parse(localStorage.getItem("todoToken"));
    todoservice.deleteTask(utoken, taskId).then((res) => {
      console.log("delete response", res);
      settaskIsDeleteing(false);

      let wantedElement = allTasks.find((el) => el._id == taskId);
      let elementIndex = allTasks.indexOf(wantedElement);
      allTasks.splice(elementIndex, 1);
      let newAllTasks = [...allTasks];

      setallTasks(newAllTasks);

    });
  };
  return (
    <>
      <div className="todo">
        <li className={`todo-item ${task.completed && "completed"}`}>
          {task.description}
        </li>
        <button
          className="complete-btn"
          onClick={() => toggleCompleted(task._id, task.completed)}
          disabled={taskIsLoadingCompleted}
        >
          <i className="fas fa-check"></i>
        </button>
        <button className="trash-btn" onClick={() => deleteTask(task._id)} disabled={taskIsDeleteing}>
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </>
  );
};

export default Todo;
