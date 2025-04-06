document.getElementById("role").addEventListener("change", function() {
    const patientFields = document.getElementById("patientFields");
    patientFields.style.display = this.value === "patient" ? "block" : "none";
});

document.getElementById("registerForm").addEventListener("submit", async (e)=> {
    e.preventDefault();
    
    const userData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };
    if (userData.role === "patient") {
        userData.patientDetails = {
            name: document.getElementById("name").value.trim(),
            age: parseInt(document.getElementById("age").value),
            gender: document.getElementById("gender").value,
            contactNumber: document.getElementById("contactNumber").value.trim(),
            email: document.getElementById("email").value.trim(),
            address: document.getElementById("address").value.trim(),
            bloodGroup: document.getElementById("bloodGroup").value,
            disease: document.getElementById("disease").value.trim()
        };
    }
    console.log("Sending Registration Data:", JSON.stringify(userData));
    try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        console.log("Response Data:", data);
        if (res.ok) {
            alert("Registration successful! Please login.");
            const userId = data.user._id;
            const role = data.user.role;
            // If doctor, redirect to doctor registration page
            if (role === "doctor") {
                window.location.href = `../pages/doctorRegistration.html?userId=${userId}`;
            } else {
                window.location.href = "../pages/login.html"; // Other users go to login
            }
            // window.location.href = "../pages/login.html";
        } else {
            alert("Error during registration: " + (data.error || "Unknown error"));
            console.error("Registration error:", data);
        }
    } catch (err) {
        console.error("Error:", err);
       console.log( err.message );
       alert("An error occurred. Please try again.");
    }
});
