// Sample users array
const users = [
    { licenseNumber: "123456", password: "123123" },
    { licenseNumber: "789012", password: "securePass" },
    { licenseNumber: "345678", password: "pass789" },
    { licenseNumber: "987654", password: "myPassword" },
    { licenseNumber: "112233", password: "admin123" }
];

// Function to check if the user is in the list and the password is correct
function validateUser(licenseNumber, password) {
    // Find the user with the matching license number
    const user = users.find(user => user.licenseNumber === licenseNumber);
    
    // If user exists and the password matches, return true
    if (user && user.password === password) {
        return true;
    }
    
    // Otherwise, return false
    return false;
}

// Function to handle the form submission
function handleLogin(event) {
    event.preventDefault(); // Prevent form submission

    const licenseNumber = document.getElementById('licenseNumber').value;
    const password = document.getElementById('password').value;

    // Check if the user is valid
    if (validateUser(licenseNumber, password)) {
        // If valid, redirect to the next page (replace 'fingerPrint.html' with your actual page)
        window.location.href = "fingerPrint.html";
    } else {
        // If invalid, show an error message
        alert("Error: The user does not exist or the password is incorrect.");
    }
}

// Function to clear form fields on page load
function clearForm() {
    document.getElementById('licenseNumber').value = '';
    document.getElementById('password').value = '';
}

// Add event listener to the login form
document.getElementById('loginForm').addEventListener('submit', handleLogin);

// Clear form fields when page loads
window.onload = clearForm;
