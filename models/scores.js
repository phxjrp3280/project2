const mongoose = require('mongoose');// require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// https://mongoosejs.com/docs/guide.html
const ScoreSchema = new Schema({
  usrname     : String,
  oppname     : String,
  roundDetail : [ { date: Date,
                    usrscore: Number,
                    oppscore: Number,
                    usrhdcp:  Number,
                    opphdcp:  Number,
                    rndnotes: String} ]
}, {timestamps: true});

const score = mongoose.model('score', ScoreSchema);  //('hotel', HotelSchema); 'hotel' is the DB name in the db

//make this exportable to be accessed in `app.js`
module.exports = score;
