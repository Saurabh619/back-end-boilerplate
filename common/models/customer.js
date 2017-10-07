'use strict';

var Promise = require('bluebird');
var request = require('request');
var mongojs = require('mongojs')
var db = mongojs("onboarding", ["Customer"])

module.exports = function(Customer) {
  Customer.disableRemoteMethod("create", true);
  Customer.disableRemoteMethod("find", true);
  Customer.disableRemoteMethod("findById", true);
  Customer.disableRemoteMethod("update", true);
  Customer.disableRemoteMethod("exists", true);
  Customer.disableRemoteMethod("upsert", true);
  Customer.disableRemoteMethod("count", true);
  Customer.disableRemoteMethod("delete", true);
  Customer.disableRemoteMethod("deleteById", true);
  Customer.disableRemoteMethod("updateAll", true);
  Customer.disableRemoteMethod("createChangeStream", true);
  Customer.disableRemoteMethod("findOne", true);
  Customer.disableRemoteMethod("updateAttributes", false);
  Customer.disableRemoteMethod("__create__merchants", false);
  Customer.disableRemoteMethod("__findById__merchants", false);
  Customer.disableRemoteMethod("__updateById__merchants", false);
  Customer.disableRemoteMethod("__count__merchants", false);
  Customer.disableRemoteMethod("__delete__merchants", false);
  Customer.disableRemoteMethod("__destroyById__merchants", false);
  Customer.disableRemoteMethod("__get__merchants", false);
  Customer.disableRemoteMethod('__count__accessTokens', false);
  Customer.disableRemoteMethod('__create__accessTokens', false);
  Customer.disableRemoteMethod('__delete__accessTokens', false);
  Customer.disableRemoteMethod('__destroyById__accessTokens', false);
  Customer.disableRemoteMethod('__findById__accessTokens', false);
  Customer.disableRemoteMethod('__updateById__accessTokens', false);
  Customer.disableRemoteMethod('__get__accessTokens', false);
  Customer.disableRemoteMethod("confirm", true);
  Customer.disableRemoteMethod("logout", true);
  Customer.disableRemoteMethod("login", true);
  Customer.disableRemoteMethod("resetPassword", true);

  Customer.beforeRemote('*.__create__merchants', function(ctx, instance, next) {
    if (ctx.args.data.accessToken) {
      next();
    } else {
      var error = {};
      error.statusCode = 400;
      next(error);
    }
  })
};
