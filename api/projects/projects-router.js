// Write your "projects" router here!

const express = require("express");
const projectModel = require("./projects-model");

const router = express.Router();

router.get("/", (req, res) => {
  projectModel
  .get(req.id)
  .then((e) => {
    res.status(200).json(e);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "err" });
  });
});

router.get("/projects/:id", (req, res) => {
  projectModel
  .get(req.params.id)
  .then((e) => {
    res.status(200).json(e);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "err getting project" });
  });
});

router.get("/projects/:id", (req, res) => {
  projectModel
  .get(ProjectActions(req.params.id))
  .then((e) => {
    res.status(200).json(e);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({ message: "err, couldnt retrieve project" });
  });
});


router.post("/", (req, res) => {
  const projectInfo = req.body;
  projectModel.insert(projectInfo).then((project) => {
    res.status(201).json(project);
  })
  .catch((err) => {
    res.status(500).json(err)
  })
});

router.put("/:id", (req, res) => {
  const projectInfo = req.body;
  const { id } = req.params;
  projectModel
  .update(id, projectInfo)
  .then((project) => {
    res.status(200).json(project)
  })
  .catch((err) => {
    res.status(500).json(err)
  })
  // .then((project) => {
  //     if (project) {
  //       res.status(200).json([{ message: "project updated" }, project]);
  //     } else {
  //       res.status(404).json({ message: "project wasn't upedate" });
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ err: "err during show update" });
  //   });
});

router.delete("/:id", (req, res) => {
  projectModel
    .remove(req.params.id)
    .then((project) => {
      if (project > 0) {
        res.status(200).json({ message: `"project", ${project}, "deleted"` });
      } else {
        res.status(404).json({ message: "project not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "err" });
    });
});

module.exports = router;
