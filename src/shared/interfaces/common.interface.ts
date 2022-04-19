export interface ApiResponse {
  data?: any;
  filter?: any;
  code?: number;
  status?: any;
  message?: string;
  totalDataSize?: number;
  isUsed?:boolean
}

export interface Authentication {
  token?: string;
  role?: string;
}

export interface DropDownValue {
  label: string;
  value: any;
}

export interface DropDownGroup {
  group: string;
  label: string;
  value: string;
}

export interface Language {
  th: string;
  en: string;
}

export interface Picture {
  base64: string;
  width: number;
  height: number;
  size: number;
  type: string;
  name: string;
}

export interface Filter {
  name: string;
  value: string[];
}

export interface Criteria {
  keyword?: string;
  skip?: number;
  limit?: number;
  filter?: string[];
  filters?: Filter[];
  questionFilters?: Filter[];
  sortOrderBy?: string;
}

export interface Paging {
  length: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[];
}

export interface Address {
  address: string;
  province: string;
  postalCode: Number;
  location?: string;
  isDefault?: boolean;
}

export interface Devices {
  isMobile: boolean;
  isTablet: boolean;
  isNotebook: boolean;
  isPC: boolean;
  other: boolean;
}
