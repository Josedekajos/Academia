import { useState, useEffect } from 'react';
import NavHeader from '../components/NavHeader';
import './Dashboard.css';
import axiosClient from '../axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
 
  const navigate = useNavigate();

  // State for dynamic data
  const [notifications, setNotifications] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState({ completed: [], uncompleted: [] });
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {

     // Retrieve user from localStorage
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!storedUser || !token) {
      navigate('/');
    }

    console.log(storedUser);

      // Check if storedUser is valid before parsing
    const user = storedUser ? JSON.parse(storedUser) : null;

    setUser(user);

    const fetchData = async () => {
      try {
        const [notifRes, groupsRes, tasksRes] = await Promise.all([
          axiosClient.get('/notifications'),
          axiosClient.get('/groups'),
          axiosClient.get('/tasks'),
        ]);
        
        setNotifications(notifRes.data);
        setGroups(groupsRes.data);
        setTasks(tasksRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  // Function to add a new task
  const handleAddTask = async () => {
    if (newTask.trim()) {
      const newTaskObj = { title: newTask };

      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTaskObj),
        });

        if (!response.ok) throw new Error('Failed to add task');

        const addedTask = await response.json();
        setTasks(prev => ({
          ...prev,
          uncompleted: [...prev.uncompleted, addedTask],
        }));

        setNewTask('');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Function to toggle task completion
  const handleTaskCheck = async (taskId, isCompleted) => {
    try {
      const response = await fetch(`/api/tasks/${taskId}/toggle`, { method: 'PATCH' });

      if (!response.ok) throw new Error('Failed to update task');

      setTasks(prev => {
        const taskToMove = isCompleted
          ? prev.completed.find(task => task.id === taskId)
          : prev.uncompleted.find(task => task.id === taskId);

        return {
          ...prev,
          completed: isCompleted
            ? prev.completed.filter(task => task.id !== taskId)
            : [...prev.completed, taskToMove],
          uncompleted: isCompleted
            ? [...prev.uncompleted, taskToMove]
            : prev.uncompleted.filter(task => task.id !== taskId),
        };
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="dashboard">
      <NavHeader userInfo={user} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.first_name + ' ' + user?.last_name || 'User'}!</h1>
          <div className="groups-count">
            <span>{groups.length} Groups</span>
          </div>
        </div>

        <div className="dashboard-row">
          {/* Notifications */}
          <section className="notifications-section">
            <h2>Recent Notifications</h2>
            <div className="notifications-list">
              {notifications.map(notif => (
                <div key={notif.id} className="notification-item">
                  <p>{notif.message}</p>
                  <span>{notif.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Groups */}
          <section className="groups-section">
            <h2>Your Groups</h2>
            <div className="groups-list">
              {groups.map(group => (
                <div key={group.id} className="group-item">
                  <h3>{group.name}</h3>
                  <span>{group.members} members</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tasks */}
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
                {tasks.map(task => (
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
                {tasks.map(task => (
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