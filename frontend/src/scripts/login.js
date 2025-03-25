document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role); // Store user role for RBAC
            alert("Login Successful!");

            // Redirect based on role
            if (data.role === "admin") window.location.href = "../pages/admin.html";
            else if (data.role === "doctor") window.location.href = "../pages/doctor.html";
            else if (data.role === "receptionist") window.location.href = "../pages/receptionist.html";
            else window.location.href = "../pages/patient.html"; // Default for patients
        } else {
            alert("Login Failed: " + data.message);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("Something went wrong!");
    }
});
