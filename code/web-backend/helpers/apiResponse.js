exports.successRes = (res, message, data, code = 200) => {
  res.status(code).json({ success: true, message, data });
};

exports.errorRes = (res, message, error = null, code = 500) => {
  res.status(code).json({ success: false, message, error });
};