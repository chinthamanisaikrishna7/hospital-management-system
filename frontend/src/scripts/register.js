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

    try {
        const res = await fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });
        const data = await res.json();
        if (res.ok) {
            alert("Registration successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert("Error during registration.");
        }
    } catch (err) {
        console.error("Error:", err);
    }
});
