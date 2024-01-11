import AddBoxIcon from "@mui/icons-material/AddBox";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button, TextField } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { useRuleKey } from "../../../contexts/RuleKeyContext";
import { useSignIn } from "../../../contexts/SignInContext";
import Notification from "../../../utilities/notification/Notification";
import RuleKeyTable from "./ruleKeyTable/RuleKeyTable";
import styles from "./ruleKeys.module.css";
import { addRuleKey, modifyRuleKey } from "./ruleKeysApi/ruleKeysApi";
import RuleKeyAddModal from "./ruleKeysModal/RuleKeyAddModal";
import RuleKeyDataModal from "./ruleKeysModal/RuleKeyDataModal";
import {
  ACTIONS,
  columns,
  initialValues,
} from "./ruleTypesActions/ruleKeysActions";

function RuleKeys() {
  const navigate = useNavigate();

  //data got after rendering from table
  const [record, setRecord] = useState<any>({});
  const { authResponse } = useSignIn();
  const [ruleKeyObj, setRuleKeyObj] = useState<any>({});

  const token = authResponse?.accessToken;
  const { ruleKeyData, getRuleKeysData } = useRuleKey();

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  //Reducer Function to be used inside UserReducer hook
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
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

  const handleFormSubmit = () => {
    return addRuleKey(state, token!)
      .then((resp) => {
        dispatch({ type: ACTIONS.ADDCLOSE });
        setNotify({
          isOpen: true,
          message: `Created: ${resp?.data?.Result}`,
          type: "success",
        });
        getRuleKeysData();
        modifyRuleKey(state, token, state.data, true)
          .then((_resp) => {
            let parsedRuleKeyData = record?.data ? JSON.parse(record.data) : {};
            setRuleKeyObj(parsedRuleKeyData);
            getRuleKeysData();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  useEffect(() => {
    getRuleKeysData();
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
        </span>

        <h1>Rule Keys</h1>
        <Button
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
          onClick={() => {
            navigate("/ruleHeader");
            sessionStorage.removeItem("ruleHeaderObject");
          }}
        >
          <ArrowBackIcon />
        </Button>
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
      <RuleKeyTable
        data={ruleKeyData}
        columns={columns}
        ACTIONS={ACTIONS}
        dispatch={dispatch}
      />

      {/* <RuleKeysModal
        state={state}
        record={record}
        dispatch={dispatch}
        ACTIONS={ACTIONS}
      /> */}
      <RuleKeyAddModal
        state={state}
        record={record}
        dispatch={dispatch}
        ACTIONS={ACTIONS}
        handleFormSubmit={handleFormSubmit}
      />
      <RuleKeyDataModal
        state={state}
        record={record}
        ruleKeyData={ruleKeyObj}
        setRuleKeyData={setRuleKeyObj}
        handleClose={
          state.editOpen
            ? () => dispatch({ type: ACTIONS.EDITCLOSE })
            : () => dispatch({ type: ACTIONS.INFOCLOSE })
        }
      />
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
}

export default RuleKeys;
