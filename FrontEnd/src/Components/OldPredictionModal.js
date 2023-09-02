import React from "react";
import { useState, useEffect } from "react";
import predictionService from "../services/prediction.service";
export default function OldPredictionModal({ RowId, showModal, handleClose }) {
  const modalId = `exampleModal5-${RowId}`;

  const [prediction, setPrediction] = useState([]);
  const retrievePrediction = () => {
    predictionService
      .getAllPredictionbyRowId(RowId)
      .then((response) => {
        setPrediction(response?.data?.prediction[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrievePrediction();
  }, [RowId]);

  const predictionData = prediction.length > 0 ? prediction[0] : {};
  const stringKeys = Object.keys(predictionData).filter(
    (key) => typeof predictionData[key] === "string"
  );
  return (
    <>
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id={modalId}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel1"
        aria-hidden={!showModal}
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="myModalLabel">
                Ancienne prédiction
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleClose}
              >
                {" "}
              </button>
            </div>
            <div className="modal-body">
              
              <div>
                <ul>
                  {stringKeys.map((key) => (
                    <li key={key}>
                      <strong>{key}:</strong> {String(predictionData[key])}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
                onClick={handleClose}
              >
                Quitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
