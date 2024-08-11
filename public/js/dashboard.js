document.querySelector("#new-post").addEventListener("click", () => {
  document.querySelector("#post-form").style.display = "block";
});

document.querySelector("#save-post").addEventListener("click", async () => {
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();

  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
});

document.querySelectorAll(".edit-post").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.getAttribute("data-id");
    const title = prompt("Enter new title");
    const content = prompt("Enter new content");

    if (title && content) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update post");
      }
    }
  });
});

document.querySelectorAll(".delete-post").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.getAttribute("data-id");

    const response = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  });
});
