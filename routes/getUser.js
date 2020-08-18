const express = require("express");
const router = express.Router();

router.get("/api/users", async (req, res) => { 
   res.send("get User example route");
});

module.exports = router;
