import React from "react";

export default function ResultPredictionModal({
  done,
  showModal,
  handleClose,
}) {
  const modalId = `exampleModal5-${done}`;

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
                Le résultat de prédiction
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
              {" "}
              {done == "The cancellation of this project is predicted." ? (
                <>
                  {/* success Alert */}
                  <div className="alert alert-warning" role="alert">
                     <p style={{alignItems:"center",justifyContent:"center",marginRight:"100px"}}> <strong>L'annulation de ce projet est prévue.</strong></p>
                  </div>
                </>
              ) : (
                <>
                  {/* success Alert */}
                  <div className="alert alert-success" role="alert">
                 <p style={{alignItems:"center",justifyContent:"center",marginRight:"100px"}}> <strong>Ce projet devrait être un succès.</strong></p>
                  </div>
                </>
              )}
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
