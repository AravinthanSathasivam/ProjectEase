import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.ts";

import { postData, updateData } from "../services/tasksApi";

function Modal({ setIsModalOpen, mode, task, fetchTasks }) {
  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(null);
  const isEdit = mode === "edit";
  
  const [data, setData] = useState({
    user_email: isEdit ? task.user_email : user.userEmail,
    title: isEdit ? task.title : '',
    urgency: isEdit ? task.urgency : 1,
    date: isEdit ? task.date : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (data.title.trim() === "") {
      setErrorMessage("Please Enter a Task Title");
      return;
    }

    try {
      await postData(data).then((res) => {
        setIsModalOpen(false)
        fetchTasks();
      })
    } catch (err) {
      console.log(err)
    }
  };

  const editTask = async (e) => {
    e.preventDefault();

    if (data.title.trim() === "") {
      setErrorMessage("Please Enter a Task Title");
      return;
    }

    try {
      await updateData(task.id, data).then((res) => {
        setIsModalOpen(false)
        fetchTasks();
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{isEdit ? "Edit Task" : "Add New Task"}</h3>
          <XMarkIcon className="cross-icon" onClick={() => setIsModalOpen(false)} />
        </div>
        <form>
          <label className="label mt-3">Title</label>
          <input 
            required
            name="title"
            id="title"
            type="text" 
            placeholder="Please Enter Your Task Title"
            value={data.title}
            onChange={handleChange}
          />
          <label className="label">Urgency</label>
          <input
            required
            name="urgency"
            id="urgency"
            type="range"
            min="1"
            max="5"
            value={data.urgency}
            onChange={handleChange}
          />
          <input 
            type="submit" 
            className="submit mt-2" 
            onClick={isEdit ? editTask : addTask} 
            value={isEdit ? "Save Task" : "Add Task"}/>
            {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}

export default Modal;
