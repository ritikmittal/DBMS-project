const fs = require('fs')
const imageModel = require(__dirname + "/../../models/imageModel.js")

const getPic = (req) => {
    const pr =  new Promise((resolve, reject) => {
        if(!req.files || !req.files.photo) {
            fs.readFile(__dirname + "/../../public/images/pic4.jpeg" , async (err, data) => {
                if(err) return reject(err)
                else {
                 resolve( new imageModel({
                    data : data,
                    contentType : 'image/jpeg'
                 }) )
                }
            })
        } else {
            resolve(new imageModel({
                data : req.files.photo.data,
                contentType : req.files.photo.mimetype
            }))
        } } )
    return pr;
}
module.exports= function(req,res,userModel,passport) {
        userModel.find({username: req.body.username}).then(async user => {
            if(user.length == 0) {
                const img_model = await getPic(req);
                img_model.save();
                const newUser = new userModel({
                    username: req.body.username,
                    img_id : img_model.id,
                    favicon_id : img_model.id
                });
                userModel.register(newUser, req.body.password, function (err, user) {
                    if (err) {
                        console.log(err);
                        res.redirect("/");
                    } else {
                        passport.authenticate("local")(req, res, function () {
                            res.redirect("/dashboard");
                        });
                    }
                });
            } else {
                console.log(user);
                res.send("alredy registered");
            }
        })
}