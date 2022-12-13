import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Input, Label, FormGroup } from "reactstrap";

const SearchData = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [actionType, setActionType] = useState();
  const [applicationType, setApplicationType] = useState();
  const [applicationId, setApplicationId] = useState();
  const [search, setSearch] = useState({ start: "", end: "" });


  const buttonSubmit = () => {
    const temp = { actionType, applicationType, applicationId, search }


    props.handleFilter(temp)


    let urlStr = "?";
    for (let [key, value] of Object.entries(temp)) {
      console.log("key", key, value)
      if (value) {
        if (urlStr.length === 1 && urlStr === '?')
          urlStr = urlStr + key + "=" + value;
        else
          urlStr = urlStr + '&' + key + "=" + value;
      }
    }

    if (search.start && search.end) {
      if (urlStr.length === 1 && urlStr === '?')
        urlStr = urlStr + "startDate=" + search.start + "&endDate=" + search.end;
      else
        urlStr = urlStr + "&startdate=" + search.start + "&toDenddatete=" + search.end;
    }
    if (actionType === "Select ActionType" || applicationType === "Select ApplicationType") {
      navigate("/")
      window.location.reload(false)
    }
    navigate({ pathname: "/", search: `${urlStr} ` })
  }

  let filtered;
  let filteredNames;
  if (props.optionData) {
    const ids = props.optionData.map(val => val.actionType)
    filtered = props.optionData.filter(({ actionType }, index) => !ids.includes(actionType, index + 1))

    const names = props.optionData.map(val => val.applicationType)
    filteredNames = props.optionData.filter(({ applicationType }, index) => !names.includes(applicationType, index + 1))
  }

  let actionSearch;
  let applicationSearch;
  if (location.search) {
    const searchData = location.search;
    const searchData1 = searchData.split("=")[0]
    const searchData2 = searchData.split("=")[1]

    if (searchData1 === "?applicationType") {
      applicationSearch = searchData2
    }
    else if (searchData1 === "?actionType") {
      actionSearch = searchData2

    }
  }


  return (
    <>

      <Container>
        <Row>
          <Col className="mb-3">
            <Label>{"ActionType"}</Label>

            <select name="actionType" defaultValue={actionType} data-testid="select-toogle" id="select-toogle" onChange={(e) => setActionType(e.target.value)}
              className="option1">
              <option value="Select ActionType" onClick={() => { navigate("/"); window.location.reload() }}>Select ActionType</option>
              <option value="none" disabled hidden>{actionSearch}</option>
              {props.optionData &&
                filtered.map((val, i) => {
                  if (val.actionType !== null) {
                    return (
                      <option key={i} value={val.actionType}>
                        {val.actionType}
                      </option>
                    )
                  }
                })}
            </select>
          </Col>
          <Col className="mb-3 option">
            <FormGroup>
              <Label>{"ApplicationTypes"}</Label>
              <select name="applicationType" defaultValue={applicationType} data-testid="select-toogleApp" id="select-toogleApp" onChange={(e) => setApplicationType(e.target.value)}
                className="option1">
                <option value="Select ApplicationType">Select ApplicationType</option>
                <option value="none" disabled hidden>{applicationSearch}</option>
                {props.optionData &&
                  filteredNames.map((val, i) => {
                    if (val.applicationType !== null) {
                      return (
                        <option key={i} value={val.applicationType}>
                          {val.applicationType}
                        </option>
                      )
                    }
                  })}
              </select>
            </FormGroup>
          </Col>
          <Col className="mb-3">
            <FormGroup>
              <Label>{"ApplicationId"}</Label>
              <Input
                className="form-control"
                data-testid="application-Id"
                id="application-Id"
                type="text"
                onChange={(e) => setApplicationId(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col className="mb-3">
            <FormGroup>
              <Label>{"Start Dtae"}</Label>
              <Input
                className="form-control"
                data-testid="start-date"
                value={search.start}
                onChange={(e) => setSearch({ ...search, start: e.target.value })}
                type="date"
              />
            </FormGroup>
          </Col>
          <Col className="mb-3">
            <FormGroup>
              <Label>{"End Dtae"}</Label>
              <Input
                className="form-control"
                data-testid="end-date"
                value={search.end}
                onChange={(e) => setSearch({ ...search, end: e.target.value })}
                type="date"
              />
            </FormGroup>
          </Col>
          <Col className="py-2">
            <button
              type="button"
              data-testid="search-button"
              className="btn btn-primary my-4"
              onClick={() => buttonSubmit()}
            >
              Search logger
            </button>
          </Col>
        </Row>
      </Container >
    </>
  );
};

export default SearchData;
