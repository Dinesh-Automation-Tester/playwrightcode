// web/ui/e2e/fixtures/user-preferences.d.ts

interface DateTimeSetting {
  name: string;
  value: string;
}

interface WorkflowSetting {
  name: string;
  value: string;
}

interface WorkflowSettings {
  flightAnalysis: WorkflowSetting[];
}

interface UserPreferences {
  userName: string;
  markets: string[];
  legs: string[];
  dateTimeSettings: DateTimeSetting[];
  workflowSettings: WorkflowSettings;
}

declare const flightNumbers: number[];
declare const legs: string[];
declare const userPreferences: UserPreferences;

export { flightNumbers, legs, userPreferences };
