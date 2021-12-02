const { compareSync } = require('bcrypt');
const express = require('express');
const multer = require('multer');
const router = express.Router();
const user = require('../auth/user-schema');





const storage = multer.diskStorage({ //multers disk storage settings
    destination: async function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: async function(req, file, cb) {
        const userId = req.params.id;
        const path = file.fieldname + '-' + Date.now() + '-' + userId + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
        cb(null, path);

        try{

            await updatePicture(userId, path)
                 .then(function(value) {
                    return value;
                 })
                 .catch(function(err) {
                    return err;
                 });
        }catch(err){
            return err;
        }
    }
});

var upload = multer({ //multer settings
    storage: storage
}).any('avatar');

async function updatePicture(id, path) {

    await user.findByIdAndUpdate({ _id: id }, { $set: { avatar: path } })
    .then(function(doc) {
        return doc.name + ': ' + doc.message;
    }).catch(function(error){
        return error.name + ': ' + error.message
    });
}

router.post('/avatar/:id', upload, async function(req, res, next) {
   upload(req, res,async function(err) {
        if (err) {
            res.json({ statuts: "failed", message: err });
        }
        res.json({ statuts: 'success', message: 'Picture successfully uploaded' });
    });
});

module.exports = router;
