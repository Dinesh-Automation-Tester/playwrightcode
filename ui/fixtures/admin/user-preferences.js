const resp = {
  userName: "sg000000",
  markets: ["BOM-DOH"],
  legs: ["SCO-NQZ"],
  dateTimeSettings: [
    {
      name: "dateFormat",
      value: "DD-MM-YYYY",
    },
    {
      name: "timeFormat",
      value: "hh:mm a",
    },
    {
      name: "timeZone",
      value: "ANC",
    },
  ],
  workflowSettings: {
    flightAnalysis: [
      {
        name: "defaultSearchDays",
        value: "30",
      },
      {
        name: "defaultMetric",
        value: "loadFactor",
      },
    ],
  },
};

export default resp;
