const express =require("express");
const { registerUser, loginUser, forgotPassword, resetPassword, logoutUser, getUserProfile, changePassword, updateProfile, adminGetAllUsers, adminGetSpecificUser, adminDeleteUser, adminUpdateUserDetails } = require("../controllers/authController");
const { isAuthendicatedUser, authorizeRole } = require("../middlewares/authendicate");
const router = express.Router();
const multer = require("multer")
const path = require("path");

const storage = multer.memoryStorage(); // Use memory storage for blob upload
const upload = multer({ storage });

router.route('/register').post(upload.single('avatar'),registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthendicatedUser,getUserProfile);
router.route('/password/change').put(isAuthendicatedUser,changePassword);
router.route('/update').put(isAuthendicatedUser,upload.single('avatar'),updateProfile);





// -----------------------------------Admin routes--------------------------------------


router.route('/admin/users').get(isAuthendicatedUser,authorizeRole('admin'),adminGetAllUsers);

router.route('/admin/user/:id')
.get(isAuthendicatedUser,authorizeRole('admin'),adminGetSpecificUser)
.put(isAuthendicatedUser,authorizeRole('admin'),adminUpdateUserDetails)
.delete(isAuthendicatedUser,authorizeRole('admin'),adminDeleteUser);






module.exports = router;