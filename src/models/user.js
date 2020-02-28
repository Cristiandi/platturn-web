export default class User {
  constructor({
    authUid,
    fullName,
    document,
    email,
    password,
    address,
    phone,
    repeatedPassword,
    resetPasswordCode
  }) {
    this.authUid = authUid;
    this.fullName = fullName;
    this.document = document;
    this.email = email;
    this.password = password;
    this.repeatedPassword = repeatedPassword;
    this.address = address;
    this.phone = phone;
    this.resetPasswordCode = resetPasswordCode;
  }
}
