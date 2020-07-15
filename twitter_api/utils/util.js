exports.toJSON = function (fields = []) {
  return function () {
    const obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    fields.forEach((field) => delete obj[field]);
    return obj;
  };
};
