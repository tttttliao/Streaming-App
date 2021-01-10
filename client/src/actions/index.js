import { SIGN_IN, SIGN_OUT, CREATE_STREAM, FETCH_STREAM, FETCH_STREAMS, DELETE_STREAM, EDIT_STREAM } from './types';
import streams from '../apis/streams';
import history from '../history';

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export function createStream(formValues) {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.post('/streams', {...formValues, userId});
        dispatch({ type: CREATE_STREAM, payload: response.data })
        history.push('/');
    };
}

export function fetchStreams() {
    return async (dispatch) => {
        const response = await streams.get('/streams');
        dispatch({ type: FETCH_STREAMS, payload: response.data })
    }
}

export function fetchStream(id) {
    return async (dispatch) => {
        const response = await streams.get(`/streams/${id}`);
        dispatch({ type: FETCH_STREAM, payload: response.data })
    }
}

export function editStream(id, formValues) {
    return async (dispatch, getState) => {
        const { userId } = getState().auth;
        const response = await streams.put(`/streams/${id}`, {...formValues, userId});
        dispatch({ type: EDIT_STREAM, payload: response.data });
        history.push('/');
    }
}

export function deleteStream(id) {
    return async (dispatch) => {
        await streams.delete(`/streams/${id}`);
        dispatch({ type: DELETE_STREAM, payload: id })
        history.push('/');
    }
}
