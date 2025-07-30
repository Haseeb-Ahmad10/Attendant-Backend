const { Router } = require('express');
const router = Router();

const controller = require('../controllers/user');

router.post("/login", controller.login)
router.post("/", controller.create);
router.get("/", controller.get)
// router.delete("/:userId", controller.delete)


module.exports = router;
