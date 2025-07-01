'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "@import \"tailwindcss\";";
styleInject(css_248z,{"insertAt":"top"});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var AuthContext = react.createContext(undefined);
var AuthProvider = function (_a) {
    var children = _a.children, _b = _a.initialUser, initialUser = _b === void 0 ? null : _b, _c = _a.apiEndpoint, apiEndpoint = _c === void 0 ? '/api/auth' : _c, _d = _a.storageKey, storageKey = _d === void 0 ? 'auth-user' : _d;
    var _e = react.useState(initialUser), user = _e[0], setUser = _e[1];
    var _f = react.useState(false), isLoading = _f[0], setIsLoading = _f[1];
    var _g = react.useState(null), error = _g[0], setError = _g[1];
    var _h = react.useState(false), isInitialized = _h[0], setIsInitialized = _h[1];
    // SSR-safe initialization
    react.useEffect(function () {
        if (typeof window !== 'undefined') {
            try {
                var storedUser = localStorage.getItem(storageKey);
                if (storedUser && !initialUser) {
                    setUser(JSON.parse(storedUser));
                }
            }
            catch (err) {
                console.warn('Failed to load user from localStorage:', err);
            }
            setIsInitialized(true);
        }
    }, [storageKey, initialUser]);
    // Persist user to localStorage (client-side only)
    react.useEffect(function () {
        if (typeof window !== 'undefined' && isInitialized) {
            if (user) {
                localStorage.setItem(storageKey, JSON.stringify(user));
            }
            else {
                localStorage.removeItem(storageKey);
            }
        }
    }, [user, storageKey, isInitialized]);
    var login = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
        var response, data, err_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("".concat(apiEndpoint, "/login"), {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ email: email, password: password }),
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    if (response.ok && data.user) {
                        setUser(data.user);
                        return [2 /*return*/, { success: true, user: data.user }];
                    }
                    else {
                        throw new Error(data.message || 'Login failed');
                    }
                case 4:
                    err_1 = _a.sent();
                    errorMessage = err_1 instanceof Error ? err_1.message : 'Login failed';
                    setError(errorMessage);
                    return [2 /*return*/, { success: false, error: errorMessage }];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var logout = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, fetch("".concat(apiEndpoint, "/logout"), { method: 'POST' })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 5];
                case 3:
                    err_2 = _a.sent();
                    console.warn('Logout request failed:', err_2);
                    return [3 /*break*/, 5];
                case 4:
                    setUser(null);
                    setError(null);
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var value = {
        user: user,
        isAuthenticated: !!user,
        isLoading: isLoading,
        error: error,
        login: login,
        logout: logout,
        isInitialized: isInitialized
    };
    return (jsxRuntime.jsx(AuthContext.Provider, __assign({ value: value }, { children: children })));
};
var useAuth = function () {
    var context = react.useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

/**
 * lucide-react v0.0.1 - ISC
 */

var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

/**
 * lucide-react v0.0.1 - ISC
 */


const toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const createLucideIcon = (iconName, iconNode) => {
  const Component = react.forwardRef(
    ({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, children, ...rest }, ref) => react.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: `lucide lucide-${toKebabCase(iconName)}`,
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => react.createElement(tag, attrs)),
        ...(Array.isArray(children) ? children : [children]) || []
      ]
    )
  );
  Component.displayName = `${iconName}`;
  return Component;
};
var createLucideIcon$1 = createLucideIcon;

/**
 * lucide-react v0.0.1 - ISC
 */


