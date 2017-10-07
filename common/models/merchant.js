'use strict';

var Promise = require('bluebird');
var request = require('request');
var mongojs = require('mongojs')
var db = mongojs("onboarding", ["Merchant"])

var rejectKaro = function(message, code) {
  var toSend = new Error(message)
  toSend.statusCode = code;
  return toSend;
}

module.exports = function(Merchant) {
  Merchant.disableRemoteMethod("create", true);
  Merchant.disableRemoteMethod("find", true);
  Merchant.disableRemoteMethod("findById", true);
  Merchant.disableRemoteMethod("update", true);
  Merchant.disableRemoteMethod("exists", true);
  Merchant.disableRemoteMethod("upsert", true);
  Merchant.disableRemoteMethod("count", true);
  Merchant.disableRemoteMethod("delete", true);
  Merchant.disableRemoteMethod("deleteById", true);
  Merchant.disableRemoteMethod("updateAll", true);
  Merchant.disableRemoteMethod("createChangeStream", true);
  Merchant.disableRemoteMethod("findOne", true);
  Merchant.disableRemoteMethod("updateAttributes", true);
  Merchant.disableRemoteMethod("__get__customer", false);
  Merchant.disableRemoteMethod('__count__accessTokens', false);
  Merchant.disableRemoteMethod('__create__accessTokens', false);
  Merchant.disableRemoteMethod('__delete__accessTokens', false);
  Merchant.disableRemoteMethod('__destroyById__accessTokens', false);
  Merchant.disableRemoteMethod('__findById__accessTokens', false);
  Merchant.disableRemoteMethod('__updateById__accessTokens', false);
  Merchant.disableRemoteMethod('__get__accessTokens', false);
  Merchant.disableRemoteMethod("confirm", true);
  Merchant.disableRemoteMethod("logout", true);
  Merchant.disableRemoteMethod("login", true);
  Merchant.disableRemoteMethod("resetPassword", true);

  Merchant.afterRemote("findById", function(ctx, result, next) {
    if (ctx.req.headers.authorization && ctx.args.id) {
      ctx.result = {
        email: doc.email,
        phone: doc.phone,
        merchantData: doc.merchantData,
        verificationData: doc.verificationData,
        formData: doc.formData
      }
      next();
    } else {
      next(rejectKaro("Invalid inputs", 400))
    }
  })

  Merchant.remoteMethod(
    'execute', {
      http: {
        verb: 'post'
      },
      accepts: [{
        arg: 'req',
        type: 'object',
        http: {
          source: 'req'
        }
      }, {
        arg: 'res',
        type: 'object',
        'http': {
          source: 'res'
        }
      }],
      returns: {
        arg: 'object',
        type: 'object'
      }
    }
  );

  Merchant.execute = function(req, res, cb) {
    if (req.body.merchantId == "undefined" || req.body.inputData == "undefined") {
      res.type('application/json');
      res.status(422).send({
        type: "Error",
        status: 422,
        code: "missing_params",
        statusCode: 422,
      });
    } else {
      db.Merchant.find({
        "merchantId": req.body.merchantId
      }, function(err, doc) {
        if (!err && doc.length > 0) {
          cb(null, response);
        } else if (err) {
          cb(rejectKaro(err, 503))
        } else {
          cb(rejectKaro("Record not found", 400));
        }
      })
    }
  };
}
