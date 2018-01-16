let chai = require('chai');
let assert = chai.assert;
let request = require('./testFrameWork/requestSimulator.js');
let app = require('../models/app.js');
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
        th.status_is_ok(res);
        done();
      })
    })
    it('serves the homePage.html for slash if user has valid sessionId', done => {
      request(app, {
        method: 'GET',
        url: '/',
        headers: {
          cookie: 'sessionId=1001',
        }
      }, (res) => {
        th.should_be_redirected_to(res,"/homePage.html")
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
        th.status_is_ok(res);
        done();
      })
    })
    it('serves the homePage.html for slash if user has valid sessionId', done => {
      request(app, {
        method: 'GET',
        url: '/index.html',
        headers: {
          cookie: 'sessionId=1001',
        }
      }, (res) => {
        th.should_be_redirected_to(res,"/homePage.html")
        done();
      })
    })
  })


  describe('GET /logout', () => {
    it('should redirect to index page with expiring cookie if user is loggedin', done => {
      request(app, {
        method: 'GET',
        url: '/logout',
        headers:{
          cookie:"sessionId=1001",
        }
      }, res => {
        th.should_be_redirected_to(res, '/index.html');
        th.should_have_expiring_cookie(res, 'sessionId', "0", "-1");
        done();
      })
    })

    it('redirects to index page without any cookie if user is not loggedin ', done => {
      request(app, {
        method: 'GET',
        url: "/logout",
      }, res => {
        th.should_be_redirected_to(res, '/index.html');
        th.should_not_have_cookie(res, 'sessionId', "0", "-1");
        done();
      })
    })
  })
  describe('GET /homePage.html', () => {
    it('should serve homePage for valid user', done => {
      request(app, {
        method: 'GET',
        url: '/homePage.html',
        headers: {
          'cookie': 'sessionId=1001',
        }
      }, res => {
        th.body_contains(res, 'home Page');
        th.content_type_is(res, "text/html");
        th.status_is_ok(res);
        done();
      })
    })
    it('should redirect to index.html invalid user', done => {
      request(app, {
        method: 'GET',
        url: '/homePage.html',
      }, res => {
        th.should_be_redirected_to(res, "/index.html");
        done();
      })
    })
  })
  describe('GET /atHome (name of to do)', () => {
    it('should serve the respective to do', done => {
      request(app, {
        method: 'GET',
        url: '/atHome',
        headers: {
          cookie: 'sessionId=1001',
        }
      }, res => {
        th.body_contains(res, 'to do');
        th.content_type_is(res, "text/html");
        th.status_is_ok(res);
        done();
      })
    })
  })

  describe('GET /createNewToDo.html', () => {
    it('should serve page to the valid User', done => {
      request(app, {
        method: 'GET',
        url: '/createNewToDo.html',
        headers: {
          cookie: 'sessionId=1001',
        }
      }, res => {
        th.body_contains(res, 'enter new To Do');
        done();
      })
    })
    it('should redirect to index page to the invalid User', done => {
      request(app, {
        method: 'GET',
        url: '/createNewToDo.html'
      }, res => {
        th.should_be_redirected_to(res, "/index.html");
        done();
      })
    })
  })
  describe('POST /newToDo', () => {
    it('should redirect to homePage to the valid User', done => {
      request(app, {
        method: 'POST',
        url: '/newToDo',
        body: 'title:atWork&description:important',
        headers: {
          cookie: 'sessionId=1001',
        },
      }, res => {
        th.should_be_redirected_to(res, "/homePage.html");
        done();
      })
    })
    it('should redirect to index page to the invalid User', done => {
      request(app, {
        method: 'GET',
        url: '/createNewToDo.html'
      }, res => {
        th.should_be_redirected_to(res, "/index.html");
        done();
      })
    })
  })

  describe('POST /editToDo/atHome', () => {
    it('should redirect /atHome ', done => {
      request(app, {
        method: 'POST',
        url: '/editToDo/atHome',
        body: 'title=atWork&description=important',
        headers: {
          cookie: 'sessionId=1001',
        },
      }, res => {
        th.should_be_redirected_to(res, "/atWork");
        done();
      })
    })
    it('should give file not found if user is not loggedin', done => {
      request(app, {
        method: 'POST',
        url: '/editToDo/atHome',
        body: 'title=atWork&description=important',
      }, res => {
        assert.equal(res.statusCode, 404);
        th.body_contains(res,'file not found')
        done();
      })
    })
  })

  describe('POST /delete/atHome', () => {
    it('should redirect /homePage.html', done => {
      request(app, {
        method: 'POST',
        url: '/delete/atHome',
        headers: {
          cookie: 'sessionId=1001',
        },
      }, res => {
        th.should_be_redirected_to(res, "/homePage.html");
        done();
      })
    })
    it('should give file not found if user is not loggedin', done => {
      request(app, {
        method: 'POST',
        url: '/delete/atHome',
      }, res => {
        assert.equal(res.statusCode, 404);
        th.body_contains(res,'file not found')
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
        th.should_have_expiring_cookie(res, 'logInFailed', '1', "5");
        done();
      })
    })
  })
})
