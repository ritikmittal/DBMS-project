
const getDairy= async (req, res, dairyModel) => {
    if(!req.isAuthenticated()) {
        res.redirect("/")
    } else {
        const dairyId = req.params.dairy_id;
        console.log(dairyId)
        dairyModel.findById(dairyId).then( dairy => {
        	if(dairy){ 
        	let tosend = false;
        	console.log(dairy.owner_id)
	        console.log(req.user.id)
	        let description = "";
	        if(!dairy.isPrivate) {
	        	description : "This is open Dairy";
	        	tosend = true;
	        }else if(dairy.owner_id === req.user.id) {
	        	description : "Welcome to your Dairy";
	        	tosend = true;
	        } else {
	        	dairy.access.forEach(user_acc => {
	        		console.log(user_acc.endTime,Date.now(),user_acc.endTime>=Date.now())
	        		if(user_acc.user_id === req.user.id && user_acc.endTime >= Date.now()) {
	        			description : "You have access to this dairy from " + user_acc.startTime.toString() + " till " + user_acc.endTime.toString()
	        			tosend = true;
	        		}
	        	})
	        }
	        if(tosend === true) {
	        	res.render("diaryView", {dairy : dairy, descriptionOfDairy: description});
	        } else {
	        	res.send("You Don't have view access to the Dairy");
	        }
	    } else res.send("incorrect dairy id")
        }).catch(err => console.log(err)) 
    }
};

module.exports = getDairy