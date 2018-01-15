let chai = require('chai');
let assert = chai.assert;
let request = require('./testFrameWork/requestSimulator.js');
// process.env.COMMENT_STORE = "./testStore.json";
let app = require('../app.js');
let th = require('./testFrameWork/testHelper.js');


describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 404', done => {
      request(app, {
        method: 'GET',
        url: '/bad'
      }, (res) => {
        assert.equal(res.statusCode, 404);
        done();
      })
    })
  })
  describe('GET /', () => {
    it('serves the index.html for slash', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.body_contains(res, "log In page")
        done();
      })
    })
  })

  describe('GET /index.html', () => {
    it('serves the index.html', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.body_contains(res, "log In page")
        done();
      })
    })
  })

  describe('POST /logIn', () => {
    it('redirects to homePage for valid user', done => {
      request(app, {
        method: 'POST',
        url: '/logIn',
        body: 'userId=shubham&password=shubham'
      }, res => {
        th.should_be_redirected_to(res, '/homePage.html');
        th.should_not_have_cookie(res, 'logInFailed');
        done();
      })
    })
    it('redirects to index.html with message for invalid user', done => {
      request(app, {
        method: 'POST',
        url: '/logIn',
        body: 'userId=bad&password=user'
      }, res => {
        th.should_be_redirected_to(res, '/index.html');
        th.should_have_expiring_cookie(res, 'logInFailed', '1',"5");
        done();
      })
    })
  })
  describe('GET /logOut', () => {
    it('delets cookies and redirects to index page', done => {
      request(app, {
        method: 'GET',
        url: '/logOut',
      }, res => {
        th.should_be_redirected_to(res, '/index.html');
        th.should_have_expiring_cookie(res,'sessionId',"0","-1");
        done();
      })
    })
  })
})
