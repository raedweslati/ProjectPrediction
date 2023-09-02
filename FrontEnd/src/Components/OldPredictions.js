import React from "react";
import predictionService from "../services/prediction.service";
import { useState, useEffect } from "react";
import OldPredictionModal from "./OldPredictionModal";
export default function OldPredictions() {
  const [predictions, setPredictions] = useState([]);
  const retrieveAllPredictions = () => {
    predictionService
      .getAllPredictions()
      .then((response) => {
        setPredictions(response?.data.predictions[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    retrieveAllPredictions();
  }, []);

  const Row = ({ prediction }) => {
    const [showModal, setShowModal] = useState(false);

    const handleModalOpen = () => {
      setShowModal(true);
    };

    const handleModalClose = () => {
      setShowModal(false);
    };
    return (
      <tr>
        <td>{prediction.RowId}</td>
        {prediction.status == "Succès" ? (
          <td>
            <span className="badge bg-success">Succès</span>
          </td>
        ) : (
          <td>
            <span className="badge bg-warning">Echoué</span>
          </td>
        )}

        <td>
          <button
            onClick={handleModalOpen}
            type="button"
            className="btn btn-sm btn-light"
          >
            Details
          </button>
          <OldPredictionModal
            RowId={prediction.RowId}
            showModal={showModal}
            handleClose={handleModalClose}
          />
        </td>
      </tr>
    );
  };
  const Tables = predictions.map((prediction, index) => (
    <Row key={prediction.RowId} prediction={prediction} />
  ));

  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Anciennes prédictions</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    {/* <li className="breadcrumb-item">
                    <a href="javascript: void(0);">Prédiction de projet</a>
                  </li> */}
                    {/* <li className="breadcrumb-item active">Form Layout</li> */}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-xxl-12">
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Anciennes prédictions{" "}
                  </h4>
                  <div className="flex-shrink-0"></div>
                </div>
                {/* end card header */}
                <div className="card-body">
                  <div className="table-responsive table-card">
                    <table className="table table-nowrap table-striped-columns mb-0">
                      <thead className="table-light">
                        <tr>
                          <th scope="col">Projet Id</th>
                          <th scope="col">Status</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody>{Tables}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* end col */}
          </div>
        </div>{" "}
        {/* container-fluid */}
      </div>
      {/* End Page-content */}
    </div>
  );
}
