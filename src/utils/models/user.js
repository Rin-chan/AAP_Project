function User(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.birthday = "";
    this.contact = "";
    this.address = "";
    this.face = false;
    this.faceImage = "";
    this.points = 0;
}

export default User;