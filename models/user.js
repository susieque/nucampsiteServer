const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose'); //username, password, hashing, salting the password
const Schema = mongoose.Schema;

const userSchema = new Schema({
	firstname: {
        type: String,
        default: ''
    },
    lastname: {
        type: String,
        default: ''
    },
    facbookId: String,
	admin: {
		type: Boolean,
		default: false
	}
});

userSchema.plugin(passportLocalMongoose); //provides additional authentication related methods on schema & model

module.exports = mongoose.model('User', userSchema);
