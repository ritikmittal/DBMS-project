module.exports=function(req,res,pageModel){
	if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }
    console.log("from likes",req.query)
    require(__dirname + "/../../functions/likeThePost.js")(req.query.pageId,req.user,pageModel).then(() => {
        res.send("success")
    }).catch(err => {
        res.send(err);
    })
}