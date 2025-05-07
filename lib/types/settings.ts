export enum SettingKey {
  ADMIN_EMAIL = "ADMIN_EMAIL",
  PROFIT_MARGIN = "PROFIT_MARGIN",
  ORDER_DISPUTE_THRESHOLD = "ORDER_DISPUTE_THRESHOLD",
  // ...
}

export enum SettingGroup {
  GENERAL = "GENERAL",
  SECURITY = "EMAIL",
  // ...
}
export type Setting = {
  id: number;
  key: SettingKey;
  value: string;
  group: SettingGroup;
};
