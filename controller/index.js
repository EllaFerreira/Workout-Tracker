const router = require("express").Router();
const apiRoutes = require("./api");
const pagesRoutes = require("./routes");

router.use("/api", apiRoutes);
router.use("/", pagesRoutes);

module.exports = router;
