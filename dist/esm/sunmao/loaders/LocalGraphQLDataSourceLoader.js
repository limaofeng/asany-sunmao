function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { gql } from '@apollo/client';

var LocalGraphQLDataSourceLoader = /*#__PURE__*/function () {
  function LocalGraphQLDataSourceLoader(client) {
    _classCallCheck(this, LocalGraphQLDataSourceLoader);

    _defineProperty(this, "type", 'local');

    _defineProperty(this, "client", void 0);

    this.client = client;
  }

  _createClass(LocalGraphQLDataSourceLoader, [{
    key: "load",
    value: function load() {
      var _this = this;

      return {
        dataset: function () {
          var _dataset = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
            var gqlStr, variables, _yield$query, data, loading;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    gqlStr = options.gql, variables = options.variables;
                    _context.next = 3;
                    return _this.client.query({
                      query: gql(gqlStr),
                      variables: variables,
                      fetchPolicy: 'no-cache'
                    });

                  case 3:
                    _yield$query = _context.sent;
                    data = _yield$query.data;
                    loading = _yield$query.loading;
                    return _context.abrupt("return", {
                      data: data,
                      loading: loading
                    });

                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          function dataset(_x) {
            return _dataset.apply(this, arguments);
          }

          return dataset;
        }()
      };
    }
  }]);

  return LocalGraphQLDataSourceLoader;
}();

export default LocalGraphQLDataSourceLoader;