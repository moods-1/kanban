require("dotenv").config();
const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.BUCKET,
    acl: "public-read",
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
});

module.exports.upload_post = function (req, res) {
  const token = req.cookies.user.token;
  const decodedToken = jwt.verify(
    token,
    process.env.SECRET_KEY || "ShH_SeCrEt_StUfF"
  );
  const uploadFile = upload.single("image");
  uploadFile(req, res, async function (err) {
    if (err) res.status(500).send({ error: err.message });
    const image = process.env.S3_URL + req.file.originalname;
    await User.addImage(decodedToken.userId, image);
    res.send({ imgSrc: image });
  });
};
