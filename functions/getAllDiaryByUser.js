module.exports=async function(username,User) {
    return await User.findOne({'username': username}, 'myDiaries', function (err, user) {
        if (err) return console.log(err);
       return user;
    });
}
