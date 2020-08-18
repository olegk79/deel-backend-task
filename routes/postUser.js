const express = require("express");
const router = express.Router();

router.post("/api/user", async (req, res) => { 
   res.send("post User example route");
});

module.exports = router;
