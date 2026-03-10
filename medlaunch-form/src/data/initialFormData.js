const initialFormData = {
  legalEntityName: "",
  dbaName: "",
  sameAsLegalEntity: false,

  primaryFirstName: "",
  primaryLastName: "",
  primaryTitle: "",
  primaryWorkPhone: "",
  primaryCellPhone: "",
  primaryEmail: "",
  primaryEmailVerified: false,

  facilityType: "",

  ceoSameAsPrimary: false,
  ceoFirstName: "",
  ceoLastName: "",
  ceoPhone: "",
  ceoEmail: "",

  qualitySameAsPrimary: false,
  qualityFirstName: "",
  qualityLastName: "",
  qualityPhone: "",
  qualityEmail: "",

  invoicingSameAsPrimary: false,
  invoicingFirstName: "",
  invoicingLastName: "",
  invoicingPhone: "",
  invoicingEmail: "",

  billingStreet: "",
  billingCity: "",
  billingState: "",
  billingZip: "",

  siteMode: "single",
  siteInputMethod: "upload",
  uploadedFiles: ["File.csv", "File.csv"],

  services: [],
  otherServices: [],
  standards: [],

  expirationDate: "",
  applicationDate: "",
  thrombolyticDates: [],
  thrombectomyDates: [],

  submitConfirmed: false,
};

export default initialFormData;