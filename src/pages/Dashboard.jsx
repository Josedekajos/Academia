import {useState} from 'react';
import NavHeader from '../components/NavHeader';
import './Dashboard.css';

const Dashboard = () => {
  const initialData = {
    user: {
      name: 'Imele Jose',
      avatar: '👨‍🎓',
      groupsCount: 5,
    },
    notifications: [
      { id: 1, message: 'New message in Math Study Group', time: '2h ago' },
      { id: 2, message: 'Physics Quiz tomorrow', time: '3h ago' },
      { id: 3, message: 'Chemistry Group meeting at 5 PM', time: '5h ago' },
      { id: 4, message: 'New study material uploaded', time: '1d ago' },
      { id: 5, message: 'Biology Group invitation', time: '1d ago' },
    ],
    groups: [
      { id: 1, name: 'Math Study Group', members: 12 },
      { id: 2, name: 'Physics Group', members: 8 },
      { id: 3, name: 'Chemistry Study', members: 15 },
    ],
    tasks: {
      completed: [
        { id: 1, title: 'Complete Math Assignment' },
        { id: 2, title: 'Review Physics Notes' },
      ],
      uncompleted: [
        { id: 1, title: 'Prepare for Biology Test' },
        { id: 2, title: 'Submit Chemistry Lab Report' },
        { id: 3, title: 'Group Project Meeting' },
      ],
    },
  };

  const [tasks, setTasks] = useState(initialData.tasks);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      const newTaskObj = { id: Date.now(), title: newTask };
      setTasks(prev => ({
        ...prev,
        uncompleted: [...prev.uncompleted, newTaskObj],
      }));
      setNewTask('');
    }
  };

  const handleTaskCheck = (taskId, isCompleted) => {
    if (isCompleted) {
      setTasks(prev => {
        const taskToMove = prev.completed.find(task => task.id === taskId);
        return {
          ...prev,
          completed: prev.completed.filter(task => task.id !== taskId),
          uncompleted: [...prev.uncompleted, taskToMove],
        };
      });
    } else {
      setTasks(prev => {
        const taskToMove = prev.uncompleted.find(task => task.id === taskId);
        return {
          ...prev,
          uncompleted: prev.uncompleted.filter(task => task.id !== taskId),
          completed: [...prev.completed, taskToMove],
        };
      });
    }
  };

  return (
    <div className="dashboard">
      <NavHeader userInfo={initialData.user} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {initialData.user.name}!</h1>
          <div className="groups-count">
            <span>{initialData.user.groupsCount} Groups</span>
          </div>
        </div>

        <div className="dashboard-row">
          <section className="notifications-section">
            <h2>Recent Notifications</h2>
            <div className="notifications-list">
              {initialData.notifications.map(notif => (
                <div key={notif.id} className="notification-item">
                  <p>{notif.message}</p>
                  <span>{notif.time}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="groups-section">
            <h2>Your Groups</h2>
            <div className="groups-list">
              {initialData.groups.map(group => (
                <div key={group.id} className="group-item">
                  <h3>{group.name}</h3>
                  <span>{group.members} members</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tasks-section">
            <h2>Your Tasks</h2>
            <div className="task-input">
              <input
                type="text"
                placeholder="Add a new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <button onClick={handleAddTask}>Add Task</button>
            </div>
            <div className="tasks-container">
              <div className="completed-tasks">
                <h3>Completed</h3>
                {tasks.completed.map(task => (
                  <div key={task.id} className="task-item completed">
                    <input
                      type="checkbox"
                      checked
                      onChange={() => handleTaskCheck(task.id, true)}
                    />
                    <span>{task.title}</span>
                  </div>
                ))}
              </div>
              <div className="uncompleted-tasks">
                <h3>To Do</h3>
                {tasks.uncompleted.map(task => (
                  <div key={task.id} className="task-item">
                    <input
                      type="checkbox"
                      onChange={() => handleTaskCheck(task.id, false)}
                    />
                    <span>{task.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
