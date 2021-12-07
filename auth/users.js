const router=require('express').Router();
const User = require('./user-schema');
const helpers = require('./user-validation');
/*const multer = require('multer');*/
const {
  check,
  validationResult
} = require('express-validator');
const userService = require('./user.service')(User);
/*
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
var upload = multer({ storage: storage });
router.post('/register',upload.single('avatar'), [check('email').isEmail()], async function (req, res, next) {
  console.log(req.file.path);
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({
        status: "fail",
        message: errors.array(),
        payload: null
      });
    } else {
      const user=new User({
        fullname:req.body.fullname,
        email:req.body.email,
        password:req.body.password,
       avatar:req.file.path
      })
      try {
        let response = await userService.register(user);
        res.json(response);
      } catch (error) {
        next(error)
        console.log(error)
      }
    }
  }
);
*/
router.post('/register', [check('email').isEmail()], async function (req,res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      status: "fail",
      message: errors.array(),
      payload: null
    });
  } else {
    let {
      ...user
    } = req.body
    try {
      let response = await userService.register(user);
      res.json(response);
    } catch (error) {
      next(error)
      console.log(error)
    }

  }
}

);
// @ts-check
// POST /authenticate
router.post('/authenticate', [check('email').isEmail()], async function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({
      status: "fail",
      message: errors.array(),
      payload: null
    });
  } else {
    try {
      let {
        email,
        password
      } = req.body;
      res.json(await userService.authenticate(email, password));
    } catch (error) {
      next(error)
    }
  }
});


// @ts-check
// GET / get All users
router.get('/', async function (req, res, next) {
  try {
    let response = await userService.getAllUsers();
    if (response) {
      res.json(response)
    }
  } catch (error) {
    next(error)
  }
});


/**
 * Get User By Id
 * GET /user/:id
 */

router.get('/user/:id', async function (req, res,next) {
  let id = req.params.id;
  try {
    let response = await userService.getUserById(id);
    if (response) {
      return res.json(response);
    }
  } catch (error) {
    next(error);
  }

})


// Upadate User Info
// PUT /update/:id
router.put('/update/:id', async function (req, res,next) {

    let userId = req.params.id;
    let user = {
      ...req.body
    };

    try {
      let response = await userService.updateUser(userId, user);
      if (response) {
        res.json(response);
      }
    } catch (error) {
      next(error);
    }

  }
);



// Upadate User Role " ADMIN | USER "
// PUT /update/role/:id
router.put('/update/role/:id',  async function (req, res,next) {
  let id = req.params.id;
  let role;
  if(!req.body.hasOwnProperty('new_role')){
    res.status(422).json({
      status: "error",
      message: 'You Should send new_role',
      payload: null
    });
  }else{
    role = req.body.new_role;
  }

  try {
    let response = await userService.updateUserRole(id, role);

    if (response) {
      res.status(200).json(response);
    }

  } catch (error) {
    next(error)
  }

});





// Delete User
// DELETE /delete/:id
router.delete('/delete/:id', helpers.validateUser, helpers.isAdmin, async function (req, res, next) {
  let id = req.params.id;
  try {
    let response = await userService.deleteUser(id);
    if(response){
      res.json(response);
    }
  } catch (error) {
    next(error);
  }
});


module.exports = router;