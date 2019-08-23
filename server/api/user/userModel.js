var mongoose = require('mongoose');
var bcrypt = require ('bcrypt');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	email: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	},
	birthday: {
		type: Date,
		required: true,
	},
	hearAboutUs: {
		type: String,
		required: true
	},
	role: {
		type: String,
		required: true
	},
  firstName: {
		type: String,
		trim: true
	},
	middleName: {
		type: String,
		trim: true
	},
	lastName: {
		type: String,
		trim: true
	},
	address: {
		streetNumber: Number,
		streetName: String,
		city: String,
		state: String,
		zipCode:String,
		country: String
	},
	phone:{
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

// hash passowrd before saving to database
UserSchema.pre('save', function(next) {
	var user = this;
	if (user.password) {
		bcrypt.hash(user.password, 10, function(err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			next();
		})
	} else {
		return next(err);
	}
});

UserSchema.methods.comparePassword = function (password,hash) {
	return bcrypt.compareSync(password, hash)
}

module.exports = mongoose.model('user', UserSchema);
