function loadStudents() {

    // Create 3 student objects
    const students = [
        { name: "Aliza", age: 20, semester: 4, courses: ["JavaScript", "HTML"] },
        { name: "Urwa", age: 23, semester: 6, courses: ["AI", "Database"] },
        { name: "Sarosh", age: 21, semester: 5, courses: ["C++", "OOP"] }
    ];

    // Convert objects to JSON string
    const jsonString = JSON.stringify(students, null, 2);

    // Convert JSON back to objects
    const parsedStudents = JSON.parse(jsonString);

    const studentOutput = document.getElementById("studentOutput");
    const jsonOutput = document.getElementById("jsonOutput");

    studentOutput.innerHTML = "";
    jsonOutput.textContent = jsonString;

    // Use destructuring + forEach loop
    parsedStudents.forEach(student => {

        const { name, age, semester, courses } = student;

        // Display using innerHTML
        let coursesHTML = "";
        courses.forEach(course => {
            coursesHTML += `<span class="course-tag">${course}</span>`;
        });

        studentOutput.innerHTML += `
            <div class="student-card">
                <h3>${name}</h3>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Semester:</strong> ${semester}</p>
                <div>${coursesHTML}</div>
            </div>
        `;
    });
}