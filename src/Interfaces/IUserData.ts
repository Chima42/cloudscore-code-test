export interface IAccount {
  accountCategory: string;
  accountNumber: string;
  address: IAddress;
  contentKey: string;
  displayName: string;
  key: string;
  name: string;
  overview: IOverview;
  paymentHistory: IPaymentHistory[];
  status: string;
  supplierName: string;
}

export interface IAddress {
  buildingName: string;
  format: string;
  postcode: string;
  street: string;
  town: string;
}

export interface IOverview {
  lastUpdated: string;
  utilization?: number;
  balance: IBalance;
  frequency: string;
  limit?: ILimit;
  accountOpened: string;
}

export interface IBalance {
  amount: number;
  currency: string;
}

export interface ILimit {
  amount: number;
  currency: string;
}

export interface IPaymentHistory {
  month: number;
  paymentStatus: string;
  year: number;
}

export interface IPersonal {
  electoralRoll: IElectoralRoll[];
  publicInfo: IPublicInfo;
}

export interface IElectoralRoll {
  address: IAddress;
  contextKey: string;
  current: boolean;
  endDateString: string;
  name: string;
  startDateString: string;
  supplied: string;
}

export interface IPublicInfo {
  courtAndInsolvencies: ICourtAndInsolvency[];
}

export interface ICourtAndInsolvency {
  name: string;
  dob: string;
  courtName: string;
  contextKey: string;
  dischargeDate?: string;
  caseReference: string;
  amount: IAmount;
  address: IAddress;
  type: IType;
  startDate: string;
}

export interface IAmount {
  amount: number;
  currency: string;
}

export interface IType {
  code: string;
  details?: IDetails;
}

export interface IDetails {
  catDesc: string;
}

export interface IUserData {
  accounts: IAccount[];
  personal: IPersonal;
}
