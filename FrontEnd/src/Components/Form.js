import React from "react";
import { useState } from "react";
import axios from "axios";
import ResultPredictionModal from "./ResultPredictionModal";
export default function Form() {
  const [feautures, setFeautures] = useState({
    "Project Size": 0,
    "Project Duration": 0,
    "Program ID": 0,
    "Business Case Id": 0,
    Expenses_amount_mean: 0,
    Expenses_amount_max: 0,
    Expenses_amount_min: 0,
    Expenses_amount_std: 0,
    Expenses_slope_mean: 0,
    Expenses_slope_max: 0,
    Expenses_slope_min: 0,
    Expenses_slope_std: 0,
    Horizon: 0,
    "External Labor_amount_mean": 0,
    "External Labor_amount_max": 0,
    "External Labor_amount_min": 0,
    "External Labor_amount_std": 0,
    "External Labor_slope_mean": 0,
    "External Labor_slope_max": 0,
    "External Labor_slope_min": 0,
    "External Labor_slope_std": 0,
    "Internal Labor_amount_mean": 0,
    "Internal Labor_amount_max": 0,
    "Internal Labor_amount_min": 0,
    "Internal Labor_amount_std": 0,
    "Internal Labor_slope_mean": 0,
    "Internal Labor_slope_max": 0,
    "Internal Labor_slope_min": 0,
    "Internal Labor_slope_std": 0,
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFeautures({ ...feautures, [name]: parseFloat(value) || 0.0 });
  };
  const [dropDowns, setDropDowns] = useState({
    "Portfolio Folder L1": 0,
    nature: 0,
    Framework: 0,
    "Program Holder": 0,
  });
  const handleInputChange2 = (event) => {
    const { name, value } = event.target;
    setDropDowns({ ...dropDowns, [name]: parseInt(value) || 0 });
  };

  const [selected, setSelected] = useState({
    ADAP: 0,
    ADVA: 0,
    Epic: 0,
    INCU: 0,
    "Multi Value": 0,
    NEW: 1,
    OBSC: 0,
    ORGA: 0,
    Offer: 0,
    PRED: 0,
    PROD: 0,
    QUAL: 0,
    SUPP: 0,
    WITH: 0,
    XPLO: 0,
  });

  const handleSelectChange = (event) => {
    const newSelected = {
      ...selected,
      [event.target.value]: 1,
    };

    for (const key in newSelected) {
      if (key !== event.target.value) {
        newSelected[key] = 0;
      }
    }

    setSelected(newSelected);
  };

  const concatenatedJSON = { ...dropDowns, ...selected, ...feautures };

  const [done, setDone] = useState([]);

  const sendPredictRequest = () => {
    const jsonString = JSON.stringify(concatenatedJSON, null, 2);
    const apiUrl = "http://localhost:5000/predict"; // Change this to your API URL

    // Set up headers with the correct Content-Type
    const headers = {
      "Content-Type": "application/json",
    };

    // Send the POST request using Axios
    axios
      .post(apiUrl, jsonString, { headers })
      .then((response) => {
        setDone(response.data);
        handleModalOpen();
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle the error here, e.g., show an error message
      });
  };
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  console.log(concatenatedJSON)
  return (
    <>
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                  <h4 className="mb-sm-0">Page de prédiction</h4>
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
                      Merci de remplir tous les champs
                    </h4>
                    <div className="flex-shrink-0"></div>
                  </div>
                  {/* end card header */}
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Portfolio Folder L1
                          </label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name="Portfolio Folder L1"
                            value={dropDowns["Portfolio Folder L1"]}
                            onChange={handleInputChange2}
                          >
                            <option value={0}>Energy Management</option>
                            <option value={1}>Industrial Automation</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Nature
                          </label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name="nature"
                            value={dropDowns.nature}
                            onChange={handleInputChange2}
                          >
                            <option value={0}>Project</option>
                            <option value={1}>Agile</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Program Holder
                          </label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name="Program Holder"
                            value={dropDowns["Program Holder"]}
                            onChange={handleInputChange2}
                          >
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Framework
                          </label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name="Framework"
                            value={dropDowns.Framework}
                            onChange={handleInputChange2}
                          >
                            <option value={0}>Waterfall</option>
                            <option value={1}>Agile</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Program ID
                          </label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name="Program ID"
                            value={feautures["Program ID"]}
                            onChange={handleInputChange}
                          >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Business Case Id
                          </label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name="Business Case Id"
                            value={feautures["Business Case Id"]}
                            onChange={handleInputChange}
                          >
                            <option value={0}>0</option>
                            <option value={1}>1</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Horizon
                          </label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            name="Horizon"
                            value={feautures.Horizon}
                            onChange={handleInputChange}
                          >
                            <option value={0}>H1 - Core</option>
                            <option value={0.5}>H2 - Adjacent</option>
                            <option value={1}>H3 - Disruptive</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Project Size
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Project Size"
                            name="Project Size"
                            value={feautures["Project Size"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Project Duration
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Project Duration"
                            name="Project Duration"
                            value={feautures["Project Duration"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Expenses_amount_mean
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Expenses_amount_mean"
                            name="Expenses_amount_mean"
                            value={feautures.Expenses_amount_mean}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Expenses_amount_max
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            name="Expenses_amount_max"
                            value={feautures.Expenses_amount_max}
                            onChange={handleInputChange}
                            placeholder="Expenses_amount_max"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Expenses_amount_min
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            name="Expenses_amount_min"
                            value={feautures.Expenses_amount_min}
                            onChange={handleInputChange}
                            placeholder="Expenses_amount_min"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Expenses_amount_std
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Expenses_amount_std"
                            name="Expenses_amount_std"
                            value={feautures.Expenses_amount_std}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Expenses_slope_mean
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Expenses_slope_mean"
                            name="Expenses_slope_mean"
                            value={feautures.Expenses_slope_mean}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Expenses_slope_max
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Expenses_slope_max"
                            name="Expenses_slope_max"
                            value={feautures.Expenses_slope_max}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Expenses_slope_min
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Expenses_slope_min"
                            name="Expenses_slope_min"
                            value={feautures.Expenses_slope_min}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Expenses_slope_std
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Expenses_slope_std"
                            name="Expenses_slope_std"
                            value={feautures.Expenses_slope_std}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            External Labor_amount_mean
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="External Labor_amount_mean"
                            name="External Labor_amount_mean"
                            value={feautures["External Labor_amount_mean"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            External Labor_amount_max
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="External Labor_amount_max"
                            name="External Labor_amount_max"
                            value={feautures["External Labor_amount_max"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            External Labor_amount_min
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="External Labor_amount_min"
                            name="External Labor_amount_min"
                            value={feautures["External Labor_amount_min"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            External Labor_amount_std
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="External Labor_amount_std"
                            name="External Labor_amount_std"
                            value={feautures["External Labor_amount_std"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            External Labor_slope_mean
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="External Labor_slope_mean"
                            name="External Labor_slope_mean"
                            value={feautures["External Labor_slope_mean"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            External Labor_slope_max
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="External Labor_slope_max"
                            name="External Labor_slope_max"
                            value={feautures["External Labor_slope_max"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            External Labor_slope_min
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="External Labor_slope_min"
                            name="External Labor_slope_min"
                            value={feautures["External Labor_slope_min"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            External Labor_slope_std
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="External Labor_slope_std"
                            name="External Labor_slope_std"
                            value={feautures["External Labor_slope_std"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Internal Labor_amount_mean
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Internal Labor_amount_mean"
                            name="Internal Labor_amount_mean"
                            value={feautures["Internal Labor_amount_mean"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Internal Labor_amount_max
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Internal Labor_amount_max"
                            name="Internal Labor_amount_max"
                            value={feautures["Internal Labor_amount_max"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Internal Labor_amount_min
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Internal Labor_amount_min"
                            name="Internal Labor_amount_min"
                            value={feautures["Internal Labor_amount_min"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Internal Labor_amount_std
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Internal Labor_amount_std"
                            name="Internal Labor_amount_std"
                            value={feautures["Internal Labor_amount_std"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Internal Labor_slope_mean
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Internal Labor_slope_mean"
                            name="Internal Labor_slope_mean"
                            value={feautures["Internal Labor_slope_mean"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Internal Labor_slope_max
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Internal Labor_slope_max"
                            name="Internal Labor_slope_max"
                            value={feautures["Internal Labor_slope_max"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Internal Labor_slope_min
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Internal Labor_slope_mean"
                            name="Internal Labor_slope_min"
                            value={feautures["Internal Labor_slope_min"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Internal Labor_slope_std
                          </label>
                          <input
                            className="form-control"
                            type="number"
                            placeholder="Internal Labor_slope_std"
                            name="Internal Labor_slope_std"
                            value={feautures["Internal Labor_slope_std"]}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="mb-3">
                          <label
                            htmlFor="firstNameinput"
                            className="form-label"
                          >
                            Project type
                          </label>
                          <select
                            className="form-select mb-3"
                            aria-label="Default select example"
                            onChange={handleSelectChange}
                          >
                            <option disabled selected>
                              Open this select menu
                            </option>
                            {Object.keys(selected).map((key) => (
                              <option key={key}>{key}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="text-end">
                          <button
                            onClick={sendPredictRequest}
                            type="submit"
                            className="btn btn-primary"
                          >
                            Predict
                          </button>
                          <ResultPredictionModal
                            done={done.result}
                            showModal={showModal}
                            handleClose={handleModalClose}
                          />
                        </div>
                      </div>
                      {/*end col*/}
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
    </>
  );
}
