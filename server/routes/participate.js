const express = require("express");
const router = express.Router();
const { Participate } = require("../models/Participate");

router.post("/participate", (req, res) => {
  const participationData = new Participate(req.body);

  participationData.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

(module.exports = router);
