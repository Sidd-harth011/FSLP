<h1 align="center">📌 MERN Stack OTP Login Project</h1>

<p align="center">
  A simple full-stack login form using <strong>MongoDB</strong>, <strong>Express</strong>, <strong>React</strong>, and <strong>Node.js</strong> with OTP verification via Email & SMS.
</p>

---

<h2>🚀 Features</h2>

<ul>
  <li>Fill in the login form with <strong>9 parameters</strong> (name, email, phone, password, address, about, profession, age, gender).</li>
  <li>Submit the form to receive an <strong>OTP</strong> on both Email and Phone.</li>
  <li>Verify OTP in a separate verification window.</li>
  <li>Automatically capture <strong>latitude</strong> and <strong>longitude</strong> of the user’s location.</li>
  <li>Save all data to <strong>MongoDB Atlas</strong>.</li>
  <li>Store timestamps for creation and updates in <strong>UTC</strong> format, easily convertible to <strong>IST</strong>.</li>
</ul>

---

<h2>🗂 Data Structure</h2>

In MongoDB Atlas, each record contains:

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91XXXXXXXXXX",
  "password": "hashedPassword",
  "address": "123 Street",
  "about": "Short bio",
  "profession": "Developer",
  "age": 25,
  "gender": "Male",
  "location": {
    "lat": "xx.xxxxx",
    "lon": "yy.yyyyy"
  },
  "createdAt": "2025-08-11T05:32:01.459Z",
  "updatedAt": "2025-08-11T05:35:42.123Z"
}
