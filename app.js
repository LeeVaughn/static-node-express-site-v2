const express = require("express");
const app = express();
const routes = require("./routes");

app.set("view engine", "pug");

app.use(express.static("public"));
app.use(routes);

// 404 handler to catch undefined or non-existent route requests
app.use((req, res, next) => {
  console.log('404 error handler called');

  res.status(404).render("not-found");
});

// Global error handler
app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  }
  
  if (err.status === 404) {
    res.status(404).render("not-found", { err });
  } else {
    err.message = err.message || "Oops! It looks like something went wrong on the server.";
    res.status(err.status || 500).render("error", { err });
  }
});

app.listen(3000, () => {
  console.log("The application is running on localhost:3000!")
});
