const user = require("../models/user.js");
const bcrypt = require("bcytpt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {};

const login = async (req, res) => {};
const logout = async (req, res) => {};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = { register, login, forgotPassword, resetPassword, logout };
