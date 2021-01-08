import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as taskServices from '../../../Services/TodosService';
function TodoPage(props) {
    const [curentTask, setCurrentTask] = useState({});
    const history = useHistory();
    let utoken = ""
    // console.log(+props.computedMatch.params.todoId);

    let getTask = () => {
        let CurrentTaskIId = props.computedMatch.params.todoId;
        utoken = JSON.parse(localStorage.getItem("todoToken"));
        taskServices.getSingleTask(utoken, CurrentTaskIId).then((res) => {
            console.log(res.data);
            if (res.data.success) {
                setCurrentTask(res.data.data);
            } else {

            }
        })
    }


    let updateTask = () => {
        let CurrentTaskIId = props.computedMatch.params.todoId;
        utoken = JSON.parse(localStorage.getItem("todoToken"));

        curentTask.description !== "" && taskServices.updateTask(utoken, CurrentTaskIId, curentTask.description).then(res => {
            console.log('res', res);
        })
    }


    let toggleComplete = () => {
        let CurrentTaskIId = props.computedMatch.params.todoId;
        utoken = JSON.parse(localStorage.getItem("todoToken"));


        curentTask.description !== "" && taskServices.toggleCompletedFull(utoken, CurrentTaskIId, curentTask.completed, curentTask.description).then(res => {
            // console.log('res', res);

            if (res.data.success) {
                setCurrentTask(res.data.data);
            } else {

            }

        })
    }


    let deleteCuurentTask = () => {
        let CurrentTaskIId = props.computedMatch.params.todoId;
        utoken = JSON.parse(localStorage.getItem("todoToken"));
        taskServices.deleteTask(utoken, CurrentTaskIId).then(res => {
            if (res.data.success) {
                setCurrentTask({});
                history.goBack();
            }
        })
    }

    useEffect(() => {
        getTask();
    }, [])

    let onChangeHandler = (e) => {
        setCurrentTask({ ...curentTask, description: e.target.value })
    }
    return (
        <section className="home">
            <div className="w-100">


                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-3">
                            <div className="form-group">
                                <input type="text" name="" className={`form-control ${curentTask.completed && 'completed'}`}
                                    placeholder="Task"
                                    value={curentTask.description || ''} onChange={onChangeHandler} />
                                <button name="" className="btn btn-primary mx-1 mt-2" onClick={updateTask}>
                                    Submit
                                </button>

                                <button name="" className="btn btn-success mx-1 mt-2" onClick={() => toggleComplete(curentTask.completed)}>
                                    {curentTask.completed ? 'not Finshed' : 'finished !'}
                                </button>

                                <button name="" className="btn btn-danger mx-1 mt-2" onClick={deleteCuurentTask}>
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>

    )
}

export default TodoPage

