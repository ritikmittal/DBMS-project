const getImageById = require(__dirname + "/../../functions/getImage.js");

module.exports=async function(req,res,userModel) {
	if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }
    if (req.isAuthenticated()) {
        const users = await userModel.find({'username': {'$regex' : req.body.username}}).select('username _id favicon_id').exec();
        console.log(users, users.length);
        for(let user of users) {
            user.user_image = await getImageById(user.favicon_id);
        }
        res.render("serachedUser", {users: users});
    } else {
        res.redirect("/login");
    }
}