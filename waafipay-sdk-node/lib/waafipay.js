"use strict";

var config = require("../config/config.json");
var request = require("request");
var open = require("open");
var data = {
    schemaVersion: "1.0",
    requestId: "7102205824",
    timestamp: "2022-02-04 Africa",
    channelName: "WEB",
    referenceId: Math.floor(100000 + Math.random() * 900000),
    invoiceId: Math.floor(100000 + Math.random() * 900000)
};

var WaafiPayAPI = function (apiKey, apiUserId, merchantUid, { testMode, apiMode }) {

    var url;

    testMode ? url = config.prodUrl : url = config.testUrl;

    console.log(url);


    if (typeof apiKey === "string") {
        this.apiKey = apiKey;
    } else {
        throw new Error("Valid Api key is required.");
    }

    if (typeof apiUserId === "string") {
        this.apiUserId = apiUserId;
    } else {
        throw new Error("Valid Api UserId is required.");
    }

    if (typeof merchantUid === "string") {
        this.merchantUid = merchantUid;
    } else {
        throw new Error("Valid merchantUid is required.");
    }


    var preAuthorize = function (options, callback) {

        if (options === undefined || typeof options !== "object") throw new Error("Valid options are required.");
        if (options.paymentMethod === undefined) throw new Error("Unique paymentMethod is not provided.");
        if (options.amount === undefined) throw new Error("Amount is not provided.");
        if (options.currency === undefined) throw new Error("Currency is not provided.");
        if (options.description === undefined) throw new Error("Description is not provided.");
        if (options.accountNo === undefined) throw new Error("AccountNo is not provided.");


        var payerInfo = new Object();
        payerInfo.accountNo = options.accountNo;

        var transactionInfo = new Object();
        transactionInfo.referenceId = data.referenceId;
        transactionInfo.invoiceId = data.invoiceId;
        transactionInfo.amount = options.amount;
        transactionInfo.currency = options.currency;
        transactionInfo.description = options.description;

        var serviceParams = new Object();
        serviceParams.merchantUid = merchantUid;
        serviceParams.apiUserId = apiUserId;
        serviceParams.apiKey = apiKey;
        serviceParams.paymentMethod = options.paymentMethod;
        serviceParams.payerInfo = payerInfo;
        serviceParams.transactionInfo = transactionInfo;

        var postData = new Object()
        postData.schemaVersion = data.schemaVersion;
        postData.requestId = data.requestId;
        postData.timestamp = data.timestamp;
        postData.channelName = data.channelName;
        postData.serviceName = 'API_PREAUTHORIZE';
        postData.serviceParams = serviceParams

        console.log(postData)

        request({
            url: url,
            method: "POST",
            json: true,
            body: postData
        }, function (error, response, body) {
            callback(error, body);
        });
    };

    var preAuthorizeCommit = function (options, callback) {

        if (options === undefined || typeof options !== "object") throw new Error("Valid options are required.");
        if (options.transactionId === undefined) throw new Error("TransactionId is not provided.");
        if (options.description === undefined) throw new Error("Description is not provided.");


        var serviceParams = new Object();
        serviceParams.merchantUid = merchantUid;
        serviceParams.apiUserId = apiUserId;
        serviceParams.apiKey = apiKey;
        serviceParams.transactionId = options.transactionId,
            serviceParams.description = options.description,
            serviceParams.referenceId = data.referenceId


        var postData = new Object()
        postData.schemaVersion = data.schemaVersion;
        postData.requestId = data.requestId;
        postData.timestamp = data.timestamp;
        postData.channelName = data.channelName;
        postData.serviceName = 'API_PREAUTHORIZE_COMMIT';
        postData.serviceParams = serviceParams

        console.log(postData)

        request({
            url: url,
            method: "POST",
            json: true,
            body: postData
        }, function (error, response, body) {
            callback(error, body);
        });
    };

    var preAuthorizeCancel = function (options, callback) {

        if (options === undefined || typeof options !== "object") throw new Error("Valid options are required.");
        if (options.transactionId === undefined) throw new Error("TransactionId is not provided.");
        if (options.description === undefined) throw new Error("Description is not provided.");


        var serviceParams = new Object();
        serviceParams.merchantUid = merchantUid;
        serviceParams.apiUserId = apiUserId;
        serviceParams.apiKey = apiKey;
        serviceParams.transactionId = options.transactionId,
            serviceParams.description = options.description,
            serviceParams.referenceId = data.referenceId


        var postData = new Object()
        postData.schemaVersion = data.schemaVersion;
        postData.requestId = data.requestId;
        postData.timestamp = data.timestamp;
        postData.channelName = data.channelName;
        postData.serviceName = 'API_PREAUTHORIZE_CANCEL';
        postData.serviceParams = serviceParams

        console.log(postData)

        request({
            url: url,
            method: "POST",
            json: true,
            body: postData
        }, function (error, response, body) {
            callback(error, body);
        });
    };
    var getAccountInfo = function (options, callback) {

        if (options === undefined || typeof options !== "object") throw new Error("Valid options are required.");
        if (options.accountNo === undefined) throw new Error("AccountNo is not provided.");
        if (options.currency === undefined) throw new Error("Currency is not provided.");


        var payerInfo = new Object();
        payerInfo.accountNo = options.accountNo;
        payerInfo.accountType = "MERCHANT",
            payerInfo.currency = options.currency

        var serviceParams = new Object();
        serviceParams.merchantUid = merchantUid;
        serviceParams.apiUserId = apiUserId;
        serviceParams.apiKey = apiKey;
        serviceParams.paymentMethod = options.paymentMethod;
        serviceParams.payerInfo = payerInfo;


        var postData = new Object()
        postData.schemaVersion = data.schemaVersion;
        postData.requestId = data.requestId;
        postData.timestamp = data.timestamp;
        postData.channelName = data.channelName;
        postData.serviceName = 'API_GETACCOUNTINFO';
        postData.serviceParams = serviceParams;

        console.log(postData)

        request({
            url: url,
            method: "POST",
            json: true,
            body: postData
        }, function (error, response, body) {
            callback(error, body);
        });
    };
    var getCreditAccount = function (options, callback) {

        if (options === undefined || typeof options !== "object") throw new Error("Valid options are required.");
        if (options.accountNo === undefined) throw new Error("AccountNo is not provided.");
        if (options.accountHolder === undefined) throw new Error("AccountHolder is not provided.");
        if (options.currency === undefined) throw new Error("Currency is not provided.");
        if (options.amount === undefined) throw new Error("Amount is not provided.");
        if (options.description === undefined) throw new Error("Description is not provided.");
        if (options.paymentMethod === undefined) throw new Error("PaymentMethod is not provided.");


        var payerInfo = new Object();
        payerInfo.accountNo = options.accountNo;
        payerInfo.accountType = "MERCHANT",
            payerInfo.accountHolder = options.accountHolder

        var transactionInfo = new Object();
        transactionInfo.referenceId = data.referenceId;
        transactionInfo.invoiceId = data.invoiceId;
        transactionInfo.amount = options.amount;
        transactionInfo.currency = options.currency;
        transactionInfo.description = options.description;

        var serviceParams = new Object();
        serviceParams.merchantUid = merchantUid;
        serviceParams.apiUserId = apiUserId;
        serviceParams.apiKey = apiKey;
        serviceParams.paymentMethod = options.paymentMethod;
        serviceParams.payerInfo = payerInfo;
        serviceParams.transactionInfo = transactionInfo;


        var postData = new Object()
        postData.schemaVersion = data.schemaVersion;
        postData.requestId = data.requestId;
        postData.timestamp = data.timestamp;
        postData.channelName = data.channelName;
        postData.serviceName = 'API_CREDITACCOUNT';
        postData.serviceParams = serviceParams;

        console.log(postData)

        request({
            url: url,
            method: "POST",
            followAllRedirects: true,
            json: true,
            body: postData
        }, function (error, response, body) {
            callback(error, body);
        });
    };



    this.preAuthorize = preAuthorize;
    this.preAuthorizeCommit = preAuthorizeCommit;
    this.preAuthorizeCancel = preAuthorizeCancel;
    this.getAccountInfo = getAccountInfo;
    this.getCreditAccount = getCreditAccount;

    return this;
}

