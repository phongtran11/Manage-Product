export const RootPaths = {
  LOGIN: "/login",
  USER: "/user",
  Invoice: "/invoice",
};

export const UserPaths = {
  LIST: `${RootPaths.USER}/list`,
};

export const InvoicePaths = {
  LIST: `${RootPaths.Invoice}/list`,
  CREATE: `${RootPaths.Invoice}/create`,
};
