import React, { useState, useEffect, createContext, useContext } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

// Create Theme Context
export const ThemeContext = createContext();

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  // Initialize todos state from localStorage if available, otherwise empty array
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  // Initialize theme state from localStorage if available, otherwise light theme
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Save theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Add a new todo
  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  // Toggle the completed status of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete a todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
        <div className="max-w-lg mx-auto py-10 px-4">
          <div className="text-center mb-8 flex flex-col items-center">
            <h1 className={`text-3xl font-bold mb-2 ${darkMode ? "text-white" : "text-gray-800"}`}>React Todo App</h1>
            <p className={`${darkMode ? "text-gray-300" : "text-gray-600"}`}>Keep track of your tasks</p>
            <button
              onClick={toggleTheme}
              className={`mt-4 px-4 py-2 rounded-md flex items-center ${
                darkMode 
                  ? "bg-gray-700 text-yellow-300 hover:bg-gray-600" 
                  : "bg-gray-300 text-gray-800 hover:bg-gray-400"
              }`}
            >
              {darkMode ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><line x1="128" y1="36" x2="128" y2="32" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><circle cx="128" cy="128" r="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="60" y1="60" x2="56" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="60" y1="196" x2="56" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="196" y1="60" x2="200" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="196" y1="196" x2="200" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="36" y1="128" x2="32" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="220" x2="128" y2="224" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="220" y1="128" x2="224" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-2">Light Mode</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="20" height="20"><rect width="256" height="256" fill="none"/><path d="M108.11,28.11A96.09,96.09,0,0,0,227.89,147.89,96,96,0,1,1,108.11,28.11Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                  <span className="ml-2">Dark Mode</span>
                </>
              )}
            </button>
          </div>

          <div className={`rounded-xl shadow-lg p-6 ${darkMode ? "bg-gray-800" : "bg-white"}`}>
            <TodoForm addTodo={addTodo} />
            
            <div className={`border-t pt-6 ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
              <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-gray-100" : "text-gray-700"}`}>Your Tasks</h2>
              <TodoList 
                todos={todos} 
                onToggleTodo={toggleTodo} 
                onDeleteTodo={deleteTodo} 
              />
            </div>
          </div>
          
          <footer className={`mt-8 text-center text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <p>© {new Date().getFullYear()} React Todo App</p>
          </footer>
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