const EyeOff = createLucideIcon$1("EyeOff", [
  ["path", { d: "M9.88 9.88a3 3 0 1 0 4.24 4.24", key: "1jxqfv" }],
  [
    "path",
    {
      d: "M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68",
      key: "9wicm4"
    }
  ],
  [
    "path",
    {
      d: "M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61",
      key: "1jreej"
    }
  ],
  ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Eye = createLucideIcon$1("Eye", [
  [
    "path",
    { d: "M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z", key: "rwhkz3" }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Lock = createLucideIcon$1("Lock", [
  [
    "rect",
    {
      width: "18",
      height: "11",
      x: "3",
      y: "11",
      rx: "2",
      ry: "2",
      key: "1w4ew1"
    }
  ],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const LogOut = createLucideIcon$1("LogOut", [
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
  ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
  ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const Mail = createLucideIcon$1("Mail", [
  [
    "rect",
    { width: "20", height: "16", x: "2", y: "4", rx: "2", key: "18n3k1" }
  ],
  ["path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7", key: "1ocrg3" }]
]);

/**
 * lucide-react v0.0.1 - ISC
 */


const User = createLucideIcon$1("User", [
  ["path", { d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2", key: "975kel" }],
  ["circle", { cx: "12", cy: "7", r: "4", key: "17ys0d" }]
]);

var LoginCard = function (_a) {
    var onSuccess = _a.onSuccess, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.showSignup, showSignup = _c === void 0 ? false : _c, _d = _a.title, title = _d === void 0 ? 'Welcome Back' : _d, _e = _a.subtitle, subtitle = _e === void 0 ? 'Sign in to your account' : _e, customValidator = _a.customValidator;
    var _f = react.useState(''), email = _f[0], setEmail = _f[1];
    var _g = react.useState(''), password = _g[0], setPassword = _g[1];
    var _h = react.useState(''), name = _h[0], setName = _h[1];
    var _j = react.useState(false), showPassword = _j[0], setShowPassword = _j[1];
    var _k = react.useState(false), isSignup = _k[0], setIsSignup = _k[1];
    var _l = useAuth(), login = _l.login, isLoading = _l.isLoading, error = _l.error;
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!email || !password)
                        return [2 /*return*/];
                    if (!customValidator) return [3 /*break*/, 2];
                    return [4 /*yield*/, customValidator(email, password)];
                case 1:
                    result = _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, login(email, password)];
                case 3:
                    result = _a.sent();
                    _a.label = 4;
                case 4:
                    if (result.success && onSuccess && result.user) {
                        onSuccess(result.user);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleKeyPress = function (e) {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };
    return (jsxRuntime.jsx("div", __assign({ className: "w-full max-w-md mx-auto ".concat(className) }, { children: jsxRuntime.jsxs("div", __assign({ className: "bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden" }, { children: [jsxRuntime.jsx("div", __assign({ className: "bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6" }, { children: jsxRuntime.jsxs("div", __assign({ className: "text-center" }, { children: [jsxRuntime.jsx("div", __assign({ className: "inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4" }, { children: jsxRuntime.jsx(Lock, { className: "w-6 h-6 text-white" }) })), jsxRuntime.jsx("h2", __assign({ className: "text-2xl font-bold text-white" }, { children: title })), jsxRuntime.jsx("p", __assign({ className: "text-blue-100 mt-1" }, { children: subtitle }))] })) })), jsxRuntime.jsx("div", __assign({ className: "p-8" }, { children: jsxRuntime.jsxs("div", __assign({ className: "space-y-6" }, { children: [isSignup && (jsxRuntime.jsxs("div", __assign({ className: "space-y-2" }, { children: [jsxRuntime.jsx("label", __assign({ className: "text-sm font-medium text-gray-700 block" }, { children: "Full Name" })), jsxRuntime.jsxs("div", __assign({ className: "relative" }, { children: [jsxRuntime.jsx(User, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), jsxRuntime.jsx("input", { type: "text", value: name, onChange: function (e) { return setName(e.target.value); }, onKeyPress: handleKeyPress, className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200", placeholder: "Enter your full name", autoComplete: "name" })] }))] }))), jsxRuntime.jsxs("div", __assign({ className: "space-y-2" }, { children: [jsxRuntime.jsx("label", __assign({ className: "text-sm font-medium text-gray-700 block" }, { children: "Email Address" })), jsxRuntime.jsxs("div", __assign({ className: "relative" }, { children: [jsxRuntime.jsx(Mail, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), jsxRuntime.jsx("input", { type: "email", value: email, onChange: function (e) { return setEmail(e.target.value); }, onKeyPress: handleKeyPress, className: "w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200", placeholder: "Enter your email", autoComplete: "email" })] }))] })), jsxRuntime.jsxs("div", __assign({ className: "space-y-2" }, { children: [jsxRuntime.jsx("label", __assign({ className: "text-sm font-medium text-gray-700 block" }, { children: "Password" })), jsxRuntime.jsxs("div", __assign({ className: "relative" }, { children: [jsxRuntime.jsx(Lock, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" }), jsxRuntime.jsx("input", { type: showPassword ? 'text' : 'password', value: password, onChange: function (e) { return setPassword(e.target.value); }, onKeyPress: handleKeyPress, className: "w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200", placeholder: "Enter your password", autoComplete: "current-password" }), jsxRuntime.jsx("button", __assign({ type: "button", onClick: function () { return setShowPassword(!showPassword); }, className: "absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" }, { children: showPassword ? jsxRuntime.jsx(EyeOff, { className: "w-5 h-5" }) : jsxRuntime.jsx(Eye, { className: "w-5 h-5" }) }))] }))] })), error && (jsxRuntime.jsx("div", __assign({ className: "bg-red-50 border border-red-200 rounded-lg p-3" }, { children: jsxRuntime.jsx("p", __assign({ className: "text-red-700 text-sm" }, { children: error })) }))), jsxRuntime.jsx("button", __assign({ type: "button", onClick: handleSubmit, disabled: isLoading || !email || !password, className: "w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200" }, { children: isLoading ? (jsxRuntime.jsxs("div", __assign({ className: "flex items-center justify-center" }, { children: [jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" }), "Signing in..."] }))) : (isSignup ? 'Create Account' : 'Sign In') })), showSignup && (jsxRuntime.jsx("div", __assign({ className: "text-center" }, { children: jsxRuntime.jsx("button", __assign({ type: "button", onClick: function () { return setIsSignup(!isSignup); }, className: "text-blue-600 hover:text-blue-700 text-sm font-medium" }, { children: isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign up" })) })))] })) }))] })) })));
};

var UserProfile = function (_a) {
    var _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.showLogout, showLogout = _c === void 0 ? true : _c, _d = _a.avatarSize, avatarSize = _d === void 0 ? 'md' : _d;
    var _e = useAuth(), user = _e.user, logout = _e.logout, isLoading = _e.isLoading;
    if (!user)
        return null;
    var avatarSizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-12 h-12',
        lg: 'w-16 h-16'
    };
    var handleLogout = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, logout()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (jsxRuntime.jsxs("div", __assign({ className: "bg-white rounded-lg shadow-md p-6 ".concat(className) }, { children: [jsxRuntime.jsxs("div", __assign({ className: "flex items-center space-x-4" }, { children: [jsxRuntime.jsx("div", __assign({ className: "".concat(avatarSizeClasses[avatarSize], " rounded-full overflow-hidden bg-gray-200 flex items-center justify-center") }, { children: user.avatar ? (jsxRuntime.jsx("img", { src: user.avatar, alt: user.name, className: "w-full h-full object-cover" })) : (jsxRuntime.jsx(User, { className: "w-1/2 h-1/2 text-gray-400" })) })), jsxRuntime.jsxs("div", __assign({ className: "flex-1 min-w-0" }, { children: [jsxRuntime.jsx("h3", __assign({ className: "font-semibold text-gray-900 truncate" }, { children: user.name })), jsxRuntime.jsx("p", __assign({ className: "text-gray-600 text-sm truncate" }, { children: user.email }))] })), showLogout && (jsxRuntime.jsx("button", __assign({ onClick: handleLogout, disabled: isLoading, className: "text-gray-400 hover:text-red-600 transition-colors p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50", title: "Logout" }, { children: isLoading ? (jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-gray-400" })) : (jsxRuntime.jsx(LogOut, { className: "w-5 h-5" })) })))] })), (user.role || user.department) && (jsxRuntime.jsxs("div", __assign({ className: "mt-4 pt-4 border-t border-gray-200" }, { children: [user.role && (jsxRuntime.jsxs("div", __assign({ className: "flex items-center justify-between text-sm" }, { children: [jsxRuntime.jsx("span", __assign({ className: "text-gray-500" }, { children: "Role:" })), jsxRuntime.jsx("span", __assign({ className: "font-medium text-gray-900" }, { children: user.role }))] }))), user.department && (jsxRuntime.jsxs("div", __assign({ className: "flex items-center justify-between text-sm mt-1" }, { children: [jsxRuntime.jsx("span", __assign({ className: "text-gray-500" }, { children: "Department:" })), jsxRuntime.jsx("span", __assign({ className: "font-medium text-gray-900" }, { children: user.department }))] })))] })))] })));
};

var AuthGuard = function (_a) {
    var children = _a.children, fallback = _a.fallback, _b = _a.requireAuth, requireAuth = _b === void 0 ? true : _b, _c = _a.loadingComponent, loadingComponent = _c === void 0 ? (jsxRuntime.jsx("div", __assign({ className: "flex justify-center items-center h-32" }, { children: jsxRuntime.jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }) }))) : _c;
    var _d = useAuth(), isAuthenticated = _d.isAuthenticated, isInitialized = _d.isInitialized;
    // Show loading during SSR hydration
    if (!isInitialized) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: loadingComponent });
    }
    // Require authentication but user is not authenticated
    if (requireAuth && !isAuthenticated) {
        return jsxRuntime.jsx(jsxRuntime.Fragment, { children: fallback || jsxRuntime.jsx(LoginCard, {}) });
    }
    // Don't require authentication but user is authenticated (e.g., login page)
    if (!requireAuth && isAuthenticated) {
        return null;
    }
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: children });
};

exports.AuthGuard = AuthGuard;
exports.AuthProvider = AuthProvider;
exports.LoginCard = LoginCard;
exports.UserProfile = UserProfile;
exports.useAuth = useAuth;
//# sourceMappingURL=index.js.map
