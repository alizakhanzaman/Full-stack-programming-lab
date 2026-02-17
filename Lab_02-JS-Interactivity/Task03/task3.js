function toggleTask(id, button)
{

    let task = document.getElementById(id);

    task.classList.toggle("completed");

    // Change button text dynamically
    if(task.classList.contains("completed")){
        button.innerText = "Undo";
    } else {
        button.innerText = "Done";
    }

    // Loop styling for all tasks (Requirement)
    let tasks = document.querySelectorAll(".task-card");

    tasks.forEach(t => {
        t.style.borderLeft = "6px solid #6f4e37";
    });
}

function removeTask(id)
{
    document.getElementById(id).style.display = "none";
}