import { getAllTasks } from "../../Services/TodosService";
import { todosConstants } from "./todosConstants";

export const fetchTodosList = (uToken) => {
    return (dispatch) => {
        dispatch(fetchTodosListRequest());
        getAllTasks(uToken).then((res) => {
            dispatch(fetchTodosListSuccess(res.data.data));
            // dispatch(changeTodosListFilter(1, []))
        }).catch(err => {
            dispatch(fetchTodosListFailed(err.message));
        })
    }
}

export const fetchTodosListRequest = () => {
    return {
        type: todosConstants.FETCH_ALL_TODOS_REQUEST
    }
}

export const fetchTodosListSuccess = (todosList) => {
    return {
        type: todosConstants.FETCH_ALL_TODOS_SUCCESS,
        payload: todosList
    }
}

export const fetchTodosListFailed = (errors) => {
    return {
        type: todosConstants.FETCH_ALL_TODOS_FAILED,
        payload: errors
    }
}

// =====================

export const changeTodosListFilter = (filterType, allTodos = []) => {
    debugger

    let allTodosCopy = [...allTodos];


    switch (+filterType) {
        case 0:
            return {
                type: todosConstants.CHANGE_ALL_TODOS_fILTER,
                payload: allTodosCopy
            }
        case 1:
            let completedTodos = allTodosCopy.filter((el) => {
                return el.completed === true;
            });
            return {
                type: todosConstants.CHANGE_ALL_TODOS_fILTER,
                payload: completedTodos
            }
        case 2:
            let uncompletedTodos = allTodosCopy.filter(
                (el) => el.completed === false
            );
            return {
                type: todosConstants.CHANGE_ALL_TODOS_fILTER,
                payload: uncompletedTodos
            }
        default:
            return {
                type: todosConstants.CHANGE_ALL_TODOS_fILTER,
                payload: allTodosCopy
            }
        // code block
    }
}


export const test = () => {
    debugger
    return (dispatch) => {
        dispatch(testAct())
    }
}

export const testAct = () => {
    debugger
    return {
        type: 'test',
    }
}
