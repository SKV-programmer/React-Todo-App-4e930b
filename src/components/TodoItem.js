import React from "react";
import { useTheme } from "../App";

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const { darkMode } = useTheme();

  return (
    <div className={`flex items-center justify-between p-4 mb-2 rounded-lg shadow-sm transition-all duration-200 ${
      darkMode 
        ? "bg-gray-800 hover:bg-gray-700" 
        : "bg-white hover:shadow-md"
    }`}>
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className={`w-5 h-5 mr-3 rounded cursor-pointer transition-colors duration-200 ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
              : "border-gray-300 text-blue-600 focus:ring-blue-500"
          }`}
          data-testid="todo-checkbox"
        />
        <span 
          className={`flex-1 transition-colors duration-200 ${
            todo.completed
              ? darkMode 
                ? "line-through text-gray-500"
                : "line-through text-gray-400"
              : darkMode
                ? "text-gray-200"
                : "text-gray-700"
          }`}
        >
          {todo.text}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className={`ml-4 p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 ${
          darkMode
            ? "text-red-400 hover:text-red-300 hover:bg-gray-700 focus:ring-red-500"
            : "text-red-500 hover:text-red-700 hover:bg-red-50 focus:ring-red-500"
        }`}
        aria-label="Delete todo"
        data-testid="delete-button"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-5 w-5" 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path 
            fillRule="evenodd" 
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" 
            clipRule="evenodd" 
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
