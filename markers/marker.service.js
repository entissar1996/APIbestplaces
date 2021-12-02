const Marker = require('../markers/marker');

async function addMarker(marker) {
    try {
        let NewMarker = await Marker.create(marker);
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
        let updatedMarker = await Marker.findByIdAndUpdate(id, marker);
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