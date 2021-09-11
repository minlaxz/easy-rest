import { isProduction } from "../lib/utils.js";
import { Response } from "./generalResponse.js";

export const userHelloRes = (res, message) =>
    new Response(res, message)
        .welcome();

export const userNotFoundRes = (res, errorMessage) =>
    new Response(res, isProduction() ? `Invalid email or password.` : errorMessage)
        .rejected();

export const userAlreadyRegisterRes = (res, errorMessage) =>
    new Response(res, isProduction() ? `Already registered.` : errorMessage)
        .rejected();

export const userLoggedInRes = (res, token, exp) =>
    new Response(res, `Logged in successfully.`)
        .accepted(200, token, exp, true)

export const userCreatedRes = (res, user) =>
    new Response(res, `User created successfully.`)
        .accepted(201);

export const userNotValidRes = (res, err) =>
    new Response(res, isProduction() ? `Invalid form` : err.details[0].message)
        .rejected();



