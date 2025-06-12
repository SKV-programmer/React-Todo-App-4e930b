import React from "react";
import TodoItem from "./TodoItem";
import { useTheme } from "../App";

const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  const { darkMode } = useTheme();

  if (todos.length === 0) {
    return (
      <div className={`text-center p-8 rounded-lg shadow-sm transition-colors duration-200 ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-500"}`}>
        <div className={`mb-4 ${darkMode ? "text-gray-500" : "text-gray-400"} flex justify-center`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            <path d="M9 14l2 2 4-4"></path>
          </svg>
        </div>
        <p className={`${darkMode ? "text-gray-400" : "text-gray-500"}`}>No todos yet! Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2" data-testid="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
      <div className={`mt-4 text-sm text-right transition-colors duration-200 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
        {todos.length} {todos.length === 1 ? "item" : "items"}
      </div>
    </div>
  );
};

export default TodoList;
