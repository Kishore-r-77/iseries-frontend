import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Paper } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import styles from "./ruleHeader.module.css";
import { useNavigate } from "react-router";
import { useRuleKey } from "../../../contexts/RuleKeyContext";

function RuleHeaderTable({
  data,
  dataIndex,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  hardDelete,
  modalFunc,
  showClone,
  handleRuleKeyOpen,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

  const navigate = useNavigate();

  const { setruleHeaderObj } = useRuleKey();

  const handleRuleKeyComponent = (obj: any) => {
    setruleHeaderObj(obj);
    handleRuleKeyOpen();
    navigate("/ruleKey");
  };

  return (
    <Paper className={styles.paperStyle}>
      <Table striped bordered hover>
        <thead className={styles.header}>
          <tr>
            {columns?.map(
              (
                column: {
                  field: string;
                  header: string;
                  dbField: string;
                  sortable: boolean;
                },
                index: number
              ) => (
                <th key={column.dbField} className={styles.header}>
                  {column.header}
                  {column?.sortable && (
                    <span>
                      <IconButton
                        onClick={() => {
                          setsort({
                            fieldName: column.dbField,
                            order: "asc",
                          });

                          return dispatch({
                            type: ACTIONS.SORT_ASC,
                            payload: column.dbField,
                          });
                        }}
                      >
                        <ArrowUpwardIcon
                          className={
                            sort.fieldName === column.dbField &&
                            sort.order === "asc"
                              ? styles.icon
                              : styles["icon-disabled"]
                          }
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setsort({
                            fieldName: column.dbField,
                            order: "desc",
                          });

                          dispatch({
                            type: ACTIONS.SORT_DESC,
                            payload: column.dbField,
                          });
                        }}
                      >
                        <ArrowDownwardIcon
                          className={
                            sort.fieldName === column.dbField &&
                            sort.order === "desc"
                              ? styles.icon
                              : styles["icon-disabled"]
                          }
                        />
                      </IconButton>
                    </span>
                  )}
                </th>
              )
            )}
            <th className={styles.header}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr
              onClick={() => modalFunc(row, dataIndex?.index)}
              key={row.ID}
              className={styles["table-cell"]}
            >
              {columns.map((col: { field: string; type: string }) => {
                if (col?.type === "date") {
                  return (
                    <td key={col?.field}>
                      {moment(row[col?.field]).format("DD-MM-YYYY")}
                    </td>
                  );
                }
                return <td key={col?.field}>{row[col?.field]}</td>;
              })}

              <td>
                <span className={styles.flexButtons}>
                  {!!ACTIONS.EDITOPEN && (
                    <>
                      {" "}
                      <EditIcon
                        color="primary"
                        onClick={() =>
                          dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                        }
                      />
                      <DeleteIcon
                        color="error"
                        onClick={() => hardDelete(row.ID)}
                      />
                    </>
                  )}
                  <InfoIcon onClick={() => handleRuleKeyComponent(row)} />
                  {showClone && (
                    <ContentCopyIcon
                      onClick={() =>
                        dispatch({ type: ACTIONS.CLONEOPEN, payload: row })
                      }
                    />
                  )}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

export default RuleHeaderTable;
