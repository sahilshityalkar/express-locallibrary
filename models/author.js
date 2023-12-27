// const { DateTime } = require("luxon");
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema
// const AuthorSchema = new Schema({
//     first_name: {type:String,require:true,maxLength:100},
//     family_name:{type:String,require:true,maxLength:100},
//     date_of_birth:{type:Date},
//     date_of_death:{type:Date},
// })

// // virtual for auther's full name 

// AuthorSchema.virtual("name").get(function(){
//     let fullname = "";
//     if (this.first_name && this.family_name){
//         fullname = `${this.family_name},${this.first_name}`
//     }
//     return fullname;
// })

// AuthorSchema.virtual("uri").get(function(){
//     return `/catalog/author/${this._id}`
// })
// // AuthorSchema.virtual("date_of_birth_formatted").get(function(){
// //     return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : ''; 
// // })
// // AuthorSchema.virtual("date_of_death_formatted").get(function(){
// //     return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : ''; 
// // })
// AuthorSchema.virtual("dates_formatted").get(function(){
//     const formattedBirthDate = this.date_of_birth ? `Birth: ${DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)}` : '';
//     const formattedDeathDate = this.date_of_death ? `Death: ${DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)}` : '';
    
//     return `${formattedBirthDate}${formattedBirthDate && formattedDeathDate ? ' | ' : ''}${formattedDeathDate}`;
// });

// module.exports = mongoose.model("Author",AuthorSchema)

const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxLength: 100 },
  family_name: { type: String, required: true, maxLength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function () {
  // To avoid errors in cases where an author does not have either a family name or first name
  // We want to make sure we handle the exception by returning an empty string for that case
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.first_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/author/${this._id}`;
});

AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth? DateTime.fromJSDate(this.date_of_birth).toISODate(DateTime.DATE_MED):"NA";
});

AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death? DateTime.fromJSDate(this.date_of_death).toISODate(DateTime.DATE_MED):"NA";
});

// Export model
module.exports = mongoose.model("Author", AuthorSchema);