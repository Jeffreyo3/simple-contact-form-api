const router = require("express").Router();

const Contacts = require("../models/contactModel");

router.get("/", (req, res) => {
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

router.post("/phone", (req, res) => {
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

router.post("/email", (req, res) => {
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
  }
  // check if email and/or phone are on DB already
  // if they don't exist, just assign null
  const dbEmail = await Contacts.findEmailByEmail(email)
    .then((finding) => (finding ? finding : null))
    .catch((err) => null);
  const dbPhone = await Contacts.findPhoneByPhone(phone)
    .then((finding) => (finding ? finding : null))
    .catch((err) => null);

  const submission = {
    name,
    emails_id: dbEmail ? dbEmail.id : email ? email : 1,
    phones_id: dbPhone ? dbPhone.id : phone ? phone : 1,
    message: message ? message : null,
    submitted: new Date().toString()
  };
  Contacts.addSubmission(submission)
    .then((result) => {
      res.status(201).json({message: `Success: ${result.rowCount} row(s) inserted.`});
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: `There was an error creating your submission: ${err}` });
    });
});

module.exports = router;
