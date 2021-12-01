module.exports=async function(req,res) {
    if (req.isAuthenticated()) {
        res.render("messages");
    } else {
        res.render("home");
    }
}