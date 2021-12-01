
const getFriendList = (req, res) => {
    if(!req.isAuthenticated()) {
        res.redirect("/")
    } else {
        res.render("viewFriendList" , {friends : req.user.friends})
    }
};

module.exports = getFriendList