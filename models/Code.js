const mongoose = require("mongoose");
const Joi = require("joi");
const cron = require("node-cron");

//schema of user

const CodeSchema = new mongoose.Schema(
  {
    codeNumber: {
      type: String,
      required: true,
      trim: true,
      minLength: 9,
      maxLength: 9,
    },
    side: {
      type: String,
      enum: ["علمي", "أدبي"],
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    startDate: { type: Date },
    helperDate: { type: Number },
    expireDate: { type: Date },
    expirationDate: {
      type: String,
      enum: ["شهر", "ستة أشهر", "سنة"],
      required: true,
    },
    status: {
      type: String,
      enum: ["ok", "notOk", "finished"],
      default: "notOk",
    },
    subject: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    subjectName: [
      {
        type: String,
      },
    ],
    all: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "side",
    },
    allName: {
      type: String,
    },
    isExam: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const validateCreateCode = (obj) => {
  const schema = Joi.object({
    // codeNumber: Joi.string().trim().min(9).max(9).required(),
    expirationDate: Joi.string().valid("شهر", "ستة أشهر", "سنة").required(),
    side: Joi.string().valid("علمي", "أدبي").required(),
    number: Joi.number().min(1).max(100).required(),
    subject: Joi.array().items(Joi.string().required()).required(),
    all: Joi.string(),
    isExam: Joi.boolean(),
  });

  return schema.validate(obj);
};

const validateActivateCode = (obj) => {
  const schema = Joi.object({
    codeNumber: Joi.string().trim().min(9).max(9).required(),
  });

  return schema.validate(obj);
};

CodeSchema.methods.activate = function () {
  const currentDate = new Date();
  this.startDate = currentDate.toLocaleString("en-US", {
    timeZone: "Asia/Damascus",
  });
  switch (this.expirationDate) {
    case "شهر":
      this.helperDate = 1;
      break;
    case "ستة أشهر":
      this.helperDate = 6;
      break;
    case "سنة":
      this.helperDate = 12;
      break;
    default:
      throw new Error("Invalid expireDate value");
  }
  const helperObjectDate = new Date();
  const newDate = new Date(
    currentDate.setMonth(helperObjectDate.getMonth() + this.helperDate)
  );
  this.expireDate = newDate.toLocaleString("en-US", {
    timeZone: "Asia/Damascus",
  });
  this.status = "ok";
};

const Code = mongoose.model("Code", CodeSchema);

cron.schedule("0 0 * * *", async () => {
  try {
    // Get the current date
    const currentDate = new Date();

    // Find all codes that have expired
    const expiredCodes = await Code.find({ expireDate: { $lte: currentDate } });

    // Delete the expired codes
    await Code.deleteMany({
      _id: { $in: expiredCodes.map((code) => code._id) },
    });

    // console.log(`Deleted ${expiredCodes.length} expired codes.`);
  } catch (error) {
    console.error("Error deleting expired codes:", error);
  }
});

module.exports = {
  Code,
  validateCreateCode,
  validateActivateCode,
};
