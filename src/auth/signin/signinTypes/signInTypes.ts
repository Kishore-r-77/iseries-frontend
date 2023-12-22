export type AuthResponseType = {
  data: {
    userid: string;
    username: string;
    authorities: string[];
    accessToken: string;
    tokenType: string;
  };
};
