const API = "/users";

function loadUsers() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("userList");
            list.innerHTML = "";
            data.forEach(user => {
                list.innerHTML += `
                    <li>
                        ${user.name} - ${user.email}
                        <button onclick="deleteUser(${user.id})">Delete</button>
                    </li>
                `;
            });
        });
}

function addUser() {
    fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value
        })
    }).then(() => loadUsers());
}

function deleteUser(id) {
    fetch(`/users/${id}`, { method: "DELETE" })
        .then(() => loadUsers());
}

loadUsers();