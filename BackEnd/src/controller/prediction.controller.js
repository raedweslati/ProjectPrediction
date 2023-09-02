const { sequelizeConfig, Sequelize } = require("../db/index.js");

exports.getAllPredictions = async (req, res) => {
  try {
    const predictions = await sequelizeConfig.query(
      `SELECT
      RowId,
      case when IsSuccess = 1 then 'Succès' else 'Echoué' end as status 
      FROM Predictions `,
      { type: Sequelize.QueryTypes.RAW }
    );
    return res.status(200).json({
      predictions,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.getAllPredictionbyRowId = async (req, res) => {
  const rowId = req.params.rowId;
  try {
    const prediction = await sequelizeConfig.query(
      `select *  FROM [Prediction].[dbo].[Predictions] where RowId = ${rowId} `,
      { type: Sequelize.QueryTypes.RAW }
    );
    return res.status(200).json({
      prediction,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.PredictionsSuccessStat = async (req, res) => {

  try {
    const predictionStat = await sequelizeConfig.query(
      `SELECT count(*) as value,IsSuccess as [key] from Predictions group by IsSuccess`,
      { type: Sequelize.QueryTypes.RAW }
    );
    return res.status(200).json({
      predictionStat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.ExpensesStat = async (req, res) => {

  try {
    const predictionStat = await sequelizeConfig.query(
      `
      SELECT count(*) as value,'More than  100000' as [key] 
      FROM Predictions where cast(Expenses_amount_mean as NUMERIC(18,5)) > 100000
      union
      SELECT count(*) as value,'less than  100000' as [key] 
      FROM Predictions where cast(Expenses_amount_mean as NUMERIC(18,5)) <= 100000`,
      { type: Sequelize.QueryTypes.RAW }
    );
    return res.status(200).json({
      predictionStat,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
