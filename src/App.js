import React, { useState } from 'react'; // Import React and useState hook
import './App.css'; // Import main styles
import TodoInput from './components/TodoInput'; // Import TodoInput component
import TodoList from './components/TodoList'; // Import TodoList component
import DotPattern from './components/DotPattern'; // Import DotPattern for background
import ThemeToggle from './components/ThemeToggle'; // Import ThemeToggle component

function App() {
  const [targetTodos, setTargetTodos] = useState([]); // State to hold target todos
  const [todoList, setTodoList] = useState([]); // State to hold todo items
  const [inProgressTodos, setInProgressTodos] = useState([]); // State to hold tasks in progress
  const [completedTodos, setCompletedTodos] = useState([]); // State to hold completed tasks

  // Add new target
  let addTarget = (inputText) => {
    if (inputText !== '') {
      setTargetTodos([...targetTodos, inputText]);
    }
  };

  // Add new todo
  let addTodo = (inputText) => {
    if (inputText !== '') {
      setTodoList([...todoList, inputText]);
    }
  };

  // Delete from todoList
  const handleDeleteTodo = (index) => {
    const newTodoList = todoList.filter((item, i) => i !== index);
    setTodoList(newTodoList);
  };

  // Delete from targetTodos
  const handleDeleteTarget = (index) => {
    const newTargetList = targetTodos.filter((item, i) => i !== index);
    setTargetTodos(newTargetList);
  };

  // Delete from inProgressTodos
  const handleDeleteInProgress = (index) => {
    const newInProgressList = inProgressTodos.filter((item, i) => i !== index);
    setInProgressTodos(newInProgressList);
  };

  // Delete from completedTodos
  const handleDeleteCompleted = (index) => {
    const newCompletedList = completedTodos.filter((item, i) => i !== index);
    setCompletedTodos(newCompletedList);
  };

  // Move items using drag-and-drop
  const onDragStart = (event, item, source) => {
    event.dataTransfer.setData('item', JSON.stringify({ item, source }));
  };

  const onDrop = (event, destination) => {
    let { item, source } = JSON.parse(event.dataTransfer.getData('item'));
    if (source === destination) return; // Prevent moving to the same list

    // Remove item from the source list
    let sourceList;
    let setSourceList;

    switch (source) {
      case 'todo':
        sourceList = todoList;
        setSourceList = setTodoList;
        break;
      case 'progress':
        sourceList = inProgressTodos;
        setSourceList = setInProgressTodos;
        break;
      case 'completed':
        sourceList = completedTodos;
        setSourceList = setCompletedTodos;
        break;
      case 'target':
        sourceList = targetTodos;
        setSourceList = setTargetTodos;
        break;
      default:
        return;
    }

    // Remove from source
    const newSourceList = sourceList.filter((i) => i !== item);
    setSourceList(newSourceList);

    // Add to destination
    let destinationList;
    let setDestinationList;

    switch (destination) {
      case 'todo':
        destinationList = todoList;
        setDestinationList = setTodoList;
        break;
      case 'progress':
        destinationList = inProgressTodos;
        setDestinationList = setInProgressTodos;
        break;
      case 'completed':
        destinationList = completedTodos;
        setDestinationList = setCompletedTodos;
        break;
      case 'target':
        destinationList = targetTodos;
        setDestinationList = setTargetTodos;
        break;
      default:
        return;
    }

    setDestinationList([...destinationList, item]);
  };

  return (
    <div className="app-container">
      <DotPattern className="dot-pattern" />
      <ThemeToggle />
      <div className='kanban-board'>
        {/* Your Target Column */}
        <div
          className="column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, 'target')}
        >
          <h1 className="heading">Your Target</h1>
          <hr />
          <TodoInput addList={addTarget} />
          <hr />
          {targetTodos.map((item, i) => (
            <div
              key={i}
              draggable
              onDragStart={(e) => onDragStart(e, item, 'target')}
            >
              <TodoList 
                key={i} 
                item={item} 
                index={i} 
                deleteItem={handleDeleteTarget} // Pass delete function for targetTodos
              />
            </div>
          ))}
        </div>

        {/* Your To-Do Column */}
        <div
          className="column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, 'todo')}
        >
          <h1 className="heading">To Do</h1>
          <hr />
          <TodoInput addList={addTodo} />
          <hr />
          {todoList.map((item, i) => (
            <div
              key={i}
              draggable
              onDragStart={(e) => onDragStart(e, item, 'todo')}
            >
              <TodoList 
                key={i} 
                item={item} 
                index={i} 
                deleteItem={handleDeleteTodo} // Pass delete function for todoList
              />
            </div>
          ))}
        </div>

        {/* In Progress Column */}
        <div
          className="column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, 'progress')}
        >
          <h1 className="heading">In Progress</h1>
          <hr />
          {inProgressTodos.map((item, i) => (
            <div
              key={i}
              draggable
              onDragStart={(e) => onDragStart(e, item, 'progress')}
            >
              <TodoList 
                key={i} 
                item={item} 
                index={i} 
                deleteItem={handleDeleteInProgress} // Pass delete function for inProgressTodos
              />
            </div>
          ))}
        </div>

        {/* Completed Task Column */}
        <div
          className="column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => onDrop(e, 'completed')}
        >
          <h1 className="heading">Completed Task</h1>
          <hr />
          {completedTodos.map((item, i) => (
            <div
              key={i}
              draggable
              onDragStart={(e) => onDragStart(e, item, 'completed')}
            >
              <TodoList 
                key={i} 
                item={item} 
                index={i} 
                deleteItem={handleDeleteCompleted} // Pass delete function for completedTodos
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
