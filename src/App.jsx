import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { HomePage } from "./Pages/HomePage/HomePage";
import { AddTaskPage } from "./Pages/AddTaskPage/AddTaskPage";
import { ToastContainer } from "react-toastify";
import { TaskDetailsPage } from "./Pages/TaskDetailsPage/TaskDetailsPage";
import "../node_modules/react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-task" element={<AddTaskPage />} />
          <Route path="/details/:taskid" element={<TaskDetailsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
