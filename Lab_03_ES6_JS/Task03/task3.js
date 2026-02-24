function fetchUsers() {
  return new Promise((resolve, reject) => {
    const success = true; // toggle for testing
    setTimeout(() => {
      if (success) {
        resolve([
          { id: 1, name: "Aliza Khan Zaman" },
          { id: 2, name: "Urwa Kashaf" },
          { id: 3, name: "Sarosh Majeed" }
        ]);
      } else {
        reject("Failed to load users.");
      }
    }, 3000);
  });
}

const container = document.getElementById("user-container");

fetchUsers()
  .then(users => {
    container.innerHTML = users.map(u => `
      <div class="user-card">
        <h2>${u.name}</h2>
        <p>ID: ${u.id}</p>
      </div>
    `).join("");
  })
  .catch(error => {
    container.innerHTML = `<p style="color:red;">${error}</p>`;
  });
