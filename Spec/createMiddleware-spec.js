'use strict';
/* jshint expr:true */
var testPath = require('../testPathHelper');

// Setup
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require('sinon-chai');
chai.use(sinonChai);

// Mock the express app
var app = {use: sinon.spy()}; // App spy
var getSpy = sinon.spy();
var postSpy = sinon.spy();
var useSpy = sinon.spy();
var expressMock = {
  Router: function(){return {get: getSpy, post: postSpy, use: useSpy};} // Mock Express Router
};
var subdomain = sinon.spy();
var passport = {passport: {authenticate: sinon.spy()}};
var cors = sinon.spy();

// Require with our mocks
var proxyquire =  require('proxyquire');
var playMiddleware = proxyquire(testPath + 'Server/src/createMiddleware.js', {
  'express': expressMock,
  'express-subdomain': subdomain,
  './authMiddleware': passport,
  'cors': cors
});

// Tests
// Module being tested
describe('Create subdomain middleware', function() {
  // Trigger our spies
  before('Inject app spy', function() {
    playMiddleware.addSubdomain(app);
  });

  describe('Create Middleware', function() {
    it('Should add a CORS handling', function() {
      cors.should.have.been.calledOnce;
    });
    it('Should use the express app', function() {
      app.use.should.have.been.calledOnce;
    });
    it('Should add a subdomain to the express app', function() {
      subdomain.should.have.been.calledOnce;
    });
    it('Should add a GET route for "/"', function() {
      getSpy.should.have.been.calledWith('/');
    });
    it('Should add a GET route for "/logout"', function() {
      getSpy.should.have.been.calledWith('/logout');
    });
    it('Should add a GET route for "/login"', function() {
      getSpy.should.have.been.calledWith('/signup');
    });
    it('Should add a POST route for "/login/local"', function() {
      postSpy.should.have.been.calledWith('/login/local');
    });
    it('Should add a GET route for "/login/:strategy/callback"', function() {
      getSpy.should.have.been.calledWith('/login/:strategy');
    });
    it('Should add a GET route for "/signup"', function() {
      getSpy.should.have.been.calledWith('/signup');
    });
    it('Should add a POST route for "/signup"', function() {
      postSpy.should.have.been.calledWith('/signup');
    });
    it('Should add a GET route for "/create"', function() {
      getSpy.should.have.been.calledWith('/create');
    });
    it('Should add a POST route for "/create"', function() {
      postSpy.should.have.been.calledWith('/create');
    });
    it('Should add a GET route for "/edit/:huntid"', function() {
      getSpy.should.have.been.calledWith('/edit/:huntid');
    });
    it('Should add a POST route for "/edit/:huntid"', function() {
      postSpy.should.have.been.calledWith('/edit/:huntid');
    });
  });
});
