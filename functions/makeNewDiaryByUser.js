module.exports=function(user,diaryName,content,userModel,PageModel,DiaryModel) {
    let diary1 = new DiaryModel({
        owner_id: user._id,
        name: diaryName,
        isPrivate: true
    });
    return diary1.save(function (err, diary) {
        if (err) {
            console.log(err);
        } else {
            let pg1 = new PageModel({
                owner_id: user._id,
                author_id: user._id,
                author_name : user.username,
                isPrivate: true,
                likes: 0,
                content: content,
                diary_id: diary._id
            });
            pg1.save(function (err, page) {
                if (err) {
                    console.log(err);
                } else {
                    DiaryModel.updateOne({'_id': diary._id}, {"$push": {page_ids: {page_id: page._id, created_on: Date.now()}}},
                        function (err) {
                            if (err)
                                console.log(err);
                        });
                    userModel.updateOne({'_id': user._id}, {"$push": {myDiaries: {diary_id: diary._id, diary_name : diary.name}}},
                        function (err) {
                            if (err)
                                console.log(err);
                        });
                }
            });
            return diary._id;
        }
    });
}
