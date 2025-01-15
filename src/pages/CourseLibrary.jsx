import  { useState } from 'react';

const courses = [
  { title: "Introduction to Programming", preview: "Learn the basics of programming languages." },
  { title: "Web Development", preview: "Build websites using HTML, CSS, and JavaScript." },
  { title: "Data Structures", preview: "Understand how data is organized and manipulated." },
  { title: "Machine Learning", preview: "An introduction to AI and predictive modeling." },
  { title: "Cybersecurity", preview: "Learn to protect systems from cyber threats." },
  { title: "Mobile App Development", preview: "Create mobile applications for Android and iOS." },
  { title: "Game Development", preview: "Build interactive games with Unity and Unreal Engine." },
  { title: "Cloud Computing", preview: "Master cloud technologies and services." }
];

function CourseLibrary() {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [badge, setBadge] = useState('');

  const enrollCourse = (index) => {
    setCurrentCourse(courses[index]);
  };

  const leaveCourse = () => {
    setCurrentCourse(null);
    setBadge('');
  };

  const finishCourse = () => {
    setBadge(`Congratulations! You earned a badge for completing "${currentCourse.title}".`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="header mb-6">
        <h1 className="text-2xl text-purple-700">Course Library</h1>
      </div>

      {!currentCourse ? (
        <div className="courses-list flex flex-wrap gap-6">
          {courses.map((course, index) => (
            <div key={index} className="course bg-white rounded-lg shadow-md p-4 w-1/3">
              <h3 className="text-purple-700 mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.preview}</p>
              <button className="btn bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900" onClick={() => enrollCourse(index)}>Enroll</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="course-content bg-white p-6 rounded-lg shadow-md">
          <div className="course-content-header flex justify-between items-center mb-4">
            <h2 className="text-purple-700">{currentCourse.title}</h2>
            <button className="btn bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900" onClick={leaveCourse}>Leave Course</button>
          </div>
          <div className="notes mb-4 p-4 border border-gray-300 bg-gray-100 rounded">
            This is where the course content and notes will appear.
          </div>
          <button className="btn bg-purple-700 text-white py-2 px-4 rounded hover:bg-purple-900" onClick={finishCourse}>I have finished the course</button>
          {badge && <div className="badge text-purple-700 font-bold mt-4">{badge}</div>}
        </div>
      )}
    </div>
  );
}

export default CourseLibrary;