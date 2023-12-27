import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Paper } from "@mui/material";
import moment from "moment";
import Table from "react-bootstrap/Table";
import styles from "./rulekeyTable.module.css";

function RuleKeyTable({ data, columns, dispatch, ACTIONS }: any) {
  return (
    <Paper className={styles.paperStyle}>
      <Table striped bordered hover>
        <thead className={styles.header}>
          <tr>
            {columns?.map(
              (column: {
                field: string;
                header: string;
                dbField: string;
                sortable: boolean;
              }) => (
                <th key={column.dbField} className={styles.header}>
                  {column.header}
                </th>
              )
            )}
            <th className={styles.header}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr key={row.ID} className={styles["table-cell"]}>
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
                      <DeleteIcon color="error" />
                    </>
                  )}
                  <InfoIcon
                    onClick={() =>
                      dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                    }
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}

export default RuleKeyTable;
