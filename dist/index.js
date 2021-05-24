"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var client_1 = require("@prisma/client");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_output_json_1 = __importDefault(require("./swagger-output.json"));
var app = express_1["default"]();
var prisma = new client_1.PrismaClient();
app.use(express_1["default"].json());
app.use(cors_1["default"]());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use("/swagger", swagger_ui_express_1["default"].serve, swagger_ui_express_1["default"].setup(swagger_output_json_1["default"]));
app.post("/user", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var email, user, newUser, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                email = req.body.email;
                console.log(email);
                if (!email) {
                    res.status(400).send("User should include email field");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.user.findFirst({
                        where: {
                            email: email
                        }
                    })];
            case 1:
                user = _b.sent();
                if (user) {
                    res.status(400).send("An user with that email already exists");
                    return [2 /*return*/];
                }
                _b.label = 2;
            case 2:
                _b.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma.user.create({
                        data: {
                            email: email
                        }
                    })];
            case 3:
                newUser = _b.sent();
                res.json(newUser);
                return [3 /*break*/, 5];
            case 4:
                _a = _b.sent();
                res.status(500).send("Whoops, something happened in the server");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.post("/todo", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, content, authorId, user, newTodo, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = req.body, title = _a.title, content = _a.content, authorId = _a.authorId;
                console.log(title, content, authorId);
                if (!title || !content || !authorId) {
                    res.status(400).send("Todo should include title, content and authorId");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, prisma.todo.findFirst({
                        where: {
                            title: title,
                            AND: {
                                authorId: authorId
                            }
                        }
                    })];
            case 1:
                user = _c.sent();
                if (user) {
                    res.status(400).send("A todo with that title already exists");
                    return [2 /*return*/];
                }
                _c.label = 2;
            case 2:
                _c.trys.push([2, 4, , 5]);
                return [4 /*yield*/, prisma.todo.create({
                        data: {
                            title: title,
                            content: content,
                            authorId: authorId
                        }
                    })];
            case 3:
                newTodo = _c.sent();
                res.json(newTodo);
                return [3 /*break*/, 5];
            case 4:
                _b = _c.sent();
                res.status(500).send("Whoops, something happened in the server");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.put("/todo/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, title, content, checked, todo;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                _a = req.body, title = _a.title, content = _a.content, checked = _a.checked;
                return [4 /*yield*/, prisma.todo.update({
                        where: {
                            id: id
                        },
                        data: {
                            title: title,
                            content: content,
                            checked: checked
                        }
                    })];
            case 1:
                todo = _b.sent();
                res.json({
                    todo: todo
                });
                return [2 /*return*/];
        }
    });
}); });
app["delete"]("/todo/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, prisma.todo["delete"]({
                        where: {
                            id: id
                        }
                    })];
            case 1:
                response = _a.sent();
                res.status(200);
                return [2 /*return*/];
        }
    });
}); });
app.get("/todos/:userId", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.params.userId;
                return [4 /*yield*/, prisma.todo.findMany({
                        where: {
                            authorId: userId
                        }
                    })];
            case 1:
                todos = _a.sent();
                res.json({
                    todos: todos
                });
                return [2 /*return*/];
        }
    });
}); });
app.listen((process.env.PORT || 3000), function () {
    console.log("Server listening");
});
//# sourceMappingURL=index.js.map