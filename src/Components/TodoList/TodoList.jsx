import React, { useEffect, useState } from "react";
import "./TodoList.scss";
import TodoForm from "./TodoForm/TodoForm";
import Todo from "./Todo/Todo";
import * as todoservice from "../../Services/TodosService";
import Loader from "../Shared/Loader/Loader";
import Pagination from "../Shared/Pagination/Pagination";


const TodoList = () => {
  let utoken = "";
  let [toAddTask, settoAddTask] = useState({
    description: "",
  });

  let [allTasks, setallTasks] = useState([]);
  let [filteredallTasks, setfilteredallTasks] = useState([]);

  let [filterByValue, setfilterByValue] = useState(0);
  const [listLoading, setlistLoading] = useState(false);

  const [selectedPage, setSelectedPage] = React.useState(1);


  let [tasksInView, settasksInView] = useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage] = React.useState(1);


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


  let paginationFn = () => {
    if (!(filteredallTasks && filteredallTasks.length > 0)) {
      settasksInView([])
      return;
    } else {
      let list = [...filteredallTasks]
      settasksInView(list.slice(pageSize * (page - 1), pageSize * page));
    }
  }

  useEffect(() => {

    paginationFn();
  }, [filteredallTasks, page, pageSize])


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
              {listLoading && tasksInView && <Loader />}
              {tasksInView &&
                tasksInView.map((task) => {
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

            {!listLoading && tasksInView.length > 0 &&
              <Pagination
                pageSize={pageSize}
                page={page}
                count={filteredallTasks?.length ?? 0}
                onChange={(t, v) => {
                  if (t === 1) setPageSize(v);
                  else if (t === 2) setPage(v);
                }}
              />}

          </div>
        </div>
      </div>
    </section>
  );
};

export default TodoList;
