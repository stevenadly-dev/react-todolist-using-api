import React, { useEffect, useState } from "react";
import "./TodoList.scss";
import TodoForm from "./TodoForm/TodoForm";
import Todo from "./Todo/Todo";
import * as todoservice from "../../Services/TodosService";
import Loader from "../Shared/Loader/Loader";

const TodoList = () => {
  let utoken = "";
  let [toAddTask, settoAddTask] = useState({
    description: "",
  });

  let [allTasks, setallTasks] = useState([]);
  let [filteredallTasks, setfilteredallTasks] = useState([]);


  let [filterByValue, setfilterByValue] = useState(0);
  const [listLoading, setlistLoading] = useState(false);




  let getAllTasks = () => {
    setlistLoading(true);
    utoken = JSON.parse(localStorage.getItem("todoToken"));
    todoservice.getAllTasks(utoken).then((res) => {

      console.log(res.data.data);
      // res.data.data.fore

      let newData = [];
      res.data.data.forEach((element, index) => {
        element['isLoadingDelete'] = false;
        element['isLoadingToggle'] = false;

        newData.push(element)

      });
      setallTasks(newData);
      setlistLoading(false);
    });
  };

  let addTask = () => {
    utoken = JSON.parse(localStorage.getItem("todoToken"));
    todoservice.addTask(utoken, toAddTask).then((res) => {
      if (res.data.success) {

        res.data.data['isLoadingDelete'] = false;
        res.data.data['isLoadingToggle'] = false;

        setallTasks([...allTasks, res.data.data]);
        settoAddTask({
          description: "",
        });
      }
      console.log(res);
    });
  };

  let onSubmitForm = (e) => {
    e.preventDefault();
    addTask();
  };


  useEffect(() => {
    getAllTasks();
  }, []);


  useEffect(() => {
    filterBy();
  }, [allTasks, filterByValue])


  let filterBy = () => {
    let allTasksCpy = [...allTasks];

    switch (+filterByValue) {
      case 0:
        setfilteredallTasks(allTasksCpy);
        break;
      case 1:
        let newFilteredCpy = allTasksCpy.filter(el => { return el.completed === true });
        setfilteredallTasks(newFilteredCpy);
        break;
      case 2:
        let newFilteredCpy2 = allTasksCpy.filter(el => el.completed === false);
        setfilteredallTasks(newFilteredCpy2);
        break;
      default:
      // code block
    }
  }
  return (
    <section className="todo-home-section">
      <TodoForm
        toAddTask={toAddTask}
        settoAddTask={settoAddTask}
        onSubmitForm={onSubmitForm}

        filterByValue={filterByValue}
        setfilterByValue={setfilterByValue}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <ul className="todo-list">
              {listLoading && filteredallTasks && <Loader />}
              {filteredallTasks &&
                filteredallTasks.map((task) => {
                  return (
                    <Todo
                      key={task._id}
                      task={task}
                      allTasks={allTasks}
                      setallTasks={setallTasks}
                    />
                  );
                })}

              {/* <Todo /> */}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
