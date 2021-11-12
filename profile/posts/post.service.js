const Post= require('../posts/Post');
const User= require('../../auth/user-schema');

async function addPost(post) {

    try {
        let NewPost = await Post.create(post);

        await addUserToPost(NewPost);

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


async function getAllPosts() {
    try {
        let listePosts = await Post.find().populate("user");
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
        //await User.updateMany({ '_id': deletedPost.categories }, { $pull: { posts: deletedPost._id } });
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

//async function uploadPhoto()
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
