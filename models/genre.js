
// const mongoose = require("mongoose")
// const Schema = mongoose.Schema
// const GenreSchema = new Schema({
//     name :{type:String,required:true,minLength:3,maxLength:100}
// })
// GenreSchema.virtual("uri").get(function(){
//     return `catalog/Genre/${this._id}`
// })
// module.exports = mongoose.model("Genre",GenreSchema)

const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const Genre = new Schema({
    name: { type: String, required: true,minLength: 3 , maxLength: 100 }, // reference to the associated book
 
  });
  
  
 Genre.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/genre/${this._id}`;
  });
  
  
  module.exports = mongoose.model("Genre", Genre);