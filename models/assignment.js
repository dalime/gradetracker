const db = require('../config/db.js');
const squel = require('squel').useFlavour('mysql');
const uuid = require('uuid');

db.query(`CREATE TABLE IF NOT EXISTS assignments (
    id VARCHAR(50),
    name VARCHAR(100),
    total INT,
    score INT
  )`, err => {
    if(err) {
      console.log('Error creating table:', err);
    }
  });

// Get All
exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('assignments').toString();

    db.query(sql, (err, assignments) => {
      if(err) {
        reject(err);
      } else {
        for (var i = 0; i < assignments.length; i++) {
          if (assignments[i].score >= 90) {
            assignments[i]["grade"] = "A";
          } else if (assignments[i]).score >= 80) {
            assignments[i]["grade"] = "B";
          } else if (assignments[i]).score >= 70) {
            assignments[i]["grade"] = "C";
          } else if (assignments[i]).score >= 60) {
            assignments[i]["grade"] = "D";
          } else {
            assignments[i]["grade"] = "F";
          }
        }
        resolve(assignments);
      }
    });
  });
};

// Get One
exports.getOne = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.select()
                   .from('assignments')
                   .where('id = ?', id)
                   .toString();

    db.query(sql, (err, assignments) => {
      let assignment = assignments[0];

      if(err) {
        reject(err);
      } else if(!assignment) {
        reject({error: 'Assignment not found.'})
      } else {
        resolve(assignment);
      }
    });
  });
};

// Create
exports.create = function(newAssignment) {
  return new Promise((resolve, reject) => {

    let sql = squel.insert()
                   .into('assignments')
                   .setFields(newAssignment)
                   .set('id', uuid())
                   .toString();
    db.query(sql, err => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Delete
exports.delete = function(id) {
  return new Promise((resolve, reject) => {
    let sql = squel.delete()
                   .from('assignments')
                   .where('id = ?', id)
                   .toString();

    db.query(sql, (err, result) => {
      if(result.affectedRows === 0) {
        reject({error: 'Assignment not found.'})
      } else if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Update
exports.update = function(id, updateObject) {
  return new Promise((resolve, reject) => {
    delete updateObject.id;

    let sql = squel.update()
                   .table('assignments')
                   .setFields(updateObject)
                   .where('id = ?', id)
                   .toString();

    db.query(sql, (err, returnObject) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
