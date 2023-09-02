const predictionController = require("../controller/prediction.controller");



module.exports = (app) => {
  app.get("/getAllPredictions", predictionController.getAllPredictions);
  app.get("/getAllPredictionbyRowId/:rowId", predictionController.getAllPredictionbyRowId);
  app.get("/PredictionsSuccessStat", predictionController.PredictionsSuccessStat);
  app.get("/ExpensesStat", predictionController.ExpensesStat);

};
