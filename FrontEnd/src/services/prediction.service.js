import http from "../http-common";
class PredictionService {
  getAllPredictions() {
    return http.get(`/getAllPredictions`);
  }
  getAllPredictionbyRowId(rowId) {
    return http.get(`/getAllPredictionbyRowId/${rowId}`);
  }
  PredictionsSuccessStat() {
    return http.get(`/PredictionsSuccessStat`);
  }
  ExpensesStat() {
    return http.get(`/ExpensesStat`);
  }
}
export default new PredictionService();
