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
var Page = require('../../../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../../../base/deserialize');  /* jshint ignore:line */
var values = require('../../../../../../base/values');  /* jshint ignore:line */

var PayloadList;
var PayloadPage;
var PayloadInstance;
var PayloadContext;

/* jshint ignore:start */
/**
 * Initialize the PayloadList
 *
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList
 *
 * @param {Twilio.Api.V2010} version - Version of the resource
 * @param {string} accountSid - The SID of the Account that created the resource
 * @param {string} referenceSid -
 *          The SID of the recording to which the AddOnResult resource that contains the payload belongs
 * @param {string} addOnResultSid -
 *          The SID of the AddOnResult to which the payload belongs
 */
/* jshint ignore:end */
PayloadList = function PayloadList(version, accountSid, referenceSid,
                                    addOnResultSid) {
  /* jshint ignore:start */
  /**
   * @function payloads
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext}
   */
  /* jshint ignore:end */
  function PayloadListInstance(sid) {
    return PayloadListInstance.get(sid);
  }

  PayloadListInstance._version = version;
  // Path Solution
  PayloadListInstance._solution = {
    accountSid: accountSid,
    referenceSid: referenceSid,
    addOnResultSid: addOnResultSid
  };
  PayloadListInstance._uri = `/Accounts/${accountSid}/Recordings/${referenceSid}/AddOnResults/${addOnResultSid}/Payloads.json`;
  /* jshint ignore:start */
  /**
   * Streams PayloadInstance records from the API.
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
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList#
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
  PayloadListInstance.each = function each(opts, callback) {
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
   * Lists PayloadInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList#
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
  PayloadListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of PayloadInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList#
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
  PayloadListInstance.page = function page(opts, callback) {
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
      deferred.resolve(new PayloadPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of PayloadInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  PayloadListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new PayloadPage(this._version, payload, this._solution));
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
   * Constructs a payload
   *
   * @function get
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList#
   *
   * @param {string} sid - The unique string that identifies the resource to fetch
   *
   * @returns {Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext}
   */
  /* jshint ignore:end */
  PayloadListInstance.get = function get(sid) {
    return new PayloadContext(
      this._version,
      this._solution.accountSid,
      this._solution.referenceSid,
      this._solution.addOnResultSid,
      sid
    );
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  PayloadListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  PayloadListInstance[util.inspect.custom] = function inspect(depth, options) {
    return util.inspect(this.toJSON(), options);
  };

  return PayloadListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the PayloadPage
 *
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadPage
 *
 * @param {V2010} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {PayloadSolution} solution - Path solution
 *
 * @returns PayloadPage
 */
/* jshint ignore:end */
PayloadPage = function PayloadPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(PayloadPage.prototype, Page.prototype);
PayloadPage.prototype.constructor = PayloadPage;

/* jshint ignore:start */
/**
 * Build an instance of PayloadInstance
 *
 * @function getInstance
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadPage#
 *
 * @param {PayloadPayload} payload - Payload response from the API
 *
 * @returns PayloadInstance
 */
/* jshint ignore:end */
PayloadPage.prototype.getInstance = function getInstance(payload) {
  return new PayloadInstance(
    this._version,
    payload,
    this._solution.accountSid,
    this._solution.referenceSid,
    this._solution.addOnResultSid
  );
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
PayloadPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

PayloadPage.prototype[util.inspect.custom] = function inspect(depth, options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the PayloadContext
 *
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadInstance
 *
 * @property {string} sid - The unique string that identifies the resource
 * @property {string} addOnResultSid -
 *          The SID of the AddOnResult to which the payload belongs
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {string} label - The string that describes the payload
 * @property {string} addOnSid - The SID of the Add-on to which the result belongs
 * @property {string} addOnConfigurationSid - The SID of the Add-on configuration
 * @property {string} contentType - The MIME type of the payload
 * @property {Date} dateCreated -
 *          The RFC 2822 date and time in GMT that the resource was created
 * @property {Date} dateUpdated -
 *          The RFC 2822 date and time in GMT that the resource was last updated
 * @property {string} referenceSid -
 *          The SID of the recording to which the AddOnResult resource that contains the payload belongs
 * @property {string} subresourceUris -
 *          A list of related resources identified by their relative URIs
 *
 * @param {V2010} version - Version of the resource
 * @param {PayloadPayload} payload - The instance payload
 * @param {sid} accountSid - The SID of the Account that created the resource
 * @param {sid} referenceSid -
 *          The SID of the recording to which the AddOnResult resource that contains the payload belongs
 * @param {sid} addOnResultSid -
 *          The SID of the AddOnResult to which the payload belongs
 * @param {sid} sid - The unique string that identifies the resource to fetch
 */
/* jshint ignore:end */
PayloadInstance = function PayloadInstance(version, payload, accountSid,
                                            referenceSid, addOnResultSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.sid = payload.sid; // jshint ignore:line
  this.addOnResultSid = payload.add_on_result_sid; // jshint ignore:line
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.label = payload.label; // jshint ignore:line
  this.addOnSid = payload.add_on_sid; // jshint ignore:line
  this.addOnConfigurationSid = payload.add_on_configuration_sid; // jshint ignore:line
  this.contentType = payload.content_type; // jshint ignore:line
  this.dateCreated = deserialize.rfc2822DateTime(payload.date_created); // jshint ignore:line
  this.dateUpdated = deserialize.rfc2822DateTime(payload.date_updated); // jshint ignore:line
  this.referenceSid = payload.reference_sid; // jshint ignore:line
  this.subresourceUris = payload.subresource_uris; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {
    accountSid: accountSid,
    referenceSid: referenceSid,
    addOnResultSid: addOnResultSid,
    sid: sid || this.sid,
  };
};

Object.defineProperty(PayloadInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new PayloadContext(
          this._version,
          this._solution.accountSid,
          this._solution.referenceSid,
          this._solution.addOnResultSid,
          this._solution.sid
        );
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a PayloadInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed PayloadInstance
 */
/* jshint ignore:end */
PayloadInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a PayloadInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed PayloadInstance
 */
/* jshint ignore:end */
PayloadInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
PayloadInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

PayloadInstance.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the PayloadContext
 *
 * @constructor Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext
 *
 * @param {V2010} version - Version of the resource
 * @param {sid} accountSid -
 *          The SID of the Account that created the resource to fetch
 * @param {sid} referenceSid -
 *          The SID of the recording to which the AddOnResult resource that contains the payload to fetch belongs
 * @param {sid} addOnResultSid -
 *          The SID of the AddOnResult to which the payload to fetch belongs
 * @param {sid} sid - The unique string that identifies the resource to fetch
 */
/* jshint ignore:end */
PayloadContext = function PayloadContext(version, accountSid, referenceSid,
                                          addOnResultSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {
    accountSid: accountSid,
    referenceSid: referenceSid,
    addOnResultSid: addOnResultSid,
    sid: sid,
  };
  this._uri = `/Accounts/${accountSid}/Recordings/${referenceSid}/AddOnResults/${addOnResultSid}/Payloads/${sid}.json`;
};

/* jshint ignore:start */
/**
 * fetch a PayloadInstance
 *
 * @function fetch
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed PayloadInstance
 */
/* jshint ignore:end */
PayloadContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new PayloadInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.referenceSid,
      this._solution.addOnResultSid,
      this._solution.sid
    ));
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
 * remove a PayloadInstance
 *
 * @function remove
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed PayloadInstance
 */
/* jshint ignore:end */
PayloadContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({uri: this._uri, method: 'DELETE'});

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
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
 * @memberof Twilio.Api.V2010.AccountContext.RecordingContext.AddOnResultContext.PayloadContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
PayloadContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

PayloadContext.prototype[util.inspect.custom] = function inspect(depth, options)
    {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  PayloadList: PayloadList,
  PayloadPage: PayloadPage,
  PayloadInstance: PayloadInstance,
  PayloadContext: PayloadContext
};
