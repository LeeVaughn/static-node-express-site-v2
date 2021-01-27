const express = require("express");
const router = express.Router();
const data = require("../data/data.json");
// same as projects = data.projects
const { projects } = data;

// GET root route
router.get("/", (req, res) => {
  res.render("index", { projects });
});

// GET about route
router.get("/about", (req, res) => {
  res.render("about");
});

// GET about route
router.get("/project/:id", (req, res, next) => {
  const id = req.params.id

  if (projects[id]) {
    res.render("project", { projects, id });
  } else {
    const err = new Error();
    err.status = 404;
    err.message = "Looks like the project you requested doesn't exist";
    next(err);
  }
});

module.exports = router;
