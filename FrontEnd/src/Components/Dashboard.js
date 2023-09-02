import React from "react";
import predictionService from "../services/prediction.service";
import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
export default function Dashboard() {
  const [success, setSuccess] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const retrieveExpensesStats = () => {
    predictionService
      .ExpensesStat()
      .then((response) => {
        setExpenses(response.data.predictionStat[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveSuccessStats = () => {
    predictionService
      .PredictionsSuccessStat()
      .then((response) => {
        setSuccess(response.data.predictionStat[0]);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveExpensesStats();
    retrieveSuccessStats();
  }, []);


  function Barchart() {
    const series = [
     {
        data: expenses.map((item) => Number(item?.value || 0)),
      },
    ];

    const options = {
      chart: {
        type: "bar",
        height: 380,
      },
      plotOptions: {
        bar: {
          barHeight: "100%",
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: "bottom",
          },
        },
      },
      colors: [
        "#00BFFF",
        "#77B5FE",
        "#6495ED",
        "#5472AE",
        "#4682B4",
        "#1E90FF",
        "#318CE7",
        "#007FFF",
        "#2C75FF",
        "#4169E1",
        "#1560BD",
      ],
      dataLabels: {
        enabled: true,
        textAnchor: "start",
        style: {
          colors: ["#fff"],
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
        },
        offsetX: 0,
        dropShadow: {
          enabled: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      xaxis: {
        categories: expenses.map((item) => item?.key || ""),
      },
      yaxis: {
        labels: {
          show: false,
        },
      },
      title: {
        text: "Mean expenses stats",
        align: "center",
        floating: true,
      },
      tooltip: {
        theme: "dark",
        x: {
          show: false,
        },
        y: {
          title: {
            formatter: function () {
              return "";
            },
          },
        },
      },
    };

    return (
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={380}
        />
      </div>
    );
  }
  function Piechart() {
    const series = success.map((item) => Number(item?.value || 0));
  
    const options = {
      chart: {
        type: "pie",
        height: 380,
      },
      labels: success.map((item) => item?.key ),
      dataLabels: {
        formatter: function (val) {
          return String(val);
        },
      },
    };
  
    return (
      <div id="piechart">
        <ReactApexChart options={options} series={series} type="pie" height={380} />
      </div>
    );
  }
  console.log(success)
  return (
    <div className="main-content">
      <div className="page-content">
        <div className="container-fluid">
          {/* start page title */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0">Dashboard</h4>
                <div className="page-title-right">
                  <ol className="breadcrumb m-0"></ol>
                </div>
              </div>
            </div>
          </div>
          {/* end page title */}
          <div className="row">
            <div className="col-xxl-12">
              <div className="card">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">Dashboard</h4>
                  <div className="flex-shrink-0"></div>
                </div>
                {/* end card header */}
                <div className="card-body">

                <Barchart/>
<Piechart/>
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
