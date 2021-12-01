const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");


const userSchema=new mongoose.Schema({
	username : {
		type : String,
		required : true,
		unique : true
	},
	img_id : String,
	favicon_id : String,
	bio : String,
	friends : [{
		friend_id : String,
		name : String,
		favicon_id : String,
		messages : [{
			message: String,
			timeOfArrival : Date,
			isMe : Boolean,
		}]
	}],
	following : [{
		diary_name : String,
		diary_id: String
	}],
	myDiaries : [{
		diary_id: String,
		diary_name: String
	}],
	access: [{
		diary_id : String,
		diary_name: String,
		startTime: Date,
		endTime: Date,
		isWrite: Boolean
	}],
	notifications: [{
		notification: String,
		arrivalTime: Date
	}],
	bookmarks: [ {
		page_id: String,
		added_at : Date,
		author_name : String
	}]
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userSchema);

