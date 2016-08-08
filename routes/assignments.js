const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment.js');

// Get All
router.get('/', (req, res) => {
  Assignment.getAll()
    .then(assignments => {
      let totalTotals = 0;
      let totalScores = 0;
      for (let i = 0; i < assignments.length; i++) {
        totalTotals += assignments[i].total;
        totalScores += assignments[i].score;
        if (assignments[i].score / assignments[i].total >= 0.9) {
          assignments[i]["grade"] = "A";
        } else if (assignments[i].score / assignments[i].total >= 0.8 && assignments[i].score / assignments[i].total < 0.9) {
          assignments[i]["grade"] = "B";
        } else if (assignments[i].score / assignments[i].total >= 0.7 && assignments[i].score / assignments[i].total < 0.8) {
          assignments[i]["grade"] = "C";
        } else if (assignments[i].score / assignments[i].total >= 0.6 && assignments[i].score / assignments[i].total < 0.7) {
          assignments[i]["grade"] = "D";
        } else {
          assignments[i]["grade"] = "F";
        }
      }

      res.send(assignments, `Total Scores = ${totalScores}`, `Total totals = ${totalTotals}`);
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
