'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Q = require('q');  /* jshint ignore:line */
var _ = require('lodash');  /* jshint ignore:line */
var util = require('util');  /* jshint ignore:line */
var Page = require('../../../../../base/Page');  /* jshint ignore:line */
var serialize = require(
    '../../../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../../../base/values');  /* jshint ignore:line */

var InteractionChannelInviteList;
var InteractionChannelInvitePage;
var InteractionChannelInviteInstance;

/* jshint ignore:start */
/**
 * Initialize the InteractionChannelInviteList
 *
 * @constructor Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteList
 *
 * @param {Twilio.FlexApi.V1} version - Version of the resource
 * @param {string} interactionSid - The Interaction SID for this Channel
 * @param {string} channelSid - The Channel SID for this Invite
 */
/* jshint ignore:end */
InteractionChannelInviteList = function InteractionChannelInviteList(version,
    interactionSid, channelSid) {
  /* jshint ignore:start */
  /**
   * @function invites
   * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteContext}
   */
  /* jshint ignore:end */
  function InteractionChannelInviteListInstance(sid) {
    return InteractionChannelInviteListInstance.get(sid);
  }

  InteractionChannelInviteListInstance._version = version;
  // Path Solution
  InteractionChannelInviteListInstance._solution = {
    interactionSid: interactionSid,
    channelSid: channelSid
  };
  InteractionChannelInviteListInstance._uri = `/Interactions/${interactionSid}/Channels/${channelSid}/Invites`;
  /* jshint ignore:start */
  /**
   * create a InteractionChannelInviteInstance
   *
   * @function create
   * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteList#
   *
   * @param {object} opts - Options for request
   * @param {object} opts.routing - The Interaction's routing logic
   * @param {function} [callback] - Callback to handle processed record
   *
   * @returns {Promise} Resolves to processed InteractionChannelInviteInstance
   */
  /* jshint ignore:end */
  InteractionChannelInviteListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameter "opts" missing.');
    }
    if (_.isUndefined(opts['routing'])) {
      throw new Error('Required parameter "opts[\'routing\']" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({'Routing': serialize.object(_.get(opts, 'routing'))});

    var promise = this._version.create({uri: this._uri, method: 'POST', data: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new InteractionChannelInviteInstance(this._version, payload));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Streams InteractionChannelInviteInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory
   * efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function each
   * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteList#
   *
   * @param {object} [opts] - Options for request
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         each() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         each() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   *         callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  /* jshint ignore:end */
  InteractionChannelInviteListInstance.each = function each(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (opts.callback) {
      callback = opts.callback;
    }
    if (_.isUndefined(callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var currentResource = 0;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done || (!_.isUndefined(opts.limit) && currentResource >= opts.limit)) {
            done = true;
            return false;
          }

          currentResource++;
          try {
            callback(instance, onComplete);
          } catch (e) {
            console.error(e);
            throw e;
          }
        });

        if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        } else {
          onComplete();
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, _.merge(opts, limits)));
  };

  /* jshint ignore:start */
  /**
   * Lists InteractionChannelInviteInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteList#
   *
   * @param {object} [opts] - Options for request
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  InteractionChannelInviteListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource, done) {
      allResources.push(resource);

      if (!_.isUndefined(opts.limit) && allResources.length === opts.limit) {
        done();
      }
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single page of InteractionChannelInviteInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteList#
   *
   * @param {object} [opts] - Options for request
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  InteractionChannelInviteListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new InteractionChannelInvitePage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Retrieve a single target page of InteractionChannelInviteInstance records from
   * the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  InteractionChannelInviteListInstance.getPage = function getPage(targetUrl,
      callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new InteractionChannelInvitePage(this._version, payload, this._solution));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  InteractionChannelInviteListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  InteractionChannelInviteListInstance[util.inspect.custom] = function
      inspect(depth, options) {
    return util.inspect(this.toJSON(), options);
  };

  return InteractionChannelInviteListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the InteractionChannelInvitePage
 *
 * @constructor Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInvitePage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {InteractionChannelInviteSolution} solution - Path solution
 *
 * @returns InteractionChannelInvitePage
 */
/* jshint ignore:end */
InteractionChannelInvitePage = function InteractionChannelInvitePage(version,
    response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(InteractionChannelInvitePage.prototype, Page.prototype);
InteractionChannelInvitePage.prototype.constructor = InteractionChannelInvitePage;

/* jshint ignore:start */
/**
 * Build an instance of InteractionChannelInviteInstance
 *
 * @function getInstance
 * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInvitePage#
 *
 * @param {InteractionChannelInvitePayload} payload - Payload response from the API
 *
 * @returns InteractionChannelInviteInstance
 */
/* jshint ignore:end */
InteractionChannelInvitePage.prototype.getInstance = function
    getInstance(payload) {
  return new InteractionChannelInviteInstance(
    this._version,
    payload,
    this._solution.interactionSid,
    this._solution.channelSid
  );
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInvitePage#
 *
 * @returns Object
 */
/* jshint ignore:end */
InteractionChannelInvitePage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

InteractionChannelInvitePage.prototype[util.inspect.custom] = function
    inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the InteractionChannelInviteContext
 *
 * @constructor Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteInstance
 *
 * @property {string} sid - The unique string that identifies the resource
 * @property {string} interactionSid - The Interaction SID for this Channel
 * @property {string} channelSid - The Channel SID for this Invite
 * @property {object} routing -
 *          A JSON object representing the routing rules for the Interaction Channel
 * @property {string} url - The url
 *
 * @param {V1} version - Version of the resource
 * @param {InteractionChannelInvitePayload} payload - The instance payload
 * @param {sid} interactionSid - The Interaction SID for this Channel
 * @param {sid} channelSid - The Channel SID for this Invite
 */
/* jshint ignore:end */
InteractionChannelInviteInstance = function
    InteractionChannelInviteInstance(version, payload, interactionSid,
    channelSid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.interactionSid = payload.interaction_sid; // jshint ignore:line
  this.channelSid = payload.channel_sid; // jshint ignore:line
  this.routing = payload.routing; // jshint ignore:line
  this.url = payload.url; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {interactionSid: interactionSid, channelSid: channelSid, };
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.FlexApi.V1.InteractionContext.InteractionChannelContext.InteractionChannelInviteInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
InteractionChannelInviteInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

InteractionChannelInviteInstance.prototype[util.inspect.custom] = function
    inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  InteractionChannelInviteList: InteractionChannelInviteList,
  InteractionChannelInvitePage: InteractionChannelInvitePage,
  InteractionChannelInviteInstance: InteractionChannelInviteInstance
};
