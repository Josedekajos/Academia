import React from 'react';
import NavHeader from '../components/NavHeader';
import './Dashboard.css';

const Dashboard = () => {
  const mockData = {
    user: {
      name: 'John Doe',
      avatar: '👤',
      groupsCount: 5
    },
    notifications: [
      { id: 1, message: 'New message in Math Study Group', time: '2h ago' },
      { id: 2, message: 'Physics Quiz tomorrow', time: '3h ago' },
      { id: 3, message: 'Chemistry Group meeting at 5 PM', time: '5h ago' },
      { id: 4, message: 'New study material uploaded', time: '1d ago' },
      { id: 5, message: 'Biology Group invitation', time: '1d ago' }
    ],
    groups: [
      { id: 1, name: 'Math Study Group', members: 12 },
      { id: 2, name: 'Physics Group', members: 8 },
      { id: 3, name: 'Chemistry Study', members: 15 }
    ],
    tasks: {
      completed: [
        { id: 1, title: 'Complete Math Assignment' },
        { id: 2, title: 'Review Physics Notes' }
      ],
      uncompleted: [
        { id: 1, title: 'Prepare for Biology Test' },
        { id: 2, title: 'Submit Chemistry Lab Report' },
        { id: 3, title: 'Group Project Meeting' }
      ]
    }
  };

  return (
    <div className="dashboard">
      <NavHeader userInfo={mockData.user} />
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {mockData.user.name}</h1>
          <div className="stats">
            <div className="stat-item">
              <span className="stat-number">{mockData.user.groupsCount}</span>
              <span className="stat-label">Groups</span>
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <section className="notifications-section">
            <h2>Recent Notifications</h2>
            <div className="notifications-list">
              {mockData.notifications.map(notif => (
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
              {mockData.groups.map(group => (
                <div key={group.id} className="group-item">
                  <h3>{group.name}</h3>
                  <span>{group.members} members</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tasks-section">
            <h2>Tasks</h2>
            <div className="tasks-container">
              <div className="completed-tasks">
                <h3>Completed</h3>
                {mockData.tasks.completed.map(task => (
                  <div key={task.id} className="task-item completed">
                    <span>✓</span> {task.title}
                  </div>
                ))}
              </div>
              <div className="uncompleted-tasks">
                <h3>To Do</h3>
                {mockData.tasks.uncompleted.map(task => (
                  <div key={task.id} className="task-item">
                    <span>○</span> {task.title}
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