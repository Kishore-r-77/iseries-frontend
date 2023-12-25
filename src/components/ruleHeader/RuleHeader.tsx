import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useSignIn } from "../../contexts/SignInContext";
import Notification from "../../utilities/notification/Notification";
import CustomTable from "../../utilities/table/CustomTable";
import styles from "./ruleHeader.module.css";
import { addApi, editApi, getAllApi } from "./ruleHeaderApis/ruleHeaderApi";
import RuleHeaderModal from "./ruleHeaderModal/RuleHeaderModal";
import {
  ACTIONS,
  columns,
  initialValues,
} from "./ruleTypesActions/ruleHeaderActions";

function RuleHeader() {
  //data from getall api
  const [data, setData] = useState([]);
  const { authResponse } = useSignIn();

  const token = authResponse?.accessToken;

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Function for Conversion of Base64
  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        if (action.fieldName === "CompanyLogo") {
          convertBase64(action.payload).then((resp) => {
            return {
              ...state,
              CompanyLogo: resp,
            };
          });
        } else
          return {
            ...state,
            [action.fieldName]: action.payload,
          };

        return {
          ...state,
          addOpen: true,
        };

      case ACTIONS.EDITCHANGE:
        setRecord((prev: any) => ({
          ...prev,
          [action.fieldName]: action.payload,
        }));
        return {
          ...state,
          editOpen: true,
        };
      case ACTIONS.ADDOPEN:
        return {
          ...state,
          addOpen: true,
        };
      case ACTIONS.EDITOPEN:
        setRecord(action.payload);
        return {
          ...state,
          editOpen: true,
        };

      case ACTIONS.INFOOPEN:
        setRecord(action.payload);
        return {
          ...state,
          infoOpen: true,
        };

      case ACTIONS.ADDCLOSE:
        state = initialValues;
        return {
          ...state,
          addOpen: false,
        };

      case ACTIONS.EDITCLOSE:
        return {
          ...state,
          editOpen: false,
        };
      case ACTIONS.INFOCLOSE:
        return {
          ...state,
          infoOpen: false,
        };
      case ACTIONS.SORT_ASC:
        const asc = !state.sortAsc;
        if (state.sortDesc) {
          state.sortDesc = false;
        }
        return {
          ...state,
          sortAsc: asc,
          sortColumn: action.payload,
        };
      case ACTIONS.SORT_DESC:
        const desc = !state.sortDesc;
        if (state.sortAsc) {
          state.sortAsc = false;
        }
        return {
          ...state,
          sortDesc: desc,
          sortColumn: action.payload,
        };
      default:
        return initialValues;
    }
  };

  //Creating useReducer Hook
  const [state, dispatch] = useReducer(reducer, initialValues);

  //Get all Api
  const getData = () => {
    return getAllApi(token!)
      .then((resp) => {
        setData(resp?.data?.body?.data);
      })
      .catch((err) => console.log(err.message));
  };

  //Add Api
  const handleFormSubmit = () => {
    return addApi(state, token!)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created: ${resp?.data?.Result}`,
          type: "success",
        });
        getData();
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  //Edit Api
  const editFormSubmit = async () => {
    editApi(record, token!)
      .then((resp) => {
        setNotify({
          isOpen: true,
          message: `Updated:${resp.data?.outputs?.ID}`,
          type: "success",
        });
        dispatch({ type: ACTIONS.EDITCLOSE });
        getData();
      })
      .catch((err) =>
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        })
      );
  };

  //UseEffect Function to render data on Screen Based on Dependencies
  useEffect(() => {
    getData();
    return () => {};
  }, []);

  return (
    <div>
      <header className={styles.flexStyle}>
        <span className={styles["text-fields"]}>
          <TextField
            value={state.searchString}
            placeholder="Search String"
            label="Search String"
            onChange={(e) =>
              dispatch({
                type: ACTIONS.ONCHANGE,
                payload: e.target.value,
                fieldName: "searchString",
              })
            }
            style={{ width: "12rem" }}
          />
          <Button
            variant="contained"
            onClick={getData}
            color="primary"
            style={{
              marginTop: "0.5rem",
              maxWidth: "40px",
              maxHeight: "40px",
              minWidth: "40px",
              minHeight: "40px",
              backgroundColor: "#0a3161",
              marginLeft: "10px",
            }}
          >
            <SearchIcon />
          </Button>
        </span>

        <h1>Biz Rules</h1>
        <Button
          id={styles["add-btn"]}
          style={{
            marginTop: "1rem",
            maxWidth: "40px",
            maxHeight: "40px",
            minWidth: "40px",
            minHeight: "40px",
            backgroundColor: "#0a3161",
          }}
          variant="contained"
          color="primary"
          onClick={() => dispatch({ type: ACTIONS.ADDOPEN })}
        >
          <AddBoxIcon />
        </Button>
      </header>
      <CustomTable
        data={data}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
      />

      <RuleHeaderModal
        state={state}
        record={record}
        dispatch={dispatch}
        handleFormSubmit={state.addOpen ? handleFormSubmit : editFormSubmit}
        ACTIONS={ACTIONS}
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default RuleHeader;
