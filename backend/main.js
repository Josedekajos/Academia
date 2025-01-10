document.addEventListener('DOMContentLoaded', () => {
    const userGroups = [
        { name: 'Web Development', members: 45, icon: '💻' },
        { name: 'Data Science', members: 32, icon: '📊' },
        { name: 'Machine Learning', members: 28, icon: '🤖' }
    ];

    const suggestedGroups = [
        { name: 'Python Programming', members: 55, icon: '🐍' },
        { name: 'UI/UX Design', members: 40, icon: '🎨' },
        { name: 'Cybersecurity', members: 38, icon: '🔒' },
        { name: 'Mobile App Dev', members: 50, icon: '📱' }
    ];

    function renderGroups(groups, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = groups.map(group => `
            <div class="group-card">
                <div class="group-icon">${group.icon}</div>
                <h3>${group.name}</h3>
                <p>${group.members} members</p>
                <button onclick="joinGroup('${group.name}')">
                    ${containerId === 'joined-groups' ? 'View' : 'Join'}
                </button>
            </div>
        `).join('');
    }

    function joinGroup(groupName) {
        alert(`You are about to ${userGroups.some(g => g.name === groupName) ? 'view' : 'join'} ${groupName}`);
    }

    // Notification and Message Animations
    const notificationsBtn = document.getElementById('notifications-btn');
    const messagesBtn = document.getElementById('messages-btn');

    notificationsBtn.addEventListener('click', () => {
        notificationsBtn.classList.add('shake');
        setTimeout(() => notificationsBtn.classList.remove('shake'), 500);
    });

    messagesBtn.addEventListener('click', () => {
        messagesBtn.classList.add('bounce');
        setTimeout(() => messagesBtn.classList.remove('bounce'), 500);
    });

    // Initial render
    renderGroups(userGroups, 'joined-groups');
    renderGroups(suggestedGroups, 'suggestion-groups');
});

// Additional CSS for button animations
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
    .shake { animation: shake 0.5s; }
    .bounce { animation: bounce 0.5s; }
`;
document.head.appendChild(style);