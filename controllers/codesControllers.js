const asyncHandler = require("express-async-handler");
const {
  Code,
  validateCreateCode,
  validateActivateCode,
} = require("../models/Code");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");
const { User } = require("../models/User");
const { Subject } = require("../models/Subject");
const { Side } = require("../models/Side");

/*this code for generating code */
const generateCode = () => {
  const codeLength = 9;
  const options = [
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "+",
    "_",
    "=",
    "!",
    "@",
    "#",
    "$",
    "%",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  let code = "";

  for (let i = 0; i < codeLength; i++) {
    const randomIndex = Math.floor(Math.random() * options.length);
    code += options[randomIndex];
  }

  return code;
};

const isCodeUnique = async (code) => {
  // Check if the code exists in the database
  const existingCode = await Code.findOne({ codeNumber: code });
  // Return true if the code is unique (not found in the database), false otherwise
  return !existingCode;
};

const generateUniqueCode = async () => {
  let code;
  let isUnique = false;

  while (!isUnique) {
    code = generateCode();
    isUnique = await isCodeUnique(code);
  }

  return code;
};

const QrGenerate = async (text) => {
  try {
    const imagesDirectory = path.join(__dirname, "../images");
    // Create the images directory if it doesn't exist
    if (!fs.existsSync(imagesDirectory)) {
      fs.mkdirSync(imagesDirectory);
    }

    const qrPath = path.join(imagesDirectory, `${text}.png`);
    const qr = await QRCode.toFile(qrPath, text);
    return qrPath; // Return the path of the generated QR code image
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be caught by the caller
  }
};

/*this end of generating code */

/**-----------------------------------------------
 * @desc    Generate codes
 * @route   /api/codes/generateCode
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.generateQrCode = asyncHandler(async (req, res) => {
  const { error } = validateCreateCode(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  for (let i = 1; i <= req.body.number; i++) {
    const genCode = await generateUniqueCode();
    let subjectName = [];
    let subjectIds = [];
    let number, sideNameString;
    if (req.body.isExam) {
      const number = req.body.number;
      for (let i = 0; i < number; i++) {
        const genCode = await generateUniqueCode();
        var code = new Code({
          codeNumber: genCode,
          expirationDate: req.body.expirationDate,
          side: "علمي",
          subject: [null],
          // subjectName: subject.name,
          subjectName: [null],
          allName: "كود اختبار شامل",
          isExam: true,
        });

        await code.save();
      }
      return res
        .status(200)
        .json({ message: "codes has been created successfully", code });
    } else if (req.body.all) {
      const side = await Side.findById(req.body.all).populate("subjects");
      const allSubject = side.subjects;
      number = allSubject.length;
      for (let i = 0; i < number; i++) {
        subjectIds.push(allSubject[i]._id);
        subjectName.push(allSubject[i].name);
      }

      sideNameString = `كل القسم ال${side.name}`;
    } else {
      number = req.body.subject.length; 
      for (let i = 0; i < number; i++) {
        const subject = await Subject.findById(req.body.subject[i]);
        subjectName.push(subject.name);
        subjectIds.push(req.body.subject[i]);
      }
    }

    var code = new Code({
      codeNumber: genCode,
      expirationDate: req.body.expirationDate,
      side: req.body.side,
      subject: subjectIds,
      // subjectName: subject.name,
      subjectName: subjectName,
      allName: sideNameString,
    });

    await code.save();
  }

  return res
    .status(200)
    .json({ message: "codes has been created successfully" });
});

/**-----------------------------------------------
 * @desc    Get codes
 * @route   /api/codes/
 * @method  GET
 * @access  public
 ------------------------------------------------*/

module.exports.getAllCodesCtrl = asyncHandler(async (req, res) => {
  let codes;
  const { page, perPage } = req.query;
  if (page && perPage) {
    codes = await Code.find({ subject: { $size: 1 } })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
  } else {
    codes = await Code.find({ subject: { $size: 1 } }).sort({ createdAt: -1 });
  }
  const documentCount = await Code.countDocuments({ subject: { $size: 1 } });
  const totalCount = codes.length;
  res.status(200).json({ codes, totalCount, documentCount });
});

/**-----------------------------------------------
 * @desc    Get codes Packages
 * @route   /api/codes/packages
 * @method  GET
 * @access  public
 ------------------------------------------------*/

module.exports.getAllCodesPackagesCtrl = asyncHandler(async (req, res) => {
  const subject = await Subject.find();

  let codes;
  const { page, perPage } = req.query;
  if (page && perPage) {
    codes = await Code.find({
      $expr: {
        $and: [
          { $gt: [{ $size: "$subject" }, 1] },
          { $lte: [{ $size: "$subject" }, subject.length] },
        ],
      },
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
  } else {
    codes = await Code.find({
      $expr: {
        $and: [
          { $gt: [{ $size: "$subject" }, 1] },
          { $lte: [{ $size: "$subject" }, subject.length] },
        ],
      },
    }).sort({ createdAt: -1 });
  }
  const documentCountOneCode = await Code.countDocuments({
    subject: { $size: 1 },
  });
  const documentCount = (await Code.countDocuments()) - documentCountOneCode;
  const totalCount = codes.length;
  res.status(200).json({
    codes,
    totalCount,
    documentCount,
  });
});

/**-----------------------------------------------
 * @desc    Generate One Code
 * @route   /api/codes/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/

module.exports.getOneCodeCtrl = asyncHandler(async (req, res) => {
  const code = await Code.findById(req.params.id);
  res.status(200).json(code);
});

module.exports.deleteOneCodeCtrl = asyncHandler(async (req, res) => {
  // 1. Get the code from DB
  const code = await Code.findById(req.params.id);
  if (!code) {
    return res.status(404).json({ message: "code not found" });
  }

  // 5. Delete the code from cloudinary
  // if (code.qrImage.publicId !== null) {
  //   await cloudinaryRemoveImage(code.qrImage.publicId);
  // }

  // 7. Delete the user himself
  await Code.findByIdAndDelete(req.params.id);

  // 8. Send a response to the client
  res.status(200).json({ message: "code has been deleted" });
});

/**-----------------------------------------------
 * @desc    Active One Code
 * @route   /api/codes/code-activate
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.codeActivate = asyncHandler(async (req, res) => {
  // 8. Send a response to the client
  const { error } = validateActivateCode(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }

  const code = await Code.findOne({ codeNumber: req.body.codeNumber });
  if (!code) {
    return res.status(404).json({ message: "there is no code" });
  }

  if (code.user) {
    return res.status(400).json({ message: "code already taken" });
  }

  code.activate();
  await code.save();
  const updatedCode = await Code.findOneAndUpdate(
    { codeNumber: req.body.codeNumber },
    {
      $set: {
        user: req.user.id,
      },
    },
    { new: true }
  );

  res.status(200).json({ updatedCode, message: "code has been activated" });
});

/**-----------------------------------------------
 * @desc    Generate One Code
 * @route   api/codes/download-image
 * @method  POST
 * @access  public
 ------------------------------------------------*/

module.exports.downloadImageCtrl = asyncHandler(async (req, res) => {
  const { error } = validateActivateCode(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const exist = await Code.findOne({ codeNumber: req.body.codeNumber });
  if (!exist) {
    return res.status(400).json({ message: "Code is not exist" });
  }

  const qrPath = await QrGenerate(req.body.codeNumber);

  // Send the generated image file for download
  return res.download(qrPath, `${req.body.codeNumber}.png`, (error) => {
    if (error) {
      console.log("Error downloading image:", error);
      return res.status(500).json({ message: "Failed to download image" });
    }

    // Delete the generated image file after it has been downloaded
    fs.unlinkSync(qrPath);
  });
});
