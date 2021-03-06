const Post= require('../posts/Post');
const User= require('../../auth/user-schema');
const Comments= require('../../profile/comments/Comments');

async function addPost(post) {

    try {
        let NewPost = await Post.create(post);

        await addUserToPost(NewPost);
        await addCommentToPost(NewPost);


        return ({
                status: "success",
                message: "Post added succssfullty",
                payload: NewPost
            });

    } catch (error) {
        return ({
                status: "failed",
                message: "Add Post failed",
                payload: error

            });
    }

}

async function addUserToPost(post)
{
    await User.updateMany(
        { '_id':post.user },
        { $push: { posts: post._id } }
        );
}
async function addCommentToPost(post)
{
    await Comments.updateMany(
        { '_id':post.Comments },
        { $push: { posts: post._id } }
        );
}


async function getAllPosts() {
    try {
        let listePosts = await Post.find({status: 'public'});//.populate('user').populate('Comments')


        return ({
            status: "success",
            message: "All Posts",
            payload: listePosts
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Posts Fail",
            payload: null
        });
    }
}


async function getOnePost(id){
    try {
        let listePosts = await Post.findById(id)
        //.populate("categories", "-_id -__v -posts");
        return ({
            status: "success",
            message: "All Posts",
            payload: listePosts
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All Postns Fail",
            payload: null
        });
    }

}

async function updatePost(id,post) {

    try {
        let oldpost = await Post.findByIdAndUpdate(id, post);
        let updatedPost = await Post.findById(id);
        //update post to catégorie
        await DelateUserToPost(oldpost);
        await addUserToPost(updatedPost);

       // await User.updateMany({ '_id': updatedPost.categories }, { $addToSet: { posts: updatedPost._id } });

        return ({
            status: "success",
            message: "Post updated successfully",
            payload: updatedPost,
        });
    }
    catch (error) {
        return {
              status: "error",
              message: "update post is failed",
              payload: error,
        };
    }

}

async function DeletePost(id) {

    try {
        let oldPost = await Post.findById(id);
        console.log(oldPost )
        let deletedPost = await Post.deleteOne({_id:id});
        await DelateUserToPost(oldPost);
        return ({
            status: "success",
            message: `User with _id=${id} has deleted`,
           payload: deletedPost
        });

    } catch (error) {
        return ({
            status: "error",
             message: `Error to delete user with _id=${id}`,
            payload: error });
    }

}
async function DelateUserToPost(post)
{

    await User.updateMany(
        { '_id':post.user },
        { $pull : { posts: post._id } }
        );
}

module.exports =() => {
    return (
        {
            addPost: addPost,
            getAllPosts: getAllPosts,
            getOnePost: getOnePost,
            updatePost: updatePost,
            DeletePost:  DeletePost
        }
    );
}
