var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  email: String,
  local: {
    passwordHash: String,
    passwordSalt: String
  }
});

UserSchema.set("toJSON", {getters: true, virtuals: true});
function hash(data) {
  return crypto
    .createHash('sha256')
    .update(data)
    .digest('hex');
}
UserSchema.methods = {
  validPassword: function (password) {
    return this.local.passwordHash === hash(this.local.passwordSalt + password);
  },
  setPassword: function (password) {
    var salt = "some data, hash or other string" + new Date() + Math.random();
    this.local.passwordSalt = hash(salt);
    this.local.password = hash(this.local.passwordSalt + password);
  }
};

UserSchema.virtual('local.password').set(function (password) {
  this.setPassword(password);
})

module.exports = mongoose.model('User', UserSchema);