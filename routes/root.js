const express = require("express");
const router = express.Router();
const path = require("path");

router.get("^/$|index(.ejs)?", (req, res) => {
    res.render(path.join(__dirname, "..", "views", "index.ejs"));
});


module.exports = router;
