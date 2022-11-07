const fs = require("fs");
const express = require("express");
const { db } = require("../database");
const router = express.Router();
const isAuthenticated = require("../isAuthenticated");

const projectsFile = fs.readFileSync("projects_db.json").toString();
const projects = projectsFile ? JSON.parse(projectsFile).projects : [];

router.post("/", isAuthenticated, async function (req, res) {
  try {
    let newProject = `INSERT INTO projects(owner_id, name, type, grid_colors) VALUES (?,?,?,?)`;
    db.run(
      newProject,
      [req.session.user.id, req.body.name, req.body.type, req.body.grid_colors],
      () => {
        res.status(200).send();
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get(
  "/",
  express.urlencoded({ extended: false }),
  async function (req, res) {
    db.get("SELECT * FROM projects WHERE owner_id = ?", req.body.owner_id);
  }
);

router
  .route("/:id")
  .get(express.urlencoded({ extended: false }), async (req, res) => {
    db.get("SELECT * FROM projects WHERE name = ?", req.body.name);

    console.log("get this project");
  })
  .put(express.urlencoded({ extended: false }), async (req, res) => {
    db.get("SELECT * FROM projects WHERE name = ?", req.body.name);
    console.log("update this project");
  })
  .delete(express.urlencoded({ extended: false }), async (req, res) => {
    db.get("SELECT * FROM projects WHERE name = ?", req.body.name);
    console.log("delete this project");
  });

module.exports = router;
