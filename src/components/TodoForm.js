import React, { useState } from "react";
import { useTheme } from "../App";

const TodoForm = ({ addTodo }) => {
  const [task, setTask] = useState("");
  const { darkMode } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!task.trim()) return;
    
    addTodo({
      id: Date.now(),
      text: task,
      completed: false
    });
    
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center gap-2 w-full">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new todo..."
          className={`flex-grow px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors duration-200 ${
            darkMode 
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500" 
              : "bg-white border-gray-300 text-gray-700 focus:ring-blue-500 focus:border-blue-500"
          }`}
          data-testid="todo-input"
        />
        <button
          type="submit"
          className={`px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 transition-all duration-300 flex items-center ${
            darkMode
              ? "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-gray-800"
              : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
          }`}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" 
              clipRule="evenodd" 
            />
          </svg>
          <span className="ml-1">Add</span>
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
