'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Holodeck = require('../../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('ItemAssignment', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid create request',
    function(done) {
      holodeck.mock(new Response(500, '{}'));

      var opts = {objectSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'};
      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments.create(opts);
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var bundleSid = 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/${bundleSid}/ItemAssignments`;

      var values = {ObjectSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid create response',
    function(done) {
      var body = JSON.stringify({
          'sid': 'BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'bundle_sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'object_sid': 'RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2019-07-31T02:34:41Z',
          'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(201, body));

      var opts = {objectSid: 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'};
      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments.create(opts);
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should treat the first each arg as a callback',
    function(done) {
      var body = JSON.stringify({
          'results': [
              {
                  'sid': 'BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'bundle_sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'object_sid': 'RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'date_created': '2019-07-31T02:34:41Z',
                  'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      });
      holodeck.mock(new Response(200, body));
      client.numbers.v2.regulatoryCompliance
                       .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .itemAssignments.each(() => done());
    }
  );
  it('should treat the second arg as a callback',
    function(done) {
      var body = JSON.stringify({
          'results': [
              {
                  'sid': 'BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'bundle_sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'object_sid': 'RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'date_created': '2019-07-31T02:34:41Z',
                  'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      });
      holodeck.mock(new Response(200, body));
      client.numbers.v2.regulatoryCompliance
                       .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .itemAssignments.each({pageSize: 20}, () => done());
      holodeck.assertHasRequest(new Request({
          method: 'GET',
          url: 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/${bundleSid}/ItemAssignments',
          params: {PageSize: 20},
      }));
    }
  );
  it('should find the callback in the opts object',
    function(done) {
      var body = JSON.stringify({
          'results': [
              {
                  'sid': 'BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'bundle_sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'object_sid': 'RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'date_created': '2019-07-31T02:34:41Z',
                  'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      });
      holodeck.mock(new Response(200, body));
      client.numbers.v2.regulatoryCompliance
                       .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                       .itemAssignments.each({callback: () => done()}, () => fail('wrong callback!'));
    }
  );
  it('should generate valid list request',
    function(done) {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments.list();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var bundleSid = 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/${bundleSid}/ItemAssignments`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function(done) {
      var body = JSON.stringify({
          'results': [],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid read_full response',
    function(done) {
      var body = JSON.stringify({
          'results': [
              {
                  'sid': 'BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'bundle_sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'object_sid': 'RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'date_created': '2019-07-31T02:34:41Z',
                  'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ],
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'previous_page_url': null,
              'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments?PageSize=50&Page=0',
              'next_page_url': null,
              'key': 'results'
          }
      });

      holodeck.mock(new Response(200, body));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid fetch request',
    function(done) {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments('BVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var bundleSid = 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var sid = 'BVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/${bundleSid}/ItemAssignments/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function(done) {
      var body = JSON.stringify({
          'sid': 'BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'bundle_sid': 'BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'object_sid': 'RDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'date_created': '2019-07-31T02:34:41Z',
          'url': 'https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/BUaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/ItemAssignments/BVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      });

      holodeck.mock(new Response(200, body));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments('BVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid remove request',
    function(done) {
      holodeck.mock(new Response(500, '{}'));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments('BVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').remove();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var bundleSid = 'BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var sid = 'BVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://numbers.twilio.com/v2/RegulatoryCompliance/Bundles/${bundleSid}/ItemAssignments/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function(done) {
      var body = JSON.stringify(null);

      holodeck.mock(new Response(204, body));

      var promise = client.numbers.v2.regulatoryCompliance
                                     .bundles('BUXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                     .itemAssignments('BVXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').remove();
      promise.then(function(response) {
        expect(response).toBe(true);
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});