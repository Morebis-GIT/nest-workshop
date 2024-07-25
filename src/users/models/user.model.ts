export interface IUser {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IUpdateUser extends Partial<IUser> {}
