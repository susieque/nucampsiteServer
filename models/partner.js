const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogPostSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const partnerSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: false,
		},
		featured: {
			type: Boolean,
			default: false,
		},
		description: {
			type: String,
			required: true,
		},
		// blogPosts: [blogPostSchema],
	},
	{
		timestamps: true,
	}
);
const Partner = mongoose.model('Partner', partnerSchema);
module.exports = Partner;
