const controllerTts = require("../controllers/tts.controller");
module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/tts/create",
 /*    [
      verifySignUp.checkDuplicateUsernameOrEmail,
    ], */
    controllerTts.create
  );

  app.get("/tts/all", controllerTts.findAll);
  app.post("/tts/delete", controllerTts.delete);

};