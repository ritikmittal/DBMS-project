module.exports=async function (req, res, User) {
    if (req.isAuthenticated()) {
        const diaries = (await require(__dirname + "/../../functions/getAllDiaryByUser.js")(req.user.username, User)).myDiaries;
        for(let i =0;i<req.user.access.length; i++) {
            if(req.user.access[i].endTime >= Date.now() && req.user.access[i].isWrite === true) {
                diaries.push({
                    diary_id : req.user.access[i].diary_id,
                    diary_name : req.user.access[i].diary_name
                })
            }
        }
        if(diaries.length == 0) {
            res.redirect("/newDiaries");
        } else {
            res.render("compose", {
                user: req.user,
                diaries: diaries,
                content: req.query.preContent
            });
        }
    } else {
        res.redirect("/login");
    }
};