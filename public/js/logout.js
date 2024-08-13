const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    // Successful logout
    document.location.replace("/");
  } else {
    alert("Failed to log out");
  }
};

document.querySelector("#logout")?.addEventListener("click", (event) => {
  event.preventDefault(); // Prevents the default navigation

  logout();
});
console.log("Logout clicked");
