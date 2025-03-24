document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    const userData = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        role: document.getElementById("role").value
    };

    try {
        const res = await fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

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
