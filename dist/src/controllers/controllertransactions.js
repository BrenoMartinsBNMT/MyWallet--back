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
import { db } from "../../databases/dbPostgres";
import dayjs from "dayjs";
export function getTransactions(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var token, idUser, transactions, balance, transactionsFormated, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    token = req.body.token;
                    return [4 /*yield*/, db.query("SELECT user_id FROM sessions WHERE token = $1", [token])];
                case 1:
                    idUser = _b.sent();
                    return [4 /*yield*/, db.query("SELECT  users.name as name, transactions.*  FROM transactions JOIN users ON id = $1", [idUser.rows[0].user_id])];
                case 2:
                    transactions = _b.sent();
                    return [4 /*yield*/, db.query("SELECT SUM(value) as balance FROM transactions WHERE user_id = $1", [idUser.rows[0].user_id])];
                case 3:
                    balance = _b.sent();
                    console.log(balance.rows[0]);
                    transactionsFormated = {
                        name: transactions.rows[0].name,
                        infosTransactions: transactions.rows.map(function (element) {
                            return {
                                type: element.type,
                                value: element.value,
                                description: element.description,
                                date: dayjs(element.date).format("MM/YY")
                            };
                        })
                    };
                    console.log(transactionsFormated);
                    return [2 /*return*/, res.json()];
                case 4:
                    _a = _b.sent();
                    res.sendStatus(404);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
export function addBalance(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, balance, token, description, idUser, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, balance = _a.balance, token = _a.token, description = _a.description;
                    return [4 /*yield*/, db.query("SELECT user_id FROM sessions WHERE token = $1", [token])];
                case 1:
                    idUser = _b.sent();
                    return [4 /*yield*/, db.query("INSERT INTO transactions (type,user_id,value,description) VALUES ($1,$2,$3,$4)", ["add", idUser.rows[0].user_id, balance, description])];
                case 2:
                    _b.sent();
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _b.sent();
                    res.send(e_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
export function subsBalance(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, balance, token, description, idUser, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, balance = _a.balance, token = _a.token, description = _a.description;
                    return [4 /*yield*/, db.query("SELECT user_id FROM sessions WHERE token = $1", [token])];
                case 1:
                    idUser = _b.sent();
                    return [4 /*yield*/, db.query("INSERT INTO transactions (type,user_id,value,description) VALUES ($1,$2,$3,$4)", ["subs", idUser.rows[0].user_id, -balance, description])];
                case 2:
                    _b.sent();
                    res.sendStatus(201);
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    res.send(e_2);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