var WaafiPayHPP = function (hppKey, storeId, merchantUid, { testMode }) {

    var url;

    testMode ? url = config.testUrl : url = config.prodUrl;

    console.log(url);


    if (typeof hppKey === "string") {
        this.hppKey = hppKey;
    } else {
        throw new Error("Valid HPP key is required.");
    }

    if (typeof storeId === "string") {
        this.storeId = storeId;
    } else {
        throw new Error("Valid storeId is required.");
    }

    if (typeof merchantUid === "string") {
        this.merchantUid = merchantUid;
    } else {
        throw new Error("Valid merchantUid is required.");
    }

    var hppPurchase = function (options, callback) {

        if (options === undefined || typeof options !== "object") throw new Error("Valid options are required.");
        if (options.paymentMethod === undefined) throw new Error("Unique paymentMethod is not provided.");
        if (options.amount === undefined) throw new Error("Amount is not provided.");
        if (options.hppSuccessCallbackUrl === undefined) throw new Error("HppSuccessCallbackUrl is not provided.");
        if (options.hppFailureCallbackUrl === undefined) throw new Error("HppFailureCallbackUrl is not provided.");
        if (options.currency === undefined) throw new Error("Currency is not provided.");
        if (options.description === undefined) throw new Error("Description is not provided.");
        if (options.subscriptionId === undefined) throw new Error("SubscriptionId is not provided.");


        var payerInfo = new Object();
        payerInfo.subscriptionId = options.subscriptionId;

        var transactionInfo = new Object();
        transactionInfo.referenceId = data.referenceId;
        transactionInfo.invoiceId = data.invoiceId;
        transactionInfo.amount = options.amount;
        transactionInfo.currency = options.currency;
        transactionInfo.description = options.description;

        var serviceParams = new Object();
        serviceParams.merchantUid = merchantUid;
        serviceParams.storeId = storeId;
        serviceParams.hppKey = hppKey;
        serviceParams.hppSuccessCallbackUrl = options.hppSuccessCallbackUrl;
        serviceParams.hppFailureCallbackUrl = options.hppFailureCallbackUrl;
        serviceParams.hppRespDataFormat = '1'
        serviceParams.paymentMethod = options.paymentMethod;
        serviceParams.payerInfo = payerInfo;
        serviceParams.transactionInfo = transactionInfo;

        var postData = new Object()
        postData.schemaVersion = data.schemaVersion;
        postData.requestId = data.requestId;
        postData.timestamp = data.timestamp;
        postData.channelName = data.channelName;
        postData.serviceName = 'HPP_PURCHASE';
        postData.serviceParams = serviceParams

        console.log(postData)

        request({
            url: url,
            method: "POST",
            json: true,
            body: postData
        }, function (error, response, body) {
            open(body.params.hppUrl+'?hppRequestId='+body.params.hppRequestId+'&referenceId='+ body.params.referenceId, function (err) {
                if (err) throw err;
            });
            callback(error, body);
        });
    };

    var HPPCancelTransaction = function (options, callback) {

        if (options === undefined || typeof options !== "object") throw new Error("Valid options are required.");
        if (options.transactionId === undefined) throw new Error("TransactionId is not provided.");
        if (options.description === undefined) throw new Error("Description is not provided.");


        var serviceParams = new Object();
        serviceParams.merchantUid = merchantUid;
        serviceParams.storeId = storeId;
        serviceParams.hppKey = hppKey;
        serviceParams.transactionId = options.transactionId,
        serviceParams.description = options.description;
        serviceParams.referenceId = data.referenceId;

        var postData = new Object()
        postData.schemaVersion = data.schemaVersion;
        postData.requestId = data.requestId;
        postData.timestamp = data.timestamp;
        postData.channelName = data.channelName;
        postData.serviceName = 'HPP_CANCELPURCHASE';
        postData.serviceParams = serviceParams

        console.log(postData)

        request({
            url: url,
            method: "POST",
            json: true,
            body: postData
        }, function (error, response, body) {
            open(body.params.hppUrl+'?hppRequestId='+body.params.hppRequestId+'&referenceId='+ body.params.referenceId, function (err) {
                if (err) throw err;
            });
            callback(error, body);
        });
    };

    this.hppPurchase = hppPurchase;
    this.HPPCancelTransaction = HPPCancelTransaction;
}

function API(apiKey, apiUserId, merchantUid, { testMode }) {
    return new WaafiPayAPI(apiKey, apiUserId, merchantUid, { testMode });
};
function HPP(hppKey, storeId, merchantUid, { testMode }) {
    return new WaafiPayHPP(hppKey, storeId, merchantUid, { testMode });
};

module.exports = {
    API: API,
    HPP: HPP

}
