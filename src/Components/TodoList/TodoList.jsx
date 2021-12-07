import React, { useEffect, useLayoutEffect, useState } from "react";
import "./TodoList.scss";
import TodoForm from "./TodoForm/TodoForm";
import Todo from "./Todo/Todo";
import * as todoservice from "../../Services/TodosService";
import * as authservices from "../../Services/AuthService";
import Loader from "../Shared/Loader/Loader";
import Pagination from "../Shared/Pagination/Pagination";
import { connect } from "react-redux";
import {
  changeTodosListFilter,
  fetchTodosList,
  test,
} from "../../Redux/Todos/todosAction";

let mapStateToProps = (state) => {
  return {
    authToken: state.auth.authToken,
    todosList: state.todos.todosList,
    listLoading: state.todos.listLoading,
    filteredTodosList: state.todos.filteredTodosList,
  };
};
let mapDispatchToProps = (dispatch) => {
  return {
    fetchTodosList: (uToken) => dispatch(fetchTodosList(uToken)),
    changeTodosListFilter: (filterType, allTodos) =>
      dispatch(changeTodosListFilter(filterType, allTodos)),
    test: () => dispatch(test()),
  };
};

const TodoList = (props) => {
  let {
    authToken,
    fetchTodosList,
    todosList,
    listLoading,
    filteredTodosList,
    changeTodosListFilter,
  } = props;
  console.log("authToken @todolist", props);
  // let utoken = "";
  let [toAddTask, settoAddTask] = useState({ description: "" });

  let [allTasks, setallTasks] = useState([]);
  let [filteredallTasks, setfilteredallTasks] = useState([]);

  let [filterByValue, setfilterByValue] = useState(0);
  // const [listLoading, setlistLoading] = useState(false);

  const [selectedPage, setSelectedPage] = React.useState(1);

  let [tasksInView, settasksInView] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  let addTask = () => {
    todoservice.addTask(authToken, toAddTask).then((res) => {
      if (res.data.success) {
        res.data.data["isLoadingDelete"] = false;
        res.data.data["isLoadingToggle"] = false;

        // setallTasks([...allTasks, res.data.data]);
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
    fetchTodosList(authToken);
  }, []);

  useLayoutEffect(() => {
    // filterBy();
    changeTodosListFilter(filterByValue, todosList);
  }, [filterByValue]);

  let paginationFn = () => {
    if (!(filteredTodosList && filteredTodosList.length > 0)) {
      settasksInView([]);
      return;
    } else {
      let list = [...filteredTodosList];
      settasksInView(list.slice(pageSize * (page - 1), pageSize * page));
    }
  };

  useEffect(() => {
    paginationFn();
  }, [filteredTodosList, page, pageSize]);

  // let filterBy = () => {
  //   let allTasksCpy = [...filteredTodosList];

  //   switch (+filterByValue) {
  //     case 0:
  //       setfilteredallTasks(allTasksCpy);
  //       break;
  //     case 1:
  //       let newFilteredCpy = allTasksCpy.filter((el) => {
  //         return el.completed === true;
  //       });
  //       setfilteredallTasks(newFilteredCpy);
  //       break;
  //     case 2:
  //       let newFilteredCpy2 = allTasksCpy.filter(
  //         (el) => el.completed === false
  //       );
  //       setfilteredallTasks(newFilteredCpy2);
  //       break;
  //     default:
  //     // code block
  //   }
  // };
  return (
    <section className="todo-home-section">
      {/* <button onClick={() => changeTodosListFilter(filterByValue, todosList)}>
        test
      </button> */}
      <TodoForm
        toAddTask={toAddTask}
        settoAddTask={settoAddTask}
        onSubmitForm={onSubmitForm}
        filterByValue={filterByValue}
        setfilterByValue={setfilterByValue}
        changeTodosListFilter={changeTodosListFilter}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <ul className="todo-list">
              {listLoading && <Loader />}
              {tasksInView &&
                tasksInView.map((task) => {
                  return (
                    <Todo
                      key={task._id}
                      task={task}
                      allTasks={todosList}
                      setallTasks={setallTasks}
                    />
                  );
                })}

              {/* <Todo /> */}
            </ul>

            {!listLoading && tasksInView.length > 0 && (
              <Pagination
                pageSize={pageSize}
                page={page}
                count={filteredTodosList?.length ?? 0}
                onChange={(t, v) => {
                  if (t === 1) setPageSize(v);
                  else if (t === 2) setPage(v);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
