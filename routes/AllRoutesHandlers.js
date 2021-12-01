const getDashboard = require( __dirname + "/getRoutes/getDashboard.js");
const postLogin = require(__dirname+"/postRoutes/postLogin.js");
const postRegister = require(__dirname+"/postRoutes/postRegister.js");
const postLogout = require(__dirname+"/postRoutes/postLogout.js");
const getLogin = require(__dirname+"/getRoutes/getLogin.js");
const getHome = require(__dirname+"/getRoutes/getHome.js");
const getRegister = require(__dirname+"/getRoutes/getRegister.js");
const getcompose = require(__dirname+"/getRoutes/getcompose.js");
const getDiary = require(__dirname + "/getRoutes/getDairy.js");
const getViewPage = require(__dirname + "/getRoutes/getViewPage.js")
const getNewDiaries = require(__dirname+"/getRoutes/getNewDiaries.js");
const postNewDiaries = require(__dirname+"/postRoutes/postNewDiaries.js");
const postCompose = require(__dirname+"/postRoutes/postCompose.js");
const postLikes = require(__dirname+"/postRoutes/postLikes.js");
const getProfile = require(__dirname+"/getRoutes/getProfile.js");
const postAddAFriend= require(__dirname+"/postRoutes/postAddAFriend.js");
const getFriendList = require(__dirname + "/getRoutes/getFriendList.js");
const getGrantAccess = require(__dirname + "/getRoutes/getGrantAccess.js");
const postGrantAccess = require(__dirname + "/postRoutes/postGrantAccess.js");
const getExplore = require(__dirname +"/getRoutes/getExplore.js");
const postSearchedUser = require(__dirname+"/postRoutes/postSearchUser.js");
const getMyDairiesList = require(__dirname + "/getRoutes/getMyDairiesList.js");
const postFollowDairy = require(__dirname + "/postRoutes/postFollowDairy.js");
const getMessages = require(__dirname+"/getRoutes/getMessages.js");
const postAddNewBookMark = require(__dirname + "/postRoutes/postAddNewBookMark.js");
const getBookMarks = require(__dirname + "/getRoutes/getBookMarks.js");
const getEditPage = require(__dirname+"/getRoutes/getEditPage.js");
const postEditPage = require(__dirname+"/postRoutes/postEditPage.js");

const handler = {
    getDashboard : getDashboard,
    getLogin : getLogin,
    postLogin : postLogin,
    getRegister : getRegister,
    postRegister : postRegister,
    postLogout : postLogout,
    getHome : getHome,
    getDiary: getDiary,
    getCompose : getcompose,
    getViewPage : getViewPage,
    getNewDiaries : getNewDiaries,
    postNewDiaries : postNewDiaries,
    postCompose : postCompose,
    postLikeThisPost : postLikes,
    getProfile : getProfile,
    postAddAFriend : postAddAFriend,
    getFriendList : getFriendList,
    getGrantAccess : getGrantAccess,
    postGrantAccess : postGrantAccess,
    getExplore : getExplore,
    postSearchedUser : postSearchedUser,
    getMyDairiesList : getMyDairiesList,
    postFollowDairy: postFollowDairy,
    postAddNewBookMark : postAddNewBookMark,
    getBookMarks : getBookMarks,
    getMessages : getMessages,
    getEditPage : getEditPage,
    postEditPage : postEditPage,
};

module.exports.routesHandler = handler