//Storing Actions into a Variable for Reducer
export const ACTIONS = {
  ONCHANGE: "ONCHANGE",
  EDITCHANGE: "EDITCHANGE",
  ADDOPEN: "ADDOPEN",
  EDITOPEN: "EDITOPEN",
  INFOOPEN: "INFOOPEN",
  ADDCLOSE: "ADDCLOSE",
  EDITCLOSE: "EDITCLOSE",
  INFOCLOSE: "INFOCLOSE",
  RULEKEYOPEN: "RULEKEYOPEN",
  RULEKEYCLOSE: "RULEKEYCLOSE",
  SORT_ASC: "SORT_ASC",
  SORT_DESC: "SORT_DESC",
};

//Initial State defined
export const initialValues: any = {
  prefix: "",
  company: "",
  rulename: "",
  rulekey: "",
  seqno: "",
  fromDate: "",
  toDate: "",
  ruleprog: "",
  activeflag: "",
  data: "",
  user: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
  ruleKeyOpen: false,
  searchString: "",
  searchCriteria: "",
  sortColumn: "",
  sortAsc: false,
  sortDesc: false,
};

//Columns Defined to Pass into the Custom Table
export const columns = [
  { field: "prefix", header: "Prefix", dbField: "prefix" },
  { field: "company", header: "Company Name", dbField: "company" },
  {
    field: "rulename",
    header: "Rule Name",
    dbField: "rulename",
  },
  {
    field: "rulekey",
    header: "Rule Key",
    dbField: "rulekey",
  },
  { field: "seqno", header: "Seq No", dbField: "seqno" },
  { field: "fromDate", header: "From Date", dbField: "fromDate" },
  { field: "toDate", header: "To Date", dbField: "toDate" },
  {
    field: "ruleprog",
    header: "Rule Prog",
    dbField: "ruleprog",
  },
  {
    field: "activeflag",
    header: "Active Flag",
    dbField: "activeflag",
  },

  {
    field: "user",
    header: "User",
    dbField: "user",
    type: "date",
  },
];
