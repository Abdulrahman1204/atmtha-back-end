const asyncHandler = require("express-async-handler");
const {
  Center,
  validateCreateCenter,
  validateUpdateCenter,
} = require("../models/Center");

/**-----------------------------------------------
 * @desc    Create New Center
 * @route   /api/centers
 * @method  POST
 * @access  public (Admins)
 ------------------------------------------------*/
module.exports.createCenterCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateCreateCenter(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Create Center
  const center = await Center.create({
    governorate: req.body.governorate,
    name: req.body.name,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  });

  // Response to the client
  res
    .status(201)
    .json({ message: "The Center has beem added successfully", center });
});

/**-----------------------------------------------
 * @desc    Update Center Details By Id
 * @route   /api/centers/:id
 * @method  PUT
 * @access  public (Admins)
 ------------------------------------------------*/
module.exports.updateCenterCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateUpdateCenter(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if the center exists
  const center = await Center.findById(req.params.id);
  if (!center) {
    return res.status(404).json({ message: "center not found" });
  }

  // Update center
  const updateCenter = await Center.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        governorate: req.body.governorate,
        name: req.body.name,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
      },
    },
    { new: true }
  );

  // response to the client
  res.status(200).json(updateCenter);
});

/**-----------------------------------------------
 * @desc    Get All Center
 * @route   /api/centers
 * @method  GET
 * @access  public (Users & Admins)
 ------------------------------------------------*/
module.exports.getCentersCtrl = asyncHandler(async (req, res) => {
  let center, documentCount, anotherCenters;
  const { governorate, page, perPage } = req.query;

  if (governorate) {
    if (page && perPage) {
      center = await Center.find({ governorate: governorate })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .sort({ createdAt: -1 });
    } else {
      center = await Center.find({ governorate: governorate });
    }

    anotherCenters = await Center.find({ governorate: governorate });
    documentCount = anotherCenters.length;
  } else if (page && perPage) {
    center = await Center.find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    documentCount = await Center.countDocuments();
  } else {
    center = await Center.find();
    documentCount = await Center.countDocuments();
  }

  res.status(200).json({ center, documentCount, totalCount: center.length });
});

/**-----------------------------------------------
 * @desc    Get Center by id
 * @route   /api/centers/:id
 * @method  GET
 * @access  public (Users & Admins)
 ------------------------------------------------*/
module.exports.getCenterByIdCtrl = asyncHandler(async (req, res) => {
  const center = await Center.findById(req.params.id);
  if (!center) {
    return res.status(404).json({ message: "Unit not found" });
  }

  res.status(200).json(center);
});

/**-----------------------------------------------
 * @desc    Delete Center By Id
 * @route   /api/centers/:id
 * @method  DELETE
 * @access  public (Admins)
 ------------------------------------------------*/
module.exports.deleteCenterCtrl = asyncHandler(async (req, res) => {
  const center = await Center.findById(req.params.id);
  if (center) {
    await Center.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "center has been deleted" });
  } else {
    res.status(404).json({ message: "center not found" });
  }
});
