export type TUser = {
  id: string;
  username: string;
  displayname: string;
  role: string;
};

export type TListUserResponse = {
  data: TUser[];
  page: number;
  limit: number;
  totalRecord: number;
  totalPage: number;
};
