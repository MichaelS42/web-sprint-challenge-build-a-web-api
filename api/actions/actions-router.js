// Write your "actions" router here!
const express = require("express");
const actionModel = require("./actions-model");

const router = express.Router();

router.get("/", (req, res) => {
  actionModel
    .get(req.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "err getting actions" });
    });
});
router.get("/:id", (req, res) => {
  actionModel
    .get(req.params.id)
    .then((e) => {
      res.status(200).json(e);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "err gettin' actions" });
    });
});

router.post("/", (req, res) => {
  const actionInfo = req.body;
  actionModel
    .insert(actionInfo)
    .then((action) => {
      res.status(201).json([{ message: "new action generated" }, action]);
    })
    .catch((err) => {
      res.status(500).json({ err, err: "err during action creation" });
    });
});

router.put("/:id", (req, res) => {
  const actionInfoChange = req.body;
  const { id } = req.params;
  actionModel
    .update(id, actionInfoChange)
    .then((action) => {
      if (action) {
        res.status(300).json([{ message: "actions updated" }, action]);
      } else {
        res.status(404).json({ err: "action was not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: "err updating the action" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  actionModel.remove(id).then((action) => {
    if (action > 0) {
      res.status(200).json([{ message: "action deleted" }, action]);
    }
  });
});

module.exports = router;
