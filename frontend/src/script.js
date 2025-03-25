// document.addEventListener("DOMContentLoaded", function () {
//     const registerForm = document.getElementById("registerForm");
//     const loginForm = document.getElementById("loginForm");

//     if (registerForm) {
//         registerForm.addEventListener("submit", async function (e) {
//             e.preventDefault();

//             const username = document.getElementById("regUsername").value;
//             const password = document.getElementById("regPassword").value;
//             const role = document.getElementById("regRole").value;

//             const response = await fetch("http://localhost:5000/api/auth/register", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, password, role })
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 alert("Registration successful! Please login.");
//                 window.location.href = "login.html";
//             } else {
//                 alert(result.message || "Registration failed");
//             }
//         });
//     }

//     if (loginForm) {
//         loginForm.addEventListener("submit", async function (e) {
//             e.preventDefault();

//             const username = document.getElementById("loginUsername").value;
//             const password = document.getElementById("loginPassword").value;

//             const response = await fetch("http://localhost:5000/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ username, password })
//             });

//             const result = await response.json();

//             if (response.ok) {
//                 alert("Login successful!");
//                 localStorage.setItem("userRole", result.role);
//                 redirectToDashboard(result.role);
//             } else {
//                 alert(result.message || "Login failed");
//             }
//         });
//     }
// });

// function redirectToDashboard(role) {
//     if (role === "admin") window.location.href = "admin_dashboard.html";
//     else if (role === "doctor") window.location.href = "doctor_dashboard.html";
//     else if (role === "patient") window.location.href = "patient_dashboard.html";
//     else if (role === "receptionist") window.location.href = "receptionist_dashboard.html";
// }
function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "./pages/login.html";
}
