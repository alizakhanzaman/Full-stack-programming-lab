import './App.css';

function CourseItem({ courseName, instructor, duration, courseType, icon }) {
  return (
    <div className="course-card">
      <span className={`badge ${courseType === 'Online' ? 'badge-online' : 'badge-offline'}`}>
        {courseType}
      </span>
      <div className="course-icon">{icon}</div>
      <h2 className="course-name">{courseName}</h2>
      <hr className="divider" />
      <p className="meta">👨‍🏫 <strong>Instructor:</strong> {instructor}</p>
      <p className="meta">⏱️ <strong>Duration:</strong> {duration}</p>
    </div>
  );
}

function App() {
  const courses = [
    { courseName: 'Full Stack Web Development', instructor: 'Mr. Sharif Hussain', duration: '16 Weeks', courseType: 'Offline', icon: '🌐' },
    { courseName: 'Machine Learning & AI',       instructor: 'Dr. Izaan Khan',    duration: '12 Weeks', courseType: 'Online',  icon: '🤖' },
    { courseName: 'Database Systems',            instructor: 'Mr. Usman Ali',      duration: '10 Weeks', courseType: 'Offline', icon: '🗄️' },
    { courseName: 'Cyber Security Fundamentals', instructor: 'Dr. Bilal Ahmed',    duration: '8 Weeks',  courseType: 'Online',  icon: '🔒' },
    { courseName: 'Mobile App Development',      instructor: 'Ms. Hina Malik',     duration: '14 Weeks', courseType: 'Online',  icon: '📱' },
  ];

  return (
    <div className="app">
      <h1>📚 Course Catalog</h1>
      <p className="subtitle">Explore available courses at Air University</p>
      <div className="course-grid">
        {courses.map((c, i) => (
          <CourseItem key={i} {...c} />
        ))}
      </div>
    </div>
  );
}

export default App;