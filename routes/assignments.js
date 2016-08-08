const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment.js');

// Get All
router.get('/', (req, res) => {
  Assignment.getAll()
    .then(assignments => {
      let newAssignments = assignments;
      for (var i = 0; i < newAssignments.length; i++) {
        if (newAssignments[i].score >= 90) {
          newAssignments[i]["grade"] = "A";
        } else if (newAssignments[i]).score >= 80) {
          newAssignments[i]["grade"] = "B";
        } else if (newAssignments[i]).score >= 70) {
          newAssignments[i]["grade"] = "C";
        } else if (newAssignments[i]).score >= 60) {
          newAssignments[i]["grade"] = "D";
        } else {
          newAssignments[i]["grade"] = "F";
        }
      }
      res.send(newAssignments);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Get One
router.get('/:id', (req, res) => {
  Assignment.getOne(req.params.id)
    .then(assignment => {
      res.send(assignment);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Create
router.post('/', (req, res) => {
  Assignment.create(req.body)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Delete
router.delete('/:id', (req, res) => {
  Assignment.delete(req.params.id)
    .then(() => {
      res.send();
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Update
router.put('/:id', (req, res) => {
  Assignment.update(req.params.id, req.body)
    .then(() => {
      return Assignment.getOne(req.params.id);
    })
    .then(assignment => {
      res.send(assignment);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

module.exports = router;
