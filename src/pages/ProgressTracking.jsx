const groups = [
  { name: "Math Study Group", members: 10 },
  { name: "Science Enthusiasts", members: 15 },
  { name: "Literature Lovers", members: 8 }
];

const lessonsCompleted = [
  { group: "Math Study Group", lessons: ["Algebra Basics", "Calculus Introduction"] },
  { group: "Science Enthusiasts", lessons: ["Physics Fundamentals", "Chemistry Basics"] },
  { group: "Literature Lovers", lessons: ["Classic Novels", "Modern Poetry"] }
];

const badgesEarned = [
  "Fast Learner",
  "Top Collaborator",
  "Quiz Champion",
  "Goal Achiever"
];

function ProgressTracking() {
  return (
    <div className="container mx-auto p-4">
      <div className="header flex justify-between items-center mb-8">
        <h1 className="text-2xl text-purple-700">Academia Dashboard</h1>
      </div>

      <div className="content mt-6">
        <h2 className="text-xl mb-4">Your Progress</h2>

        <div className="progress-section mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-purple-700 mb-4">Groups</h3>
          <ul className="list-none">
            {groups.map((group, index) => (
              <li key={index} className="mb-4 p-4 bg-gray-200 rounded">
                {group.name} - {group.members} members
              </li>
            ))}
          </ul>
        </div>

        <div className="progress-section mb-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-purple-700 mb-4">Lessons Completed</h3>
          <ul className="list-none">
            {lessonsCompleted.map((entry, index) => (
              <li key={index} className="mb-4 p-4 bg-gray-200 rounded">
                <strong>{entry.group}</strong>: {entry.lessons.join(", ")}
              </li>
            ))}
          </ul>
        </div>

        <div className="progress-section bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-purple-700 mb-4">Badges Earned</h3>
          <div>
            {badgesEarned.map((badge, index) => (
              <span key={index} className="badge inline-block py-2 px-4 m-1 bg-purple-700 text-white rounded-full text-sm">
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProgressTracking;