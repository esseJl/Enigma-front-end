export interface Error {
  status: string;
  timestamp: Date;
  message: string;
  subErrors: SubError[];
}

export interface SubError {
  object: string;
  field: string;
  rejectedValue: string;
  message: string;
}
