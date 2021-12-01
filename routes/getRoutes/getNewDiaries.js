
const getDiaries= (req, res) => {
    if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }
    res.render("newDiary");
};

module.exports = getDiaries;