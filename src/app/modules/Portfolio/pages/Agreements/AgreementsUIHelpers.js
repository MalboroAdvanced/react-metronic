export const AgreementsStatusCssClasses = ["danger", "success", "info", ""];
export const AgreementsStatusTitles = ["Suspended", "Active", "Pending", ""];
export const AgreementsTypeCssClasses = ["success", "primary", ""];
export const AgreementsTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "agreementMasterId", order: "asc" }];
export const sizePerPageList = [
  { text: "25", value: 25 },
  { text: "50", value: 50 },
  { text: "100", value: 100 }
];
export const initialFilter = {
  filter: {
    lastName: "",
    firstName: "",
    email: "",
    ipAddress: ""
  },
  sortOrder: "asc", // asc||desc
  sortField: "agreementMasterId",
  pageNumber: 1,
  pageSize: 25
};

export const AVAILABLE_AGREEMENTTYPES = [
  "-Select",
  "ISGS",
  "IPP",
  "Captive Generator",
  "Merchant Power Plant",
  "Solar Power Developer",
  "Wind Power Developer",
  "Hydro power Developer",
  "Distribution Licensee",
  "Deemed Distribution Licensee",
  "Discom Consumer",
  "Trading Licensee",
  "SEZ"
  
];

export const TRANSACTION_TYPE = [
  "-Select",
  "Contingency",
  "DA",
  "FCFS",
  "Advance",
  "Intra",
  "Banking",
  "Cross-Border"
 ];

export const CONTRACT_TYPE = [
  "-Select",
  "STOA",
  "MTOA",
  "LTA"
];




export const REGIONTYPE = [
  "-Select",
  "ER",
  "NR",
  "SR",
  "WR",
  "NER"
];












export const BILLING_HEAD = [
  "-Select",
  "STOA",
  "MTOA",
  "LTA"
];
export const BILLING_SOURCE = [
  "-Select",
  "REA",
  "JMR"
];
export const DELIVERY_POINT = [
  "-Select",
  "Seller Inj. Pt.",
  "Seller Regional Per.",
  "Seller State Per.",
  "Seller Discom Per.",
  "Buyer Drawal Pt.",
  "Buyer Regional Per.",
  "Buyer State Per.",
  "Buyer Discom Per."
   
 ];
 export const PROVISIONAL_BILLING_CYCLE = [

  "Daily",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "Last Day",
  "Clear All"
 ]