/*
 * node-crisp-status-reporter
 *
 * Copyright 2018, Crisp IM SARL
 * Author: Valerian Saliou <valerian@valeriansaliou.name>
 */


"use strict";


var CrispStatusReporter = require("../").CrispStatusReporter;
var assert = require("assert");


describe("crisp-status-reporter", function() {
  describe("constructor", function() {
    it("should succeed creating an instance with valid options", function() {
      assert.doesNotThrow(
        function() {
          new CrispStatusReporter({
            url        : "http://localhost:8080",
            token      : "REPLACE_THIS_WITH_A_SECRET_KEY",
            probe_id   : "relay",
            node_id    : "socket-client",
            replica_id : "192.168.1.10",
            interval   : 30,
            console    : require("console")
          });
        },

        "CrispStatusReporter should not throw on valid options"
      );
    });

    it("should fail creating an instance with missing URL", function() {
      assert.throws(
        function() {
          new CrispStatusReporter({
            token      : "REPLACE_THIS_WITH_A_SECRET_KEY",
            probe_id   : "relay",
            node_id    : "socket-client",
            replica_id : "192.168.1.10"
          });
        },

        "CrispStatusReporter should throw on missing URL"
      );
    });

    it("should fail creating an instance with invalid URL", function() {
      assert.throws(
        function() {
          new CrispStatusReporter({
            url        : 0,
            token      : "REPLACE_THIS_WITH_A_SECRET_KEY",
            probe_id   : "relay",
            node_id    : "socket-client",
            replica_id : "192.168.1.10"
          });
        },

        "CrispStatusReporter should throw on invalid URL"
      );
    });

    it("should fail creating an instance with missing token", function() {
      assert.throws(
        function() {
          new CrispStatusReporter({
            token      : "REPLACE_THIS_WITH_A_SECRET_KEY",
            probe_id   : "relay",
            node_id    : "socket-client",
            replica_id : "192.168.1.10"
          });
        },

        "CrispStatusReporter should throw on missing token"
      );
    });

    it("should fail creating an instance with missing probe_id", function() {
      assert.throws(
        function() {
          new CrispStatusReporter({
            url        : "http://localhost:8080",
            token      : "REPLACE_THIS_WITH_A_SECRET_KEY",
            node_id    : "socket-client",
            replica_id : "192.168.1.10"
          });
        },

        "CrispStatusReporter should throw on missing probe_id"
      );
    });

    it("should fail creating an instance with invalid node_id", function() {
      assert.throws(
        function() {
          new CrispStatusReporter({
            url        : "http://localhost:8080",
            token      : "REPLACE_THIS_WITH_A_SECRET_KEY",
            probe_id   : "relay",
            replica_id : "192.168.1.10"
          });
        },

        "CrispStatusReporter should throw on invalid node_id"
      );
    });

    it("should fail creating an instance with invalid replica_id",
      function() {
        assert.throws(
          function() {
            new CrispStatusReporter({
              url        : "http://localhost:8080",
              token      : "REPLACE_THIS_WITH_A_SECRET_KEY",
              probe_id   : "relay",
              node_id    : "socket-client"
            });
          },

          "CrispStatusReporter should throw on invalid replica_id"
        );
      }
    );
  });

  describe("reporter", function() {
    it("should report metrics after a few seconds", function(done) {
      this.timeout(20000)

      var crispStatusReporter = new CrispStatusReporter({
        url        : "http://localhost:8080",
        token      : "REPLACE_THIS_WITH_A_SECRET_KEY",
        probe_id   : "relay",
        node_id    : "socket-client",
        replica_id : "192.168.1.10",
        console    : require("console")
      });

      setTimeout(function() {
        assert.equal(
          crispStatusReporter.end(), true, "Reporter should be ended"
        );

        done();
      }, 15000);
    });
  });
});
