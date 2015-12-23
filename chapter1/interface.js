/*
 *  Inserts "doc" into the collection "movies".
 */
exports.insert = function(db, doc, callback) {
    // TODO: implement
    db.collection('movies').insert(doc, function(err, movie) {
        if (err) {
          console.log(err);
          return callback(err);
        }
        console.log('movie  has been successfully created: ', JSON.stringify(movie);
          // callback(null);
          callback(movie);
        })
    };

    /*
     *  Finds all documents in the "movies" collection
     *  whose "director" field equals the given director,
     *  ordered by the movie's "title" field. See
     *  http://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html#sort
     */
    exports.byDirector = function(db, director, callback) {
        // TODO: implement
        db.collection('movies').find({
          director: director
        }).toArray(function(err, result) {
            if (err) {
              console.log('Finding error', err);
              return callback(err);
            }
            console.log('Result: ', JSON.stringify(result); callback(null, result);
            })
        };