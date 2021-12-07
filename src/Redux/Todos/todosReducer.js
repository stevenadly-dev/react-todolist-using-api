import { todosConstants } from "./todosConstants";

const initialState = {
    listLoading: false,
    actionsLoading: false,
    todosList: [],
    filteredTodosList: [],
    error: undefined
};
export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'test':
            debugger
            return {
                ...state,
                filteredTodosList: action.payload,
            };
        // ---------------------------------------------------------- FetchAll Todos
        case todosConstants.FETCH_ALL_TODOS_REQUEST:
            return {
                ...state,
                listLoading: true
            };
        case todosConstants.FETCH_ALL_TODOS_SUCCESS:
            return {
                ...state,
                listLoading: false,
                todosList: action.payload,
                filteredTodosList: action.payload
            };
        case todosConstants.FETCH_ALL_TODOS_FAILED:
            return {
                ...state,
                listLoading: false,
                todosList: [],
                filteredTodosList: [],
                error: action.payload
            };

        case todosConstants.CHANGE_ALL_TODOS_fILTER:
            debugger
            return {
                ...state,
                listLoading: false,
                // todosList: action.payload,
                filteredTodosList: action.payload
            }

        default:
            return state
    }
    // ===================================================================
}

