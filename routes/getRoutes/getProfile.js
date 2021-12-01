const getImageById = require(__dirname + "/../../functions/getImage.js")

module.exports=async function(req,res,userModel) {
    if (req.isAuthenticated()) {
        const profileId = req.params.user_id;
        let img1 = {}
        
        let isSelf = false;
        let profileUser = {};
        if( req.params.user_id === undefined || req.params.user_id === 's') {
            isSelf = true;
            img1 = await getImageById(req.user.favicon_id);
        } else {
            profileUser = await userModel.findById(profileId).exec();
            img1 = await getImageById(profileUser.favicon_id);
        }
        res.render("profile", {user: profileUser, isSelf : isSelf, image : img1});
    } else {
        res.render("home");
    }
}