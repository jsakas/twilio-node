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
var Page = require('../../../../base/Page');  /* jshint ignore:line */
var deserialize = require(
    '../../../../base/deserialize');  /* jshint ignore:line */
var serialize = require('../../../../base/serialize');  /* jshint ignore:line */
var values = require('../../../../base/values');  /* jshint ignore:line */

var RoomRecordingList;
var RoomRecordingPage;
var RoomRecordingInstance;
var RoomRecordingContext;

/* jshint ignore:start */
/**
 * Initialize the RoomRecordingList
 *
 * @constructor Twilio.Video.V1.RoomContext.RoomRecordingList
 *
 * @param {Twilio.Video.V1} version - Version of the resource
 * @param {string} roomSid -
 *          The SID of the Room resource the recording is associated with
 */
/* jshint ignore:end */
RoomRecordingList = function RoomRecordingList(version, roomSid) {
  /* jshint ignore:start */
  /**
   * @function recordings
   * @memberof Twilio.Video.V1.RoomContext#
   *
   * @param {string} sid - sid of instance
   *
   * @returns {Twilio.Video.V1.RoomContext.RoomRecordingContext}
   */
  /* jshint ignore:end */
  function RoomRecordingListInstance(sid) {
    return RoomRecordingListInstance.get(sid);
  }

  RoomRecordingListInstance._version = version;
  // Path Solution
  RoomRecordingListInstance._solution = {roomSid: roomSid};
  RoomRecordingListInstance._uri = `/Rooms/${roomSid}/Recordings`;
  /* jshint ignore:start */
  /**
   * Streams RoomRecordingInstance records from the API.
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
   * @memberof Twilio.Video.V1.RoomContext.RoomRecordingList#
   *
   * @param {object} [opts] - Options for request
   * @param {room_recording.status} [opts.status] -
   *          Read only the recordings with this status
   * @param {string} [opts.sourceSid] -
   *          Read only the recordings that have this source_sid
   * @param {Date} [opts.dateCreatedAfter] -
   *          Read only Recordings that started on or after this ISO 8601 datetime with time zone
   * @param {Date} [opts.dateCreatedBefore] -
   *          Read only Recordings that started before this ISO 8601 date-time with time zone
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
  RoomRecordingListInstance.each = function each(opts, callback) {
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
   * Lists RoomRecordingInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function list
   * @memberof Twilio.Video.V1.RoomContext.RoomRecordingList#
   *
   * @param {object} [opts] - Options for request
   * @param {room_recording.status} [opts.status] -
   *          Read only the recordings with this status
   * @param {string} [opts.sourceSid] -
   *          Read only the recordings that have this source_sid
   * @param {Date} [opts.dateCreatedAfter] -
   *          Read only Recordings that started on or after this ISO 8601 datetime with time zone
   * @param {Date} [opts.dateCreatedBefore] -
   *          Read only Recordings that started before this ISO 8601 date-time with time zone
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
  RoomRecordingListInstance.list = function list(opts, callback) {
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
   * Retrieve a single page of RoomRecordingInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function page
   * @memberof Twilio.Video.V1.RoomContext.RoomRecordingList#
   *
   * @param {object} [opts] - Options for request
   * @param {room_recording.status} [opts.status] -
   *          Read only the recordings with this status
   * @param {string} [opts.sourceSid] -
   *          Read only the recordings that have this source_sid
   * @param {Date} [opts.dateCreatedAfter] -
   *          Read only Recordings that started on or after this ISO 8601 datetime with time zone
   * @param {Date} [opts.dateCreatedBefore] -
   *          Read only Recordings that started before this ISO 8601 date-time with time zone
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  RoomRecordingListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'Status': _.get(opts, 'status'),
      'SourceSid': _.get(opts, 'sourceSid'),
      'DateCreatedAfter': serialize.iso8601DateTime(_.get(opts, 'dateCreatedAfter')),
      'DateCreatedBefore': serialize.iso8601DateTime(_.get(opts, 'dateCreatedBefore')),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({uri: this._uri, method: 'GET', params: data});

    promise = promise.then(function(payload) {
      deferred.resolve(new RoomRecordingPage(this._version, payload, this._solution));
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
   * Retrieve a single target page of RoomRecordingInstance records from the API.
   *
   * The request is executed immediately.
   *
   * If a function is passed as the first argument, it will be used as the callback
   * function.
   *
   * @function getPage
   * @memberof Twilio.Video.V1.RoomContext.RoomRecordingList#
   *
   * @param {string} [targetUrl] - API-generated URL for the requested results page
   * @param {function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  /* jshint ignore:end */
  RoomRecordingListInstance.getPage = function getPage(targetUrl, callback) {
    var deferred = Q.defer();

    var promise = this._version._domain.twilio.request({method: 'GET', uri: targetUrl});

    promise = promise.then(function(payload) {
      deferred.resolve(new RoomRecordingPage(this._version, payload, this._solution));
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
   * Constructs a room_recording
   *
   * @function get
   * @memberof Twilio.Video.V1.RoomContext.RoomRecordingList#
   *
   * @param {string} sid - The SID that identifies the resource to fetch
   *
   * @returns {Twilio.Video.V1.RoomContext.RoomRecordingContext}
   */
  /* jshint ignore:end */
  RoomRecordingListInstance.get = function get(sid) {
    return new RoomRecordingContext(this._version, this._solution.roomSid, sid);
  };

  /* jshint ignore:start */
  /**
   * Provide a user-friendly representation
   *
   * @function toJSON
   * @memberof Twilio.Video.V1.RoomContext.RoomRecordingList#
   *
   * @returns Object
   */
  /* jshint ignore:end */
  RoomRecordingListInstance.toJSON = function toJSON() {
    return this._solution;
  };

  RoomRecordingListInstance[util.inspect.custom] = function inspect(depth,
      options) {
    return util.inspect(this.toJSON(), options);
  };

  return RoomRecordingListInstance;
};


/* jshint ignore:start */
/**
 * Initialize the RoomRecordingPage
 *
 * @constructor Twilio.Video.V1.RoomContext.RoomRecordingPage
 *
 * @param {V1} version - Version of the resource
 * @param {Response<string>} response - Response from the API
 * @param {RoomRecordingSolution} solution - Path solution
 *
 * @returns RoomRecordingPage
 */
/* jshint ignore:end */
RoomRecordingPage = function RoomRecordingPage(version, response, solution) {
  // Path Solution
  this._solution = solution;

  Page.prototype.constructor.call(this, version, response, this._solution);
};

_.extend(RoomRecordingPage.prototype, Page.prototype);
RoomRecordingPage.prototype.constructor = RoomRecordingPage;

/* jshint ignore:start */
/**
 * Build an instance of RoomRecordingInstance
 *
 * @function getInstance
 * @memberof Twilio.Video.V1.RoomContext.RoomRecordingPage#
 *
 * @param {RoomRecordingPayload} payload - Payload response from the API
 *
 * @returns RoomRecordingInstance
 */
/* jshint ignore:end */
RoomRecordingPage.prototype.getInstance = function getInstance(payload) {
  return new RoomRecordingInstance(this._version, payload, this._solution.roomSid);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Video.V1.RoomContext.RoomRecordingPage#
 *
 * @returns Object
 */
/* jshint ignore:end */
RoomRecordingPage.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

RoomRecordingPage.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the RoomRecordingContext
 *
 * @constructor Twilio.Video.V1.RoomContext.RoomRecordingInstance
 *
 * @property {string} accountSid - The SID of the Account that created the resource
 * @property {room_recording.status} status - The status of the recording
 * @property {Date} dateCreated -
 *          The ISO 8601 date and time in GMT when the resource was created
 * @property {string} sid - The unique string that identifies the resource
 * @property {string} sourceSid - The SID of the recording source
 * @property {number} size - The size of the recorded track in bytes
 * @property {string} url - The absolute URL of the resource
 * @property {room_recording.type} type - The recording's media type
 * @property {number} duration - The duration of the recording in seconds
 * @property {room_recording.format} containerFormat -
 *          The file format for the recording
 * @property {room_recording.codec} codec - The codec used for the recording
 * @property {object} groupingSids - A list of SIDs related to the Recording
 * @property {string} trackName -
 *          The name that was given to the source track of the recording
 * @property {number} offset -
 *          The number of milliseconds between a point in time that is common to all rooms in a group and when the source room of the recording started
 * @property {string} mediaExternalLocation -
 *          The URL of the media file associated with the recording when stored externally
 * @property {string} roomSid -
 *          The SID of the Room resource the recording is associated with
 * @property {string} links - The URLs of related resources
 *
 * @param {V1} version - Version of the resource
 * @param {RoomRecordingPayload} payload - The instance payload
 * @param {sid} roomSid -
 *          The SID of the Room resource the recording is associated with
 * @param {sid} sid - The SID that identifies the resource to fetch
 */
/* jshint ignore:end */
RoomRecordingInstance = function RoomRecordingInstance(version, payload,
                                                        roomSid, sid) {
  this._version = version;

  // Marshaled Properties
  this.accountSid = payload.account_sid; // jshint ignore:line
  this.status = payload.status; // jshint ignore:line
  this.dateCreated = deserialize.iso8601DateTime(payload.date_created); // jshint ignore:line
  this.sid = payload.sid; // jshint ignore:line
  this.sourceSid = payload.source_sid; // jshint ignore:line
  this.size = deserialize.integer(payload.size); // jshint ignore:line
  this.url = payload.url; // jshint ignore:line
  this.type = payload.type; // jshint ignore:line
  this.duration = deserialize.integer(payload.duration); // jshint ignore:line
  this.containerFormat = payload.container_format; // jshint ignore:line
  this.codec = payload.codec; // jshint ignore:line
  this.groupingSids = payload.grouping_sids; // jshint ignore:line
  this.trackName = payload.track_name; // jshint ignore:line
  this.offset = deserialize.integer(payload.offset); // jshint ignore:line
  this.mediaExternalLocation = payload.media_external_location; // jshint ignore:line
  this.roomSid = payload.room_sid; // jshint ignore:line
  this.links = payload.links; // jshint ignore:line

  // Context
  this._context = undefined;
  this._solution = {roomSid: roomSid, sid: sid || this.sid, };
};

Object.defineProperty(RoomRecordingInstance.prototype,
  '_proxy', {
    get: function() {
      if (!this._context) {
        this._context = new RoomRecordingContext(this._version, this._solution.roomSid, this._solution.sid);
      }

      return this._context;
    }
});

/* jshint ignore:start */
/**
 * fetch a RoomRecordingInstance
 *
 * @function fetch
 * @memberof Twilio.Video.V1.RoomContext.RoomRecordingInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed RoomRecordingInstance
 */
/* jshint ignore:end */
RoomRecordingInstance.prototype.fetch = function fetch(callback) {
  return this._proxy.fetch(callback);
};

/* jshint ignore:start */
/**
 * remove a RoomRecordingInstance
 *
 * @function remove
 * @memberof Twilio.Video.V1.RoomContext.RoomRecordingInstance#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed RoomRecordingInstance
 */
/* jshint ignore:end */
RoomRecordingInstance.prototype.remove = function remove(callback) {
  return this._proxy.remove(callback);
};

/* jshint ignore:start */
/**
 * Provide a user-friendly representation
 *
 * @function toJSON
 * @memberof Twilio.Video.V1.RoomContext.RoomRecordingInstance#
 *
 * @returns Object
 */
/* jshint ignore:end */
RoomRecordingInstance.prototype.toJSON = function toJSON() {
  let clone = {};
  _.forOwn(this, function(value, key) {
    if (!_.startsWith(key, '_') && ! _.isFunction(value)) {
      clone[key] = value;
    }
  });
  return clone;
};

RoomRecordingInstance.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};


/* jshint ignore:start */
/**
 * Initialize the RoomRecordingContext
 *
 * @constructor Twilio.Video.V1.RoomContext.RoomRecordingContext
 *
 * @param {V1} version - Version of the resource
 * @param {sid} roomSid - The SID of the Room resource with the recording to fetch
 * @param {sid} sid - The SID that identifies the resource to fetch
 */
/* jshint ignore:end */
RoomRecordingContext = function RoomRecordingContext(version, roomSid, sid) {
  this._version = version;

  // Path Solution
  this._solution = {roomSid: roomSid, sid: sid, };
  this._uri = `/Rooms/${roomSid}/Recordings/${sid}`;
};

/* jshint ignore:start */
/**
 * fetch a RoomRecordingInstance
 *
 * @function fetch
 * @memberof Twilio.Video.V1.RoomContext.RoomRecordingContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed RoomRecordingInstance
 */
/* jshint ignore:end */
RoomRecordingContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({uri: this._uri, method: 'GET'});

  promise = promise.then(function(payload) {
    deferred.resolve(new RoomRecordingInstance(
      this._version,
      payload,
      this._solution.roomSid,
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
 * remove a RoomRecordingInstance
 *
 * @function remove
 * @memberof Twilio.Video.V1.RoomContext.RoomRecordingContext#
 *
 * @param {function} [callback] - Callback to handle processed record
 *
 * @returns {Promise} Resolves to processed RoomRecordingInstance
 */
/* jshint ignore:end */
RoomRecordingContext.prototype.remove = function remove(callback) {
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
 * @memberof Twilio.Video.V1.RoomContext.RoomRecordingContext#
 *
 * @returns Object
 */
/* jshint ignore:end */
RoomRecordingContext.prototype.toJSON = function toJSON() {
  return this._solution;
};

RoomRecordingContext.prototype[util.inspect.custom] = function inspect(depth,
    options) {
  return util.inspect(this.toJSON(), options);
};

module.exports = {
  RoomRecordingList: RoomRecordingList,
  RoomRecordingPage: RoomRecordingPage,
  RoomRecordingInstance: RoomRecordingInstance,
  RoomRecordingContext: RoomRecordingContext
};
