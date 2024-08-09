const router = require("express").Router();

// Import routes
const userRoutes = require("./api/userRoutes");
const postRoutes = require("./api/postRoutes");
const commentRoutes = require("./api/commentRoutes");

// Use routes
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
