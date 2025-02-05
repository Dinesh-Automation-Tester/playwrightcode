// web/ui/e2e/fixtures/flight-response.d.ts

interface ManualToggle {
  isManual: boolean;
  modifiedByUser: string;
  modifiedByUserName: string | null;
  modificationTime: string;
}

interface FlightResponse {
  flightId: string;
  carrier: string;
  leg: string;
  legId: string;
  flightNumber: number;
  departureDate: string;
  departureTime: string;
  cabin: string;
  dtd: number;
  physicalCapacity: number;
  bookingsTotal: number;
  currentLoadFactor: number;
  expectedNetLoadFactor: number;
  effectiveCapacity: number;
  bookingsGroup: number;
  overbooking: number;
  availability: number | null;
  authorizationLevel: number | null;
  expectedNetBookings: number | null;
  showUpRate: number | null;
  seatsAvailResSys: number;
  upgradeSeats: number | null;
  cancellation: number | null;
  currentRevenue: number;
  expectedNetRevenue: number;
  currentAvgFare: number;
  expectedAvgFare: number;
  optimalDemand: number | null;
  virtualCapacity: number | null;
  lastOptimized: string | null;
  lastUploaded: string;
  flightLevelKey: string;
  showUpRateUser: number | null;
  overbookingUser: number;
  cancellationUser: number | null;
  upgradeSeatsUser: number | null;
  arrivalTime: string;
  revenuePaxDistance: number;
  revenueAvailableSeatDistance: number;
  yield: number;
  manualToggle: ManualToggle | null;
  hasMultiLegs: boolean;
  segmentTag: string;
}

declare const response: FlightResponse[];

export { FlightResponse, response };
