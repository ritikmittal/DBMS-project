const getImageById = require(__dirname + "/../../functions/getImage.js");
const getDashboard = async (req, res, userModel, pageModel) =>
{
	if(!req.isAuthenticated()) {
		res.redirect("/login");
		return
	}
	// const user = await userModel.findById(req.user.id).exec();
	// if(user) {

	// const limitrecords=10;
	// const pages =[];
	//
	// 	function getRandomArbitrary(min, max) {
	// 	return Math.ceil(Math.random() * (max - min) + min);
	// }
	 // const query = pageModel.find({isPrivate : false});

	// pageModel.count({isPrivate : false},function(err,count){
	//
	// 	var skipRecords = getRandomArbitrary(1, count-limitrecords);
	//
	// 	query.skip(skipRecords); // Random Offset
	//
	// 	query.exec(function(err,result){
	// 		pages.push(result);
	// 	});
	// });

	const pages = await pageModel.find({isPrivate : false}).limit(5).exec();
	for(let page of pages) {
		page.user_image = await getImageById(page.favicon_id);
	}
	const user = req.user;
	user.user_image = await getImageById(user.favicon_id);
	console.log(user.favicon_id);
	res.render("dashboard",{user:user,pages: pages });
	// } else {
	// 	res.redirect("/login");
	// }
};

module.exports = getDashboard