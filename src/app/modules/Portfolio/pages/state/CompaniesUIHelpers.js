export const CompaniesStatusCssClasses = ["danger", "success", "info", ""];
export const CompaniesStatusTitles = ["Suspended", "Active", "Pending", ""];
export const CompaniesTypeCssClasses = ["success", "primary", ""];
export const CompaniesTypeTitles = ["Business", "Individual", ""];
export const defaultSorted = [{ dataField: "companyMasterId", order: "asc" }];
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
  sortField: "companyMasterId",
  pageNumber: 1,
  pageSize: 25
};

