exports.getUsers = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: [{ name: 'huanxin' }, { name: 'huanle' }] });
};

exports.getUser = (req, res, next) => {
  res.status(200).json({ success: true, data: [{ name: 'huanxin' }] });
};
