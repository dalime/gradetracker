const squel = require('squel').useFlavour('mysql');
const uuid = require('uuid');
const moment = require('moment');
const connection = require('../config/db');

connection.query(`create table if not exists assignments (
    id varchar(50),
    name varchar(100),
    total int,
    score int,
  )`, err => {
    if(err) {
      console.log('Error creating table:', err);
    }
  });

// Get All
exports.getAll = function() {
  return new Promise((resolve, reject) => {
    let sql = squel.select().from('assignments').toString();

    connection.query(sql, (err, assignments) => {
      if(err) {
        reject(err);
      } else {
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

    connection.query(sql, (err, assignments) => {
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
    let timestamp = moment().format('YYYY/MM/DD HH:mm:ss');

    let sql = squel.insert()
                   .into('assignments')
                   .setFields(newAssignment)
                   .set('id', uuid())
                   .toString();
    connection.query(sql, err => {
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

    connection.query(sql, (err, result) => {
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

    connection.query(sql, (err, returnObject) => {
      if(err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
