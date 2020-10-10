const router = require("express").Router();

const Contacts = require("../models/contactModel");

// Auth middleware import
const authenticate = require("../middleware/authMiddleware");

router.get("/", authenticate, (req, res) => {
  Contacts.getSubmissions()
    .then((list) => {
      res.status(200).json(list);
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was an error getting submissions: ${err}`,
      });
    });
});

router.get("/phone", authenticate, (req, res) => {
  const { phone } = req.body;
  Contacts.findPhoneByPhone(phone)
    .then((finding) => {
      res.status(200).json(finding);
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was an error finding an existing phone: ${err}`,
      });
    });
});

router.get("/email", authenticate, (req, res) => {
  const { email } = req.body;
  Contacts.findEmailByEmail(email)
    .then((finding) => {
      res.status(200).json(finding);
    })
    .catch((err) => {
      res.status(500).json({
        error: `There was an error finding an existing email: ${err}`,
      });
    });
});

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;
  // validate required data
  if (!name || !email) {
    res.status(400).json({ error: "Please include a name and contact email." });
    return;
  }
  // check if email and/or phone are on DB already
  // if they don't exist, just assign null
  const dbEmail = email
    ? await Contacts.findEmailByEmail(email)
        .then(async (finding) =>
          finding
            ? finding.id
            : await Contacts.addEmail(email)
                .then((finding) => finding)
                .catch((err) =>
                  res
                    .status(500)
                    .json({ error: `There was an error adding email: ${err}` })
                )
        )
        .catch((err) => null)
    : 1;
  const dbPhone = phone
    ? await Contacts.findPhoneByPhone(phone)
        .then(async (finding) =>
          finding
            ? finding.id
            : await Contacts.addPhone(phone)
                .then((finding) => finding)
                .catch((err) =>
                  res
                    .status(500)
                    .json({ error: `There was an error adding email: ${err}` })
                )
        )
        .catch((err) => null)
    : 1;

  const submission = await {
    name,
    emails_id: dbEmail,
    phones_id: dbPhone,
    message: message ? message : null,
    submitted: Date.now(),
  };

  Contacts.addSubmission(submission)
    .then((result) => {
      res
        .status(201)
        .json({ message: `Success: ${result.rowCount} row(s) inserted.` });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `There was an error creating your submission: ${err}` });
    });
});

module.exports = router;
