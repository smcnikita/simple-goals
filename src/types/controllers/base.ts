export type BaseResponseStatus = {
  status: 'error' | 'success';
};

export type BaseResponseError = BaseResponseStatus & {
  status: 'error';
  message: string;
};

export type BaseResponseSuccess<T> = BaseResponseStatus & {
  status: 'success';
  data: T;
};

export type BaseResponse<T> = BaseResponseError | BaseResponseSuccess<T>;
