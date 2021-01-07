import React from "react";

const TodoForm = ({ toAddTask, settoAddTask, onSubmitForm, filterByValue, setfilterByValue }) => {


  let handleOnChange = (e) => {
    settoAddTask({
      ...toAddTask,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container pt-5">
        <form className="row" onSubmit={onSubmitForm}>
          <div className="col-md-8 todo-input-container">
            <input
              type="text"
              className="todo-input"
              placeholder="Enter what you want ToDo"
              value={toAddTask.description}
              onChange={handleOnChange}
              name="description"
            />
            <button className="todo-button" type="submit">
              <i className="fas fa-plus-square"></i>
            </button>
          </div>
          <div className="col-md-4">
            <div className="select">
              <select name="todos" className="filter-todo" value={filterByValue} onChange={(e) => setfilterByValue(e.target.value)}>
                <option value="0">All</option>
                <option value="1">Completed</option>
                <option value="2">Uncompleted</option>
              </select>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TodoForm;
