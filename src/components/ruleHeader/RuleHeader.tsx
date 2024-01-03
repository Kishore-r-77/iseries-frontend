import AddBoxIcon from "@mui/icons-material/AddBox";
import SearchIcon from "@mui/icons-material/Search";
import { Button, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useSignIn } from "../../contexts/SignInContext";
import Notification from "../../utilities/notification/Notification";
import styles from "./ruleHeader.module.css";
import { addApi, editApi } from "./ruleHeaderApis/ruleHeaderApi";
import RuleHeaderModal from "./ruleHeaderModal/RuleHeaderModal";
import RuleHeaderTable from "./ruleHeaderTable/RuleHeaderTable";
import {
  ACTIONS,
  columns,
  initialValues,
} from "./ruleTypesActions/ruleHeaderActions";
import { useRuleKey } from "../../contexts/RuleKeyContext";

function RuleHeader() {
  //data from getall api

  const { authResponse } = useSignIn();

  const token = authResponse?.accessToken;

  const { getRuleKeysData, handleRuleKeyOpen, ruleHeaderData, getRuleHeader } =
    useRuleKey();

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        if (action.fieldName === "ruleType") {
          return {
            ...state,
            data: {
              ...state.data,
              [action.fieldName]: action.payload,
            },
          };
        }
        return {
          ...state,
          [action.fieldName]: action.payload,
        };

      case ACTIONS.EDITCHANGE:
        setRecord((prev: any) => ({
          ...prev,
          [action.fieldName]: action.payload,
        }));
        return {
          ...state,
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
      case ACTIONS.RULEKEYOPEN:
        setRecord(action.payload);
        return {
          ...state,
          ruleKeyOpen: true,
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
      case ACTIONS.RULEKEYCLOSE:
        return {
          ...state,
          ruleKeyOpen: false,
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
        getRuleHeader();
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
        getRuleHeader();
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
    getRuleHeader();
    return () => {};
  }, []);

  useEffect(() => {
    getRuleKeysData();
    return () => {};
  }, [state.ruleKeyOpen]);

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
            onClick={getRuleHeader}
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

        <h1>Rule Header</h1>
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
      <RuleHeaderTable
        data={ruleHeaderData}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
        handleRuleKeyOpen={handleRuleKeyOpen}
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
