'use strict';

var _ = require('lodash');
var async = require('async');

module.exports = function(collections, done) {
    if (typeof collections === 'string') {
        collections = require(collections);
    }
    var cbs = [];
    var error;
    _.each(collections, function(col) {
        var Model = col.model;
        if (!Model) {
            error = new Error('No model defined. Please specify an object or path.');
            return false;
        } else if (typeof Model === 'string') {
            Model = require(Model);
        }
        _.each(col.data, function(doc) {
            cbs.push(function(cb) {
                var q = doc._id ? {_id: doc._id} : doc;
                Model.findOne(q, function(err, realDoc) {
                    if (err) {
                        cb(err);
                    } else {
                        if (realDoc) {
                            realDoc.set(doc);
                        } else {
                            realDoc = new Model(doc);
                        }
                        realDoc.save(cb);
                    }
                });
            });
        });
    });
    error ? done(error) : async.parallel(cbs, done);
};
