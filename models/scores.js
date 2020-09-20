const mongoose = require('mongoose');// require mongoose
const Schema = mongoose.Schema; // create a shorthand for the mongoose Schema constructor

// create a new Schema
// This will define the shape of the documents in the collection
// https://mongoosejs.com/docs/guide.html
const ScoreSchema = new Schema({
  usrname:  {type:String,required:true},
  oppname:  {type:String,required:true},
  date:     {type: String,required:true},
  usrscore: {type:Number,required:true},
  oppscore: {type:Number,required:true},
  usrhdcp:  {type:Number,required:true},
  opphdcp:  {type:Number,required:true},
  rndnotes: String
}, {timestamps: true});

const score = mongoose.model('score', ScoreSchema);  //('hotel', ScoreSchema); 'hotel' is the DB name in the db

//make this exportable to be accessed in `app.js`
module.exports = score;
