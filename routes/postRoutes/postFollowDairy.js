const postFollowDairy = async (req,res,diaryModel, userModel) => {
    if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }

    await diaryModel.updateOne({'_id' : req.body.diary_id , 'followers.user_id' : {'$ne' : req.user.id}},{
        '$push' : {
            'followers' : {
                user_id : req.user.id,
                name : req.user.username
            }
        }
        })
    await userModel.updateOne({'_id' : req.user.id , 'following.diary_id' : {'$ne' : req.body.diary_id}} , {
        '$push' : {
            'following' : {
                diary_name : req.body.diary_name,
                diary_id : req.body.diary_id
            }
        }
    })
    res.redirect("/myDiaries")
}

module.exports = postFollowDairy;