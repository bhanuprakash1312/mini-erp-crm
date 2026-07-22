const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const {
    createChallan,getChallans, getChallanById,updateChallanStatus
} = require("../controllers/challan.controller");

router.post(
    "/",
    authenticate,
    createChallan
);
router.get(
    "/",
    authenticate,
    getChallans
);
router.get(
    "/:id",
    authenticate,
    getChallanById
);
router.patch(
    "/:id/status",
    authenticate,
    updateChallanStatus
);

module.exports = router;