module.exports=async function(req,res,pageModel,diaryModel) {
    if (!req.isAuthenticated()) {
        res.redirect("/login");
    } else {
        const page = await pageModel.findById(req.body.pageId).exec();
        const diary = await diaryModel.findById(page.diary_id).exec();
        let isAccess = false;
        if (req.user._id == page.author_id) {
            isAccess = true;
        }
        for (let i = 0; i < diary.access.length; i++) {
            if (diary.access[i].user_id == req.user._id && diary.access[i].isWrite == true &&  diary.access[i].endTime>=Date.now()) {
                isAccess = true;
            }
        }
        if(!isAccess){
            res.render("404");
        }else{
            await pageModel.updateOne({_id: page._id}, {
                $set: {
                    author_name: req.user.username,
                    author_id: req.user._id,
                    content: req.body.content
                }
            }).exec(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.redirect("getPage/" + page._id);
        }

    }
}