const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    // Ensure title and content are being correctly received
    const { title, content } = req.body;
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
      return;
    }

    const newPost = await Post.create({
      title,
      content,
      user_id: req.session.user_id, // Ensure user_id is available
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res
      .status(400)
      .json({ message: "Failed to create post", error: err.message });
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id, // Ensure the post belongs to the logged-in user
        },
      }
    );

    if (!updatedPost) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
