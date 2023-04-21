// Description: This file contains the functions that will be used to send the responses to the client.

exports.success = (req, res, message, status) => {
    res.status(status || 200).json({
        error: false,
        body: message,
    });
}

exports.error = (req, res, message, status, details) => {
    console.error(`[response error] ${details}`);
    res.status(status || 500).json({
        error: true,
        body: message,
    });
}