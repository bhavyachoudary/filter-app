import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Button,
} from "reactstrap";
import SearchData from "./SearchData";
import "./data.css";


const Alldata = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [datas, setDatas] = useState([]);
  const [totalPage, settotalPage] = useState([]);
  const [totalData, setTotalData] = useState([]);
  const [currentPage, setcurrentPage] = useState(0);
  const [dataHolder, setDataHolder] = useState([]);
  const [apiData, setApiData] = useState([]);
  const [flag, setflag] = useState({
    user: false,
  });

  useEffect(() => {
    fetchLogs();

  }, [])

  const fetchLogs = async () => {
    await axios
      .get("https://run.mocky.io/v3/a2fbc23e-069e-4ba5-954c-cd910986f40f")
      .then((res) => {
        // console.log(res, "sdasds");
        setApiData(res.data.result.auditLog)
        setDataHolder(res.data.result.auditLog);

        if (location.search) {
          let temp = JSON.parse('{"' + decodeURI(location.search.substring(1).replace(/&/g, "\",\"").replace(/=/g, "\":\"")) + '"}')
          console.log(temp, "urldata")
          handleFilter(temp, res.data.result.auditLog)
        }
        else {
          setDatas(res.data.result.auditLog);
          setTotalData(res.data.result.auditLog);
          settotalPage(
            Array.from(
              { length: Math.ceil(res.data.result.auditLog.length / 10) },
              (v, i) => i + 1
            )
          );
          getCount(1, res.data.result.auditLog);
        }
      })
      .catch((err) => {
        console.log(err.response); console.log("error", err)
        // toast.error(err.response.error);
      });

  };

  const getCount = (id, data) => {
    console.log(data, id, "data");
    const temp = Array.from(
      { length: Math.ceil(data.length / 10) },
      (v, i) => i + 1
    );
    if (id > 0 && temp[temp.length - 1] >= id) {
      const temp = data.filter((ele, i) => i < id * 10 && i >= id * 10 - 10);
      setcurrentPage(id);
      setDatas(temp);
    }
    if (data.length === 0) {
      setDatas([]);

    }
    // else {
    //   setDatas(data);
    // }
  };

  const sortByLogId = (id) => {
    const result = totalData.sort((x, y) => x.logId - y.logId);
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };

  const sortApplicationType = (id) => {
    const result = totalData.sort(
      (x, y) =>
        x.applicationType && x.applicationType.localeCompare(y.applicationType)
    );
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };
  const sortApplicationId = (id) => {
    const result = totalData.sort((x, y) => x.applicationId - y.applicationId);
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };

  const sortByActionType = (id) => {
    const result = totalData.sort(
      (x, y) => x.actionType && x.actionType.localeCompare(y.actionType)
    );
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };

  const sortByCompanyId = (id) => {
    const result = totalData.sort((x, y) => x.companyId - y.companyId);
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };

  const sortByDate = (id) => {
    const result = totalData.sort((x, y) =>
      x.creationTimestamp.localeCompare(y.creationTimestamp)
    );
    if (flag.user) {
      result.reverse();
    }
    setDatas(result);
    settotalPage(
      Array.from({ length: Math.ceil(result.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, result);
    setflag({ user: !flag.user });
  };

  const handleFilter = (data, urlData = []) => {
    let temp = urlData.length === 0 ? dataHolder : urlData
    //actionType
    if (data.actionType) {
      console.log("actiontype")
      let search = data.actionType.trim().toLowerCase();
      if (search !== "") {
        temp = temp.filter((ele) => {
          if (ele["actionType"] && ele["actionType"].toLowerCase().includes(search)) {
            return ele;
          }
        })
      }
    }
    //applicationType
    if (data.applicationType) {
      console.log("applicationtype")
      let search = data.applicationType.trim().toLowerCase();
      if (search !== "") {
        temp = temp.filter((ele) => {
          if (ele["applicationType"] && ele["applicationType"].toLowerCase().includes(search)) {
            return ele;
          }
        });
        console.log(temp, "193")
      }
    }
    //appId
    if (data.applicationId) {
      console.log("applicationtyid")
      let search = data.applicationId
      if (search !== "") {
        temp = temp.filter((ele) => {
          if (ele["applicationId"] && ele["applicationId"].toString().includes(search)) {
            return ele;
          }
        });
      }
    }

    if (data.search && data.search?.start !== "") {
      console.log("startdate")
      const start = new Date(data.search.start).getTime();
      temp = temp.filter((ele) => {
        if (ele["creationTimestamp"]) {
          const date = new Date(ele["creationTimestamp"]).getTime();
          console.log(date, "start date")
          if (date >= start) {
            return ele;
          }
        }
      });
    }
    //Enddate
    if (data.search && data.search?.end !== "") {
      console.log("end")
      const end = new Date(data.search.end).getTime();
      temp = temp.filter((ele) => {
        if (ele["creationTimestamp"]) {
          const date = new Date(ele["creationTimestamp"]).getTime();
          console.log(date, "end date")
          if (date <= end) {
            return ele;
          }
        }
      });



    }
    setTotalData(temp);
    settotalPage(
      Array.from({ length: Math.ceil(temp.length / 10) }, (v, i) => i + 1)
    );
    getCount(1, temp);

  }

  const Home = () => {
    navigate("/");
    window.location.reload(false)
  }

  return (
    <Fragment>
      <Container fluid={true}>
        <Button onClick={() => Home()} data-testid="home">Home</Button>
        <Row>
          <Col>
            <div className="p-4 m-10 !important">
              <SearchData
                datas={datas}
                optionData={apiData}
                handleFilter={handleFilter}
              />
            </div>
            <div className="p-4 m-10 !important">
              <Table striped className="m-10">
                <thead>
                  <tr>
                    <th>
                      Log Id
                      <i
                        className="fa fa-sort"
                        data-testid="log-id"
                        onClick={() => sortByLogId()}
                      ></i>
                    </th>
                    <th>
                      Application Type
                      <i
                        className="fa fa-sort"
                        data-testid="App-Type"
                        onClick={() => sortApplicationType()}
                      ></i>
                    </th>
                    <th>
                      Application Id
                      <i
                        className="fa  fa-sort"
                        data-testid="App-Id"
                        onClick={() => sortApplicationId()}
                      ></i>
                    </th>
                    <th>
                      Company Id
                      <i
                        className="fa fa-sort"
                        data-testid="Comp-id"
                        onClick={() => sortByCompanyId()}
                      ></i>
                    </th>
                    <th>
                      Action Type
                      <i
                        className="fa  fa-sort"
                        data-testid="Action-Type"
                        onClick={() => sortByActionType()}
                      ></i>
                    </th>
                    <th>
                      Date : Time
                      <i
                        className="fa fa-sort"
                        data-testid="Sort-Date"
                        onClick={() => sortByDate()}
                      ></i>
                    </th>
                  </tr>
                </thead>
                <tbody>

                  {datas.map((data, i) => {
                    return (
                      <tr key={i}>
                        <td>{data.logId}</td>
                        <td>{data.applicationType}</td>
                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              {data.applicationId}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              {data.companyId}
                            </div>
                          </div>
                        </td>

                        <td>
                          <div className="d-inline-block align-middle">
                            <div className="d-inline-block">
                              <span>{data.actionType}</span>
                            </div>
                          </div>
                        </td>

                        <td>
                          <div>
                            {moment(data.creationTimestamp).format("DD-MMMM-YYYY hh:mm A")}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                  }
                </tbody>
              </Table>
            </div>
            <div className="d-flex justify-content-center">
              <Pagination aria-label="Page navigation" data-testid="pagination">
                <PaginationItem>
                  <PaginationLink data-testid="pagination-prev"
                    onClick={() => getCount(currentPage - 1, totalData)}
                  >
                    <span aria-hidden="true">«</span>
                    <span className="sr-only">{"Previous"}</span>
                  </PaginationLink>
                </PaginationItem>
                {totalPage.map((ele) => (
                  <PaginationItem>
                    <PaginationLink onClick={() => getCount(ele, totalData)}>
                      {ele}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationLink data-testid="pagination-fwd"
                    onClick={() => getCount(currentPage + 1, totalData)}
                  >
                    <span aria-hidden="true">»</span>
                    <span className="sr-only">{"Next"}</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment >
  );
};

export default Alldata;
