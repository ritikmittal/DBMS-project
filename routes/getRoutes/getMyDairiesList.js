module.exports=async function (req, res) {
    if (req.isAuthenticated()) {
        const diaries = req.user.myDiaries;
        const accessCur = [];
        const accessPast = [];

        for(let i =0;i<req.user.access.length; i++) {
            if(req.user.access[i].endTime >= Date.now()) {
                accessCur.push(req.user.access[i]);
            } else accessPast.push(req.user.access[i]);
        }
        res.render("myDairyList", {
            myDiaries : diaries,
            accessCur : accessCur,
            accessPast : accessPast,
            user : req.user
        });
    } else {
        res.redirect("/login");
    }
};