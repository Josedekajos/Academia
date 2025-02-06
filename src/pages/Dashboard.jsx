import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import axiosClient from '../axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [groups, setGroups] = useState([]);
  const [tasks, setTasks] = useState({ completed: [], uncompleted: [] });
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user || !token) {
      navigate('/');
      return;
    }

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
  }, []);

  const handleAddTask = async () => {
    if (newTask.trim()) {
      try {
        const response = await axiosClient.post('/tasks', {
          title: newTask
        });

        if (response.data) {
          setTasks(prev => ({
            ...prev,
            uncompleted: [...prev.uncompleted, response.data],
          }));
          setNewTask('');
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleTaskCheck = async (taskId, isCompleted) => {
    try {
      const response = await axiosClient.patch(`/tasks/${taskId}/toggle`);

      if (response.data) {
        setTasks(prev => {
          const sourceList = isCompleted ? prev.completed : prev.uncompleted;
          const targetList = isCompleted ? prev.uncompleted : prev.completed;
          const taskToMove = sourceList.find(task => task.id === taskId);

          if (!taskToMove) return prev;

          return {
            completed: isCompleted
                ? prev.completed.filter(task => task.id !== taskId)
                : [...prev.completed, taskToMove],
            uncompleted: isCompleted
                ? [...prev.uncompleted, taskToMove]
                : prev.uncompleted.filter(task => task.id !== taskId),
          };
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-200 text-xl"
        >
          Loading...
        </motion.div>
      </div>
  );

  if (error) return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-slate-200 text-xl"
        >
          Error: {error}
        </motion.div>
      </div>
  );

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-6">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-slate-100 mb-4"
            >
              Welcome back, {user?.first_name} {user?.last_name || 'User'}!
            </motion.h1>
            <p className="text-xl text-slate-300">
              You have {groups.length} Active Groups
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Notifications Section */}
            <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-700/30 backdrop-blur-lg rounded-lg p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Recent Notifications</h2>
              <div className="space-y-4">
                {notifications.map(notif => (
                    <motion.div
                        key={notif.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-slate-600/30 rounded-lg p-4"
                    >
                      <p className="text-slate-200">{notif.message}</p>
                      <span className="text-sm text-slate-400">{notif.time}</span>
                    </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Groups Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-700/30 backdrop-blur-lg rounded-lg p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Your Groups</h2>
              <div className="space-y-4">
                {groups.map(group => (
                    <motion.div
                        key={group.id}
                        whileHover={{ scale: 1.02 }}
                        className="bg-slate-600/30 rounded-lg p-4"
                    >
                      <h3 className="text-lg font-semibold text-slate-200">{group.name}</h3>
                      <span className="text-sm text-slate-400">{group.members} members</span>
                    </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Tasks Section */}
            <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-700/30 backdrop-blur-lg rounded-lg p-6 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-slate-100 mb-4">Your Tasks</h2>
              <div className="mb-4">
                <div className="flex gap-2">
                  <input
                      type="text"
                      placeholder="Add a new task"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                      className="flex-1 bg-slate-600/30 text-slate-100 placeholder-slate-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-opacity-50"
                  />
                  <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAddTask}
                      className="bg-slate-100 text-slate-800 px-4 py-2 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                  >
                    Add
                  </motion.button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">To Do</h3>
                  {tasks.uncompleted?.map(task => (
                      <motion.div
                          key={task.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-slate-600/30 rounded-lg p-4 mb-2 flex items-center gap-3"
                      >
                        <input
                            type="checkbox"
                            onChange={() => handleTaskCheck(task.id, false)}
                            className="w-4 h-4 accent-slate-300"
                        />
                        <span className="text-slate-200">{task.title}</span>
                      </motion.div>
                  ))}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">Completed</h3>
                  {tasks.completed?.map(task => (
                      <motion.div
                          key={task.id}
                          whileHover={{ scale: 1.02 }}
                          className="bg-slate-600/30 rounded-lg p-4 mb-2 flex items-center gap-3"
                      >
                        <input
                            type="checkbox"
                            checked
                            onChange={() => handleTaskCheck(task.id, true)}
                            className="w-4 h-4 accent-slate-300"
                        />
                        <span className="text-slate-400 line-through">{task.title}</span>
                      </motion.div>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>
        </motion.div>
      </div>
  );
};

export default Dashboard;