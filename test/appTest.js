let chai = require('chai');
let assert = chai.assert;
let request = require('./testFrameWork/requestSimulator.js');
let app = require('../models/app.js');
let th = require('./testFrameWork/testHelper.js');

describe('app', () => {
  describe('GET /bad', () => {
    it('responds with 302 if not loggedin', done => {
      request(app, {
        method: 'GET',
        url: '/bad'
      }, (res) => {
        th.should_be_redirected_to(res,"/index");
        done();
      })
    })
  })
  describe('GET /', () => {
    it('serves the index for slash', done => {

      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.body_contains(res, "log In page")
        th.status_is_ok(res);
        done();
      })
    })
    it('serves the homePage for slash if user has valid sessionId', done => {
      request(app, {
        method: 'GET',
        url: '/',
        headers: {
          cookie: 'sessionId=1001',
        }
      }, (res) => {
        th.should_be_redirected_to(res,"/homePage")
        done();
      })
    })
  })
  describe('GET /index', () => {
    it('serves the index', done => {
      request(app, {
        method: 'GET',
        url: '/'
      }, (res) => {
        th.body_contains(res, "log In page")
        th.status_is_ok(res);
        done();
      })
    })
    it('serves the homePage for slash if user has valid sessionId', done => {
      request(app, {
        method: 'GET',
        url: '/index',
        headers: {
          cookie: 'sessionId=1001',
        }
      }, (res) => {
        th.should_be_redirected_to(res,"/homePage")
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
        th.should_be_redirected_to(res, '/index');
        th.should_have_expiring_cookie(res, 'sessionId', "0", "-1");
        done();
      })
    })

    it('redirects to index page without any cookie if user is not loggedin ', done => {
      request(app, {
        method: 'GET',
        url: "/logout",
      }, res => {
        th.should_be_redirected_to(res, '/index');
        th.should_not_have_cookie(res, 'sessionId', "0", "-1");
        done();
      })
    })
  })
  describe('GET /homePage', () => {
    it('should serve homePage for valid user', done => {
      request(app, {
        method: 'GET',
        url: '/homePage',
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
    it('should redirect to index invalid user', done => {
      request(app, {
        method: 'GET',
        url: '/homePage',
      }, res => {
        th.should_be_redirected_to(res, "/index");
        done();
      })
    })
  })
  describe('GET /createNewToDo', () => {
    it('should serve page to the valid User', done => {
      request(app, {
        method: 'GET',
        url: '/createNewToDo',
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
        url: '/createNewToDo'
      }, res => {
        th.should_be_redirected_to(res, "/index");
        done();
      })
    })
  })
  describe('POST /newToDo', () => {
    it('should redirect to homePage to the valid User', done => {
      request(app, {
        method: 'POST',
        url: '/newToDo',
        body: 'title=atWork&description=important',
        headers: {
          cookie: 'sessionId=1001',
        },
      }, res => {
        th.should_be_redirected_to(res, "/homePage");
        done();
      })
    })
    it('should redirect to index page to the invalid User', done => {
      request(app, {
        method: 'GET',
        url: '/createNewToDo'
      }, res => {
        th.should_be_redirected_to(res, "/index");
        done();
      })
    })
  })
  describe('GET /toDo/0', () => {
    it('should serve the respective to do', done => {
      request(app, {
        method: 'GET',
        url: '/toDo/0',
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
  describe('POST /toDo/0', () => {
    it('should redirect /toDo/0 ', done => {
      request(app, {
        method: 'POST',
        url: '/toDo/0',
        body: 'title=atWork&description=important',
        headers: {
          cookie: 'sessionId=1001',
        },
      }, res => {
        th.should_be_redirected_to(res, "/toDo/0");
        done();
      })
    })
    it('should give file not found if user is not loggedin', done => {
      request(app, {
        method: 'POST',
        url: '/toDo/0',
        body: 'title=atWork&description=important',
      }, res => {
        th.should_be_redirected_to(res,"/index")
        done();
      })
    })
  })
  describe('DELETE /toDo/0', () => {
    it('should give me /homePage in responce body', done => {
      request(app, {
        method: 'DELETE',
        url: '/toDo/0',
        headers: {
          cookie: 'sessionId=1001',
        },
      }, res => {
        th.body_contains(res,'/homePage');
        th.status_is_ok(res);
        done();
      })
    })
    it('should give file not found if user is not loggedin', done => {
      request(app, {
        method: 'DELETE',
        url: '/toDo/0',
      }, res => {
        th.should_be_redirected_to(res,"/index");
        done();
      })
    })
  })

  describe('GET /userName', () => {
    it('should give name of the user', done => {
      request(app, {
        method: 'GET',
        url: '/userName',
        headers: {
          cookie: 'sessionId=1001',
        }
      }, res => {
        th.body_contains(res, 'shubham');
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
        th.should_be_redirected_to(res, '/homePage');
        th.should_not_have_cookie(res, 'logInFailed');
        done();
      })
    })

    it('redirects to index with message for invalid user', done => {
      request(app, {
        method: 'POST',
        url: '/logIn',
        body: 'userId=bad&password=user'
      }, res => {
        th.should_be_redirected_to(res, '/index');
        th.should_have_expiring_cookie(res, 'logInFailed', '1', "5");
        done();
      })
    })
  })
})
