const mongoose=require("mongoose");

const diarySchema=new mongoose.Schema({
	owner_id : {
		type : String,
		required : true
	},
	page_ids:[{
		page_id: String,
		created_on : Date
	}],
	name : {
		type : String,
		required : true
	},
	followers : [{
		user_id : String,
		name : String,
		favicon_id : String
	}],
	numberOfFollowers: Number,
	access: [{
		user_id : String,
		user_name : String,
		startTime: Date,
		endTime: Date,
		isWrite: Boolean
	}],
	isPrivate : Boolean
});

module.exports = mongoose.model("dairy",diarySchema);