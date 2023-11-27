import RoleModel from './role-model';

class CredentialModel {
  public email: number;
  public password: string;

  public constructor(credentials: CredentialModel) {
    this.email = credentials.email;
    this.password = credentials.password;
  }

  // ValidationSchema and Validate function
}

export default CredentialModel;
