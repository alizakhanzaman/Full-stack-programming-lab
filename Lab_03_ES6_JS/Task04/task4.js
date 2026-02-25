// Create Set to store unique courses
const registeredCourses = new Set();

function addCourse() {
    const input = document.getElementById("courseInput");
    const message = document.getElementById("message");
    const courseName = input.value.trim();

    if (courseName === "") {
        message.style.color = "yellow";
        message.textContent = "Please enter a course name.";
        return;
    }

    // Check duplicate
    if (registeredCourses.has(courseName)) {
        message.style.color = "#ab3b3b";
        message.textContent = "Course already registered!";
    } else {
        registeredCourses.add(courseName);
        message.style.color = "#00ffcc";
        message.textContent = "Course added successfully.";
    }

    input.value = "";
    displayCourses();
}

// Display courses using for...of
function displayCourses() {
    const courseList = document.getElementById("courseList");
    const totalCourses = document.getElementById("totalCourses");

    courseList.innerHTML = "";

    for (let course of registeredCourses) {
        const li = document.createElement("li");
        li.textContent = course;
        courseList.appendChild(li);
    }

    totalCourses.textContent = registeredCourses.size;
}