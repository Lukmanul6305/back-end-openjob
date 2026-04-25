export const sendResponse = (res, statusCode, status, message, data = null) => {
    const response = { status, message };
    if (data !== null) response.data = data;
    return res.status(statusCode).json(response);
};

export const sendSuccess = (res, message, data = null, statusCode = 200) => {
    return sendResponse(res, statusCode, 'success', message, data);
};

export const sendFail = (res, message, statusCode = 400) => {
    return sendResponse(res, statusCode, 'fail', message);
};

export const sendError = (res, message = 'Internal Server Error', statusCode = 500) => {
    return sendResponse(res, statusCode, 'error', message);
};