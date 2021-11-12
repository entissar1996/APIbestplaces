const Comments= require('../comments/Comments');
const User= require('../../auth/user-schema');

async function addComment(comment) {

    try {
        let NewComment = await Comments.create(comment);

        await addUserToComment(NewComment);

        return ({
                status: "success",
                message: "Comment added succssfullty",
                payload: NewComment
            });

    } catch (error) {
        return ({
                status: "failed",
                message: "Add Comment failed",
                payload: error

            });
    }

}

async function addUserToComment(comment)
{
    await User.updateMany(
        { '_id':comment.user },
        { $push: { comments: comment._id } }
        );
}


async function getAllComments() {
    try {
        let listeComments = await Comments.find();//.populate('user').populate('comments.commentUser');


        return ({
            status: "success",
            message: "All Comments",
            payload: listeComments
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Comments Fail",
            payload: null
        });
    }
}


async function getOneComment(id){
    try {
        let listeCommentss = await Comments.findById(id)
        //.populate("categories", "-_id -__v -Commentss");
        return ({
            status: "success",
            message: "All Comments",
            payload: listeCommentss
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Comments Fail",
            payload: null
        });
    }

}

async function updateComments(id,Comments) {

    try {
        let oldComments = await Comments.findByIdAndUpdate(id, Comments);
        let updatedComments = await Comments.findById(id);
        //update Comments to catégorie
        await DelateUserToComments(oldComments);
        await addUserToComments(updatedComments);

       // await User.updateMany({ '_id': updatedComments.categories }, { $addToSet: { Commentss: updatedComments._id } });

        return ({
            status: "success",
            message: "Comments updated successfully",
            payload: updatedComments,
        });
    }
    catch (error) {
        return {
              status: "error",
              message: "update Comments is failed",
              payload: error,
        };
    }

}






async function DeleteComments(id) {

    try {
        let oldComments = await Comments.findById(id);
        console.log(oldComments )
        let deletedComments = await Comments.deleteOne({_id:id});
        //await User.updateMany({ '_id': deletedComments.categories }, { $pull: { Commentss: deletedComments._id } });
        await DelateUserToComments(oldComments);
        return ({
            status: "success",
            message: `User with _id=${id} has deleted`,
           payload: deletedComments
        });

    } catch (error) {
        return ({
            status: "error",
             message: `Error to delete user with _id=${id}`,
            payload: error });
    }

}
async function DelateUserToComments(Comments)
{

    await User.updateMany(
        { '_id':Comments.user },
        { $pull : { Comments: Comments._id } }
        );
}

//async function uploadPhoto()
module.exports =() => {
    return (
        {
            addComment: addComment,
            getAllComments: getAllComments,
            getOneComment: getOneComment,
            updateComments: updateComments,
            DeleteComments:  DeleteComments
        }
    );
}
