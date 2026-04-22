export type RootStackParamList = {
  Tabs: { screen?: keyof TabParamList } | undefined;
  CaseDetail: { caseId: string };
  NewCase: undefined;
  PollDetail: { pollId: string };
  Calendar: undefined;
  Menu: undefined;
  Directory: undefined;
  Craftsmen: undefined;
  CraftsmanDetail: { craftsmanId: string };
  Notifications: undefined;
};

export type TabParamList = {
  Home: undefined;
  Cases: undefined;
  Chat: undefined;
  Polls: undefined;
  Docs: undefined;
};
