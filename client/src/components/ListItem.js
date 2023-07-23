import { CheckCircleIcon } from '@heroicons/react/24/outline'
import UrgencyBar from "./UrgencyBar";
import { deleteData } from '../services/tasksApi';

function ListItem({ task, fetchTasks, openModal }) {

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");

    if (confirmDelete) {
      try {
        await deleteData(id).then((res) => {
          fetchTasks();
        });
      } catch (err) {
        console.log(err)
      }
    }
  };

  return (
    <div className="list-item">
      <div className="info-container">
        <CheckCircleIcon className="icon" />
        <p className="task-title">{task.title}</p>
        <UrgencyBar urgency={task.urgency}/>
      </div>
      <div className="button-container">
        <button className='edit' onClick={() => openModal(task)}>Edit</button>
        <button className='delete' onClick={() => deleteTask(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ListItem;
