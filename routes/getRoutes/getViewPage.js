
const getViewPage= async (req, res, pageModel, dairyModel) => {
    if(!req.isAuthenticated()) {
        res.redirect("/")
    } else {
        const pageId = req.params.page_id;
        const page = await pageModel.findById(pageId).exec();
        const dairyId = page.diary_id;
    	// check view access of dairy
    	const dairy = dairyModel.findById(dairyId).exec();
    	let tosend = false;
    	let description = "";
    	if(dairy){ 
        	if(!dairy.isPrivate) {
	        	description : "This is open Dairy's Page";
	        	tosend = true;
	        }else if(dairy.owner_id === req.user.id) {
	        	description : "Welcome to your Dairy's Page";
	        	tosend = true;
	        } else {
	        	dairy.access.forEach(user_acc => {
	        		if(user_acc.user_id === req.user.id) {
	        			description : "You have access to this dairy from " + user_acc.start_time.toString() + " till " + user_acc.end_time.toString()
	        			tosend = true;
	        			}
	        		})
        	}
        }
        if(tosend === true) {
        	res.render("viewPage", {page : page, descriptionOfDairy: description});
        } else {
        	res.send("You Don't have view access to the Dairy");
        }
    }
};

module.exports = getViewPage