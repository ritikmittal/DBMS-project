module.exports=function(req,res,userModel,passport) {
    const user = new userModel({
        username: req.body.username,
    });
    req.login(user, function (err) {
        if (err) {
            console.log(err);
            res.render("404");
        } else {
            passport.authenticate("local")(req, res, function () {

                res.redirect("/dashboard");
            });
        }
    });
}