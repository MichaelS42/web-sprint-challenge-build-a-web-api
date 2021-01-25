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
router.get("/actions/:id", (req, res) => {
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
      res.status(201).json(action);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  const actionInfoChange = req.body;
  const { id } = req.params;
  actionModel
    .update(id, actionInfoChange)
    .then((action) => {
        res.status(200).json(action);
      })
    .catch((err) => {
      res.status(500).json(err);
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
