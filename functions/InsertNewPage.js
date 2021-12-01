module.exports= function(req,diaryId,content,pageModel,diaryModel) {
    console.log("fuck",diaryId);
     diaryModel.findOne({'_id': diaryId},  function (err, diary) {
        if (err || !diary) {
            console.log("not dry",err);
        } else {
            // console.log(diary);
            let newPage = new pageModel({
                owner_id: diary.owner_id,
                author_id: req.user.id,
                author_name : req.user.username,
                isPrivate: diary.isPrivate,
                likes: 0,
                content: content,
                diary_id: diary._id
            });
             newPage.save( function (err, page) {
                if (err) {
                    console.log(err);
                } else {
                     diaryModel.updateOne({'_id': diary._id}, {"$push": {page_ids: {page_id:page._id, created_on : Date.now()}}},
                        function (err) {
                            if (err)
                                console.log(err);
                        });
                }
            });
        }
    });


}