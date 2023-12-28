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
  language: "",
  shortdesc: "",
  longdesc: "",
  addOpen: false,
  editOpen: false,
  infoOpen: false,
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
  { field: "ruleprog", header: "Rule Program", dbField: "ruleprog" },
  { field: "activeflag", header: "Active Flag", dbField: "activeflag" },

  {
    field: "language",
    header: "Language",
    dbField: "language",
  },
  {
    field: "shortdesc",
    header: "Short Description",
    dbField: "shortdesc",
  },
  {
    field: "longdesc",
    header: "Long Description",
    dbField: "longdesc",
  },
];
