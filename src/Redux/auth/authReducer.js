import { authConstants } from "./authConstants"

const initialState = {
    user: undefined,
    authToken: undefined,
    isLaoding: false,
    error: undefined
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // ------------------------------login
        case authConstants.LOGIN_REQUEST:
            return {
                ...state,
                isLaoding: true
            };
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                isLaoding: false,
                user: action.payload.user,
                authToken: action.payload.token,
            };
        case authConstants.LOGIN_FAILED:
            return {
                ...state,
                isLaoding: false,
                error: action.payload,
                user: undefined,
                authToken: undefined
            };
        // ------------------------------logout
        case authConstants.LOGOUT_REQUEST:
            return {
                ...state,
                isLaoding: true
            };
        case authConstants.LOGOUT_SUCCESS:
            debugger
            return {
                ...state,
                isLaoding: false,
                user: undefined,
                authToken: undefined,
            };
        case authConstants.LOGOUT_FAILED:
            debugger
            return {
                ...state,
                isLaoding: false,
                // error: undefined,
                // user: undefined,
                // authToken: undefined
            };
        default:
            return state
    }
}
