class Student {
  constructor(id, name, semester, courses) {
    this.id = id;
    this.name = name;
    this.semester = semester;
    this.courses = courses;
  }

  getRow() {
    return `
      <tr>
        <td>${this.id}</td>
        <td>${this.name}</td>
        <td>${this.semester}</td>
        <td>${this.courses.join(", ")}</td>
      </tr>
    `;
  }
}

const students = [
  new Student(1, "Aliza Khan Zaman", "Spring 2026", ["Computer Science", "Gen-AI", "Full Stack Development"]),
  new Student(2, "Urwa Kashaf", "Fall 2025", ["Software Project Management", "Software Requirements Engineering"]),
  new Student(3, "Sarosh Majeed", "Summer 2026", ["Mobile App Development", "Statistics"])
];

document.getElementById("student-body").innerHTML = students.map(s => s.getRow()).join("");
