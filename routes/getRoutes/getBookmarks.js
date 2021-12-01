
const getBookMarks= async (req, res,userModel) => {
    if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }
    const Bookmarks = await userModel.findById(req.user.id).select('bookmarks').exec();
    // console.log(Bookmarks)
    res.render("bookmarks" , {bookmark : Bookmarks.bookmarks})
};

module.exports = getBookMarks