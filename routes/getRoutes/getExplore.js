const getImageById = require(__dirname + "/../../functions/getImage.js");
const pageModel = require(__dirname + "/../../models/pageModel.js");

module.exports= async (req, res) => {
    if(!req.isAuthenticated()) {
        res.redirect("/");
        return
    }
    const page_ids = await pageModel.find({isPrivate : false}).select('id').exec()
    const pages =[];
    const pages_to =[];
    let limitrecords = 10;
    let len = page_ids.length - 1;
    for(let i=0;i <  limitrecords; i++) {
        let x = Math.floor(len * Math.random());
        pages_to.push(page_ids[x]);
        let tmp = page_ids[len];
        page_ids[len] = page_ids[x];
        page_ids[x] = tmp;
        len = len - 1;
    }
    console.log(pages_to);
    for(let i=0;i<limitrecords;i++) {
        const page = await pageModel.findById(pages_to[i]).exec();
        pages.push(page);
    }
    //

    // const query = pageModel.find({isPrivate : false});
    // 	// for(let i=0;i <  limitrecords; i++) {
    // await push( query , pages);
    // console.log(pages)

    	// };
    // const pages = await pageModel.find({isPrivate : false}).limit(5).exec();
    for(let page of pages) {
        page.user_image = await getImageById(page.favicon_id);
    }
    res.render("explore", {pages : pages});
};

