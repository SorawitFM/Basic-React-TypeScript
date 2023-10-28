import React, { useState } from 'react';

const ExampleComponent = () => {
    const [todos, setTodos] = useState(['Task 1', 'Task 2']);
    const newTodo = 'Task 3';

    // ใช้ setTodos([todos, newTodo])
    const handleSetTodos1 = () => {
        setTodos([todos, newTodo]);
    };

    // ใช้ setTodos([todos, ...newTodo])
    const handleSetTodos2 = () => {
        setTodos([todos, ...newTodo]);
    };

    // ใช้ setTodos([...todos, ...newTodo])
    const handleSetTodos3 = () => {
        setTodos([...todos, ...newTodo]);
    };

    const handleSetTodos4 = () => {
        setTodos([...todos, newTodo]);
    };
    console.log(todos)

    return (
        <div>
            <button onClick={handleSetTodos1}>setTodos([todos, newTodo])</button>
            <button onClick={handleSetTodos2}>setTodos([todos, ...newTodo])</button>
            <button onClick={handleSetTodos3}>setTodos([...todos, ...newTodo])</button>
            <button onClick={handleSetTodos4}>setTodos([...todos, newTodo])</button>
        </div>
    );
};

export default ExampleComponent;
