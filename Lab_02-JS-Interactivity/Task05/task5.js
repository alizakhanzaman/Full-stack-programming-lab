function validateForm() 
{

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let age = parseInt(document.getElementById("age").value);
    let password = document.getElementById("password").value;

    let valid = true;

    // Clear previous messages
    document.getElementById("nameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("ageError").innerText = "";
    document.getElementById("passError").innerText = "";
    document.getElementById("successMessage").innerText = "";

    // Name Validation
    if (name === "") {
        document.getElementById("nameError").innerText = "Name cannot be empty";
        valid = false;
    }

    // Email Validation
    if (!email.includes("@")) {
        document.getElementById("emailError").innerText = "Email must contain @";
        valid = false;
    }

    // Age Validation
    if (isNaN(age) || age < 18 || age > 60) {
        document.getElementById("ageError").innerText = "Age must be between 18 and 60";
        valid = false;
    }

    // Password Validation
    if (password.length < 6) {
        document.getElementById("passError").innerText = "Password must be at least 6 characters";
        valid = false;
    }

    // If all valid
    if (valid) {

        let confirmation = confirm("Do you want to submit the form?");

        if (confirmation) {

            document.getElementById("successMessage").innerText =
                "Registration Successful! 🎉";

            alert("Welcome " + name + "! Your account has been created successfully.");

            let feedback = prompt("How did you hear about us?");
            console.log("User Feedback:", feedback);
        }
    }
}

