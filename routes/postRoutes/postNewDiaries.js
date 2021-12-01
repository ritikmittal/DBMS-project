module.exports=async function(req,res,userModel,diaryModel,pageModel){
	if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }
    // await require(__dirname +"/../../functions/makeNewDiaryByUser.js")(req.user,req.body.diaryName,req.body.content,userModel,pageModel,diaryModel);
	let diary1 = new diaryModel({
        owner_id: req.user._id,
        name: req.body.diaryName,
        isPrivate: (req.body.isPrivate === 'on')
    });
    diary1.save((err, diary) => {
    	if(err) console.log("in adding dairy : ", err) 
    	else {
    		userModel.updateOne({'_id': req.user.id}, {"$push": {myDiaries: {diary_id: diary._id, diary_name : diary.name}}}).exec();
    	}
    });
    res.redirect("/compose");
};