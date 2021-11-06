const mongoose= require('mongoose');

const postsSchema= mongoose.Schema(
    {
        image:{
            type: String,
            required: true
        }
    },
    {
      statut:{
          type: String,
          required: true
      }
  }

);


module.exports=mongoose.model("Posts",postsSchema)
