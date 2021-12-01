module.exports= async function(req,res,userModel){
    // console.log("from likes ",req.query)
    if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }
    await userModel.updateOne({
        _id : req.user.id,
        'bookmarks.page_id' : {'$ne' : req.query.pageId}
    }, {
        '$push' : {
            'bookmarks' : {
                'page_id' : req.query.pageId,
                'added_at' : Date.now(),
                'author_name' : req.query.authorName
            }
        }
    })
    res.send("added")
}

// postBookMark