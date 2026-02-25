// CLASS
class Student {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.courses = new Set(); // SET for unique courses
    }

    addCourse(course) {
        this.courses.add(course);
    }
}


// MAP TO STORE STUDENTS
const studentMap = new Map();


// ADD STUDENT

function addStudent() {
    const id = Number(document.getElementById("studentID").value);
    const name = document.getElementById("studentName").value;
    const message = document.getElementById("message");

    if (!id || !name) {
        message.textContent = "Please enter valid ID and Name.";
        return;
    }

    if (studentMap.has(id)) {
        message.textContent = "Student ID already exists!";
        return;
    }

    const student = new Student(id, name);
    studentMap.set(id, student);

    message.textContent = "Student added successfully!";
    displayStudents();
}


// REGISTER COURSE
function registerCourse() {
    const id = Number(document.getElementById("studentID").value);
    const course = document.getElementById("courseName").value;
    const message = document.getElementById("message");

    if (!studentMap.has(id)) {
        message.textContent = "Student not found!";
        return;
    }

    const student = studentMap.get(id);
    student.addCourse(course);

    message.textContent = "Course registered successfully!";
    displayStudents();
}

// DISPLAY STUDENTS
function displayStudents() {
    const grid = document.getElementById("studentGrid");
    grid.innerHTML = "";

    studentMap.forEach((student) => {
        const card = document.createElement("div");
        card.classList.add("student-card");

        let coursesHTML = "";
        for (let course of student.courses) { // for...of loop
            coursesHTML += `<span class="course-tag">${course}</span>`;
        }

        card.innerHTML = `
            <h3>${student.name}</h3>
            <p><strong>ID:</strong> ${student.id}</p>
            <div>${coursesHTML}</div>
        `;

        grid.appendChild(card);
    });
}


// PROMISE (Simulate Save)

function saveData() {
    const message = document.getElementById("message");

    const savePromise = new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data saved to server successfully!");
        }, 2000);
    });

    message.textContent = "Saving data...";

    savePromise.then((result) => {
        message.textContent = result;
    });
}