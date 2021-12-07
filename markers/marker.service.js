const Marker = require('../markers/marker');
const User= require('../auth/user-schema');
async function addMarker(marker) {
    try {
        let NewMarker = await Marker.create(marker);
        addMarkerToUser(NewMarker);
        return ({    
            status: "success",
            message: "Marker added succssfullty", 
            payload: NewMarker
        });

    } catch (error) {
        return ({ 
            status: "failed",
            message: "Add Marque failed", 
            payload: error 
        });
    }

}
async function addMarkerToUser(Marker)
{
    await User.updateMany(
        { '_id':Marker.user },
        { $push: { marker  : Marker._id } }
        );
}

async function getAllMarkers() {
    try {
        let listeMarker = await Marker.find();
        return ({
            status: "success",
            message: "All markers", 
            payload: listeMarker 
        });

    } catch (error) {
        return ({
            status: "error",
            message: "Get All MarkersFail", 
            payload: error 
        });
    }
}

async function getOneMarker(id){
  
    try {
         let marker = await Marker.findById({_id:id});
         return ({
             status: "success",
             message: `Get marker with _id=${id}`,
             payload: marker 
         });
 
     } catch (error) {
         return {
             status: "error",
             message: `Error to get marker with _id=${id}`,
             payload: error,
           };
     }
 }

 async function updateMarker(id,marker) {
  
    try {
        let oldmarker = await Marker.findByIdAndUpdate(id, marker);
        let updatedMarker = await Marker.findById(id);
        
        await DelateMarkerToUser(oldmarker);
        await addMarkerToUser(updatedMarker);
        return ({
            status: "success",
            message: "marker updated successfully",
            payload: await Marker.findById(id),
        });
    } catch (error) {
        return ({ 
            status: "error",
             message: `Error to delete marker with _id=${id}`, 
            payload: error 
        });
    }

}
async function DeleteMarker(id) {
  
    try {
        let deletedMarker = await Marker.deleteOne({_id:id});
        return ({ 
            status: "success",
            message: `Marker with _id=${id} has deleted`,
           payload: deletedMarker
        });

    } catch (error) {
        return ({ 
            message:  `Error to delete Marker with _id=${id}`,
             payload: error });
    }

}

async function DelateMarkerToUser(Marker)
{

    await User.updateMany(
        { '_id':Marker.user },
        { $pull : { marker: Marker._id } }
        );
}
module.exports =() => {
    return (
        {
            addMarker: addMarker,
            getAllMarkers: getAllMarkers,
            getOneMarker: getOneMarker,
            updateMarker: updateMarker,
            DeleteMarker:  DeleteMarker
        });
}