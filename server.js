const express=require("express");
const bodyParser=require("body-parser");
const fileupload = require("express-fileupload");
const ejs=require("ejs");
const mongoose=require("mongoose");
const session=require('express-session');
const passport=require("passport");
const passportLocalMongoose=require("passport-local-mongoose");
const {routesHandler } = require( __dirname + "/routes/AllRoutesHandlers.js");
const {diaryModel, userModel, pageModel } = require(  __dirname + "/models/Allmodels.js")

const app = express();


app.use(express.static("public"));
app.set('view engine','ejs');
app.use(fileupload());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(session({
	secret: "Oh! that's secret",
	resave: false,
	saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());


	mongoose.connect("mongodb://localhost:27017/userDataBase", {
							useNewUrlParser: true,
							useUnifiedTopology: true
						}).then( () => console.log("connected to DB."))
							.catch( err => console.log(err));

mongoose.set("useCreateIndex",true);

// const User = new userModel;
passport.use(userModel.createStrategy());

passport.serializeUser((user, done) => {
	done(null , user.id)
});

passport.deserializeUser((id, done) => {
	userModel.findById(id).then(user => {
		done(null, user)
	})
});


app.get("/", (req,res) => routesHandler.getHome(req,res) );
app.get("/dashboard", (req, res) => routesHandler.getDashboard(req,res,userModel, pageModel));
app.get("/login", (req,res) => routesHandler.getLogin(req,res) );
app.get("/register",(req,res) => routesHandler.getRegister(req,res) );
app.post("/login",(req,res)=>routesHandler.postLogin(req,res,userModel,passport));
app.get("/compose",(req,res)=>routesHandler.getCompose(req,res,userModel));
app.post("/register",(req,res)=>routesHandler.postRegister(req,res,userModel,passport));
app.post("/logout",(req,res)=>routesHandler.postLogout(req,res));
app.get("/newDiaries",(req,res)=>routesHandler.getNewDiaries(req,res));
app.post("/compose",(req,res)=>routesHandler.postCompose(req,res,pageModel,diaryModel));
app.post("/newDiary",(req,res)=>routesHandler.postNewDiaries(req,res,userModel,diaryModel,pageModel));
app.get("/getDiary/:dairy_id", (req,res) => routesHandler.getDiary(req,res,diaryModel));
app.get("/getPage/:page_id", (req,res) => routesHandler.getViewPage(req,res,pageModel,diaryModel));
app.post("/likeThisPost", (req,res) => routesHandler.postLikeThisPost(req,res,pageModel));
app.get("/getFriendList", (req,res) => routesHandler.getFriendList(req,res));
app.get("/getGrantAccess", (req,res) => routesHandler.getGrantAccess(req,res));
app.post("/postGrantAccess", (req,res) => routesHandler.postGrantAccess(req,res , userModel,diaryModel));
app.get("/getProfile/:user_id",(req,res)=>routesHandler.getProfile(req,res,userModel));
app.post("/postAddAFriend",(req,res)=>routesHandler.postAddAFriend(req,res,userModel));
app.get("/explore",(req,res)=>routesHandler.getExplore(req,res));
app.post("/searchUser",(req,res)=>routesHandler.postSearchedUser(req,res,userModel));
app.get("/messages",(req,res)=>routesHandler.getMessages(req,res));
app.get("/myDiaries", (req, res) => routesHandler.getMyDairiesList(req,res,));
app.post("/followDairy", (req,res) => routesHandler.postFollowDairy(req,res, diaryModel, userModel));
app.get("/editPage/:pageId",(req,res)=>routesHandler.getEditPage(req,res,pageModel,diaryModel));
app.post("/editPage",(req,res)=>routesHandler.postEditPage(req,res,pageModel,diaryModel));
app.post("/addNewBookMark", (req,res) => routesHandler.postAddNewBookMark(req,res,userModel));
app.get("/bookmarks", (req,res) => routesHandler.getBookMarks(req,res,userModel));

app.listen(3000 , () => {
	console.log("listening to port 3000")
})