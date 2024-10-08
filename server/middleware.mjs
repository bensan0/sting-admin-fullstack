'use strict';

/**
 * 統一響應體格式
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
export const responseWrapper = (req, res, next) => {
  res.sendWrapped = (statusCode, data, message) => {
    res.status(200).json({
      status: statusCode.toString(),
      data: data || null,
      msg: message || null
    });
  };
  next();
};

export const authLogin = (req, res, next) => {
  if (req.session && req.session.admin) {
    return next()
  } else {
    res.sendWrapped(403, null, 'Not yet login')
    return res.end()
  }
}