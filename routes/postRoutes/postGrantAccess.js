// postGrantAccess.js
module.exports = async (req,res, userModel,diaryModel ) => {
    if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }
    console.log(req.body);
    const friend_id = req.body.friend_id;
    const diaryId  = req.body.diary_id;
    const friendname  = req.body.friend_name;
    let isWrite = (req.body.is_write==='on');
    const end_t = new Date(req.body.end_time);
    const st_t =  Date.now();
    console.log("en" , end_t, "st " , st_t);
    const diary = await diaryModel.findById(diaryId);
    const friend = await userModel.findById(friend_id);
    if(diary === undefined || friend === undefined) {
        res.send("diary or friend not found");
        return
    }
    let toins = true;
    for(let i =0; i < diary.access.length; i++) {
        if(diary.access[i].user_id == friend_id) {
            diary.access[i].endTime = end_t;
            diary.access[i].isWrite = isWrite;
            toins = false;
        }
    }
    for(let i =0; i < friend.access.length; i++) {
        if(friend.access[i].diary_id == diaryId) {
            friend.access[i].endTime = end_t;
            friend.access[i].isWrite = isWrite;
            toins = false;
        }
    }
    if(toins) {
        diary.access.push({
            user_id :friend_id,
            user_name : friendname,
            startTime : st_t,
            endTime : end_t,
            isWrite : isWrite
        })
        friend.access.push({
            diary_id :diaryId,
            diary_name : diary.name,
            startTime : st_t,
            endTime : end_t,
            isWrite : isWrite
        })
    }
    diary.save();
    friend.save();
    // res.send("access given");
    // res.send("grnting access ")
    res.redirect("/getDiary/" + diaryId.toString())
}