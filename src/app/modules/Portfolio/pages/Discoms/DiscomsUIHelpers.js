export const DiscomsStatusCssClasses = ["danger", "success", "info", ""];
export const DiscomsStatusTitles = ["Suspended", "Active", "Pending", ""];
export const DiscomsTypeCssClasses = ["success", "primary", ""];
export const DiscomsTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "discomMasterId", order: "asc" }];
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
  sortField: "discomMasterId",
  pageNumber: 1,
  pageSize: 25
};

export const AVAILABLE_DISCOMTYPES = [
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

export const AVAILABLE_POINT_OF_CONNECTION = [
  "11",
  "22",
  "33",
  "66",
  "110",
  "220",
  "440"
  
  
];

export const AVAILABLE_POINT_PER = [
  "CTU",
  "STU",
  "Discom"
]