const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return res.status(404).json({ status: "User not found" });
    }
    users.splice(index, 1);
    return res.json({ status: "Deleted Successfully" });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      return res.status(404).json({ status: "User not found" });
    }
    users.splice(index, 1);
    return res.json({ status: "Deleted Successfully" });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  // console.log("Body:- ", body);
  // users.push({
  //   first_name: body.first_name,
  //   last_name: users.last_name,
  //   email: body.email,
  //   gender: body.gender,
  //   job_title: body.job_title,
  // });
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.json({ status: "Success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server is Started On PORT :-${PORT} `));
