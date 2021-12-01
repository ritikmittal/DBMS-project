module.exports= async function(pageId,user,pageModel) {
    const page = await pageModel.findById(pageId).exec();
    if(page === undefined) {
        console.log("page not find ",pageId)
        return ;
    }
    const userId = {user_id: user.id, name: user.username}
    console.log("linkinfn........")
    await pageModel.updateOne( {_id: pageId , 'likedBy.user_id' : { $ne : user.id}} , {
        $addToSet: {
            likedBy : {user_id: user.id, name: user.username}
        },
        $inc: {likes: 1} 
    })
};