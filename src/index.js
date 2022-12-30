import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
    titleChanged,
    taskDeleted,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    createTask
} from './store/task';
import configureStore from './store/store';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { getError } from './store/errors';

const store = configureStore();

const App = (params) => {
    const state = useSelector(getTasks());
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChanged(taskId));
    }
    const deleteTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    }

    const addTask = (payload) => {
        dispatch(createTask(payload));
    };

    if (isLoading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        return <p>{ error }</p>
    }
    return (
        <>
            <h1>App</h1>
            <ul>
                { state.map(el => (
                    <li key={ el.id }>
                        <p>{ el.title }</p>
                        <p>{ `Completed: ${el.completed}` }</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>Complete</button>
                        <button onClick={() => changeTitle(el.id)}>Change Title</button>
                        <button onClick={() => deleteTask(el.id)}>Delete Task</button>
                        <hr/>
                    </li>
                ))}
            </ul>
            <button onClick={
                () => addTask({
                    userId: Math.ceil(Math.random() * 10),
                    title: "Not your deal",
                    completed: false
                })
            }>
                Add Task
            </button>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={ store } >
            <App />
        </Provider>
    </React.StrictMode>
);
