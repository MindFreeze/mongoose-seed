# mongoose-seed
A simple nodejs module to seed a mongooseJs managed mongodb database

Example use as gulp task:
```javascript
var seed = require('mongoose-seed');
var collections = [{
    model: path.join(__dirname, 'models', 'user'), // can also be the required Object
    data: [{ // array of docs
        _id: '55dabd3ef0b6187243e6c718',
        username: 'test',
        role: 'admin',
    }],
}];
gulp.task('seed', function(cb) {
    mongoose.connect(config.mongo, function(err) {
        err ? cb(err) : seed(collections, cb);
    });
});
```

Creates or updates documents in mongodb. If an _id is provided, it searches for the document and updates it. If no _id is given or the doc is not found, it inserts it.
