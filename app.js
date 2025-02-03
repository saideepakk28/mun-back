const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./firebaseAdmin"); // Firebase Admin SDK setup file

const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST: Save form data
app.post("/submit", async (req, res) => {
  try {
    const formData = req.body;
    const newRef = db.ref("registrations").push(); // Create a new entry
    await newRef.set(formData);
    
    res.status(201).json({ message: "Form submitted successfully!", id: newRef.key });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ error: "Failed to submit form." });
  }
});

// GET: Retrieve all submissions
app.get("/submissions", async (req, res) => {
  try {
    const snapshot = await db.ref("registrations").once("value");
    const submissions = snapshot.val() || {};
    
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ error: "Failed to fetch submissions." });
  }
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
