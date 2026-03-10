import './App.css';

function StudentCard({ name, rollNo, department, university, color }) {
  return (
    <div className="student-card" style={{ background: color }}>
      <div className="card-avatar">
        {name.split(' ').map(n => n[0]).join('').toUpperCase()}
      </div>
      <h2 className="card-name">{name}</h2>
      <p className="card-rollno">Roll No: {rollNo}</p>
      <hr className="card-divider" />
      <p className="card-info">🏛️ <strong>Department:</strong> {department}</p>
      <p className="card-info">🎓 <strong>University:</strong> {university}</p>
    </div>
  );
}

function App() {
  const students = [
    { name: 'Aliza Zamann',     rollNo: '211610', department: 'Software Engineering', university: 'Air University', color: 'linear-gradient(135deg, #667eea, #764ba2)' },
    { name: 'Sarosh Majeed',  rollNo: '211621', department: 'AI & Machine Learning', university: 'Air University', color: 'linear-gradient(135deg, #f093fb, #f5576c)' },
    { name: 'Yumna Khan',     rollNo: '211635', department: 'Cyber Security',        university: 'Air University', color: 'linear-gradient(135deg, #4facfe, #00f2fe)' },
  ];

  return (
    <div className="app">
      <h1>🎓 Student Information Cards</h1>
      <h2 className="subtitle">Air University - BSSE-VI-B</h2>
      <div className="card-container">
        {students.map((s, i) => (
          <StudentCard key={i} {...s} />
        ))}
      </div>
    </div>
  );
}

export default App;