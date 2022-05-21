# Introduction
SDK is an software development kit that enables the client applications to communicate directly with WaafiPay servers in a secure environment. The data communication happens in a predefined message format. SDK are available in Javascript & Typescript programming languages, allowing for easy integration into a merchant’s existing website or application.

# Integration SDK

## Payment Methods
##### 1. CREDIT_CARD: for credit_card transactions
##### 2. MWALLET_ACCOUNT: for MFS transactions with all companies like (Hormuud, Telesom, Golis, Somnet)
##### 3. MWALLET_BANKACCOUNT: for MFS customer's bank account like (Salaam African Bank)



## A PreAuthorize transaction

If you sent your payment PreAuthorize using this reqeust and the payment is PreAuthorized

1. Communicates with the card-issuer through payment-gateway
2. Reserves the funds in the customer’s account
3. Every PreAuthorize transaction must be completed either by sending PreAuthorize_Commit or PreAuthorize_Cancel request.



```javascript
// For PreAuthorize Use 

 const waafipay = require('waafipay-sdk-node').API("API-1901083745AHX", "1000297", "M0912269", {testMode: true}); // TestMode flag -->  true is production : false is test 

waafipay.preAuthorize({
    paymentMethod: "MWALLET_ACCOUNT",
    accountNo: "252619977991",
    amount: "1",
    currency: "USD",
    description: "wan diray"
}, function(err, res){
    console.log("response", res)
})

```


## A PreAuthorize Commit transaction

If you sent your payment PreAuthorize and then commit it the payment is full PreAuthorized

1. Commits the original transaction done by PreAuthorize service.
2. deducts funds from customer account including charges


```javascript
// For PreAuthorize Commit Use 

 const waafipay = require('waafipay-sdk-node').API("API-1901083745AHX", "1000297", "M0912269", {testMode: true}); // TestMode flag -->  true is production : false is test 

 waafipay.preAuthorizeCommit({
    transactionId: "1241328",
    description: "commited",
 }, function(err, res){
    console.log("response", res)
 })

```


## A PreAuthorize Cancel transaction

If you sent your payment PreAuthorize and then commit it and you want to cancel the payment this request would be cancel it.

1. Cancels the original transaction done by PreAuthorize service
2. returns the funds to customer account

```javascript
// For PreAuthorize Cancel Use 

 const waafipay = require('waafipay-sdk-node').API("API-1901083745AHX", "1000297", "M0912269", {testMode: true}); // TestMode flag -->  true is production : false is test 

 waafipay.preAuthorizeCancel({
    transactionId: "1241330",
    description: "cancellation",
 }, function(err, res){
    console.log("response", res)
 })

```

## Query Account Info Service
If you Query your payment Account Info Service request it would get the customer account information

1. Communicates with the card-issuer through payment-gateway
2. Retrieves the customer account information

```javascript
// For Query Account Info Use 

 const waafipay = require('waafipay-sdk-node').API("API-1901083745AHX", "1000297", "M0912269", {testMode: true}); // TestMode flag -->  true is production : false is test 

 waafipay.getAccountInfo({
    paymentMethod: "MWALLET_ACCOUNT",
    accountNo: "252615414470",
    currency: "USD",
 }, function(err, res){
    console.log("response", res)
 })

```

## Credit Account transaction
If you Query your card-issuer through our payment-gateway, it would be used Credits or Deposits the customer’s account

1. Communicates with the card-issuer through payment-gateway
2. Credits/Deposits the funds in the customer’s account

```javascript
// For Credit Account Use 

 const waafipay = require('waafipay-sdk-node').API("API-1901083745AHX", "1000297", "M0912269", {testMode: true}); // TestMode flag -->  true is production : false is test 


 waafipay.getCreditAccount({
    paymentMethod: "MWALLET_ACCOUNT",
    accountNo: "252615414470",
    accountHolder: "jabriil warsame",
    amount: "1",
    currency: "USD",
    description: "wan diray"
 }, function(err, res){
    console.log("response", res)
 })

```

## HPP Purchase Transaction

API is an application programming interface that enables the client applications to communicate directly with WaafiPay servers in a secure environment. The data communication happens in a predefined message format. APIs are available in many different programming languages, allowing for easy integration into a merchant’s existing website or application.

### A Purchase transaction
1. Verifies funds on the customer’s card with issuer bank/institution,
2. Removes the funds form the customers account
3. Prepares them for deposit into the merchant’s account.

#### Steps 

##### A Complete process how the transaction happens between Merchant_website and WaafiPay server.

1. The process starts when the customer checkout the order page on the merchant website.
2. Merchant_webapp sends a json message (includes hpp_credentials and transaction details) to WaafiPay_server
3. WaafiPay_server returns a json response which includes hppUrl and hppRequestId
4. Merchant_webapp posts the info(hppRequestId, referenceId) to the hppUrl
5. WaafiPay_server displays the screen to collect the creditcard/MFS account details. (in case of bankaccount - send MWALLET_BANKACCOUNT instead of DEBIT_CARD)
6. The customer will press the submit button after entering the card info.
7. WaafiPay_server process the card info and returns the result to the Merchant_callback_url via post method.

```javascript
// For HPP Purchase Use 

 const waafipay = require('waafipay-sdk-node').HPP("HPP-554757642", "1000011", "M0910002", {testMode: true}); // TestMode flag -->  true is production : false is test 


 waafipay.hppPurchase({
    paymentMethod: "CREDIT_CARD",
    subscriptionId: "252615414470",
    hppSuccessCallbackUrl: "http://localhost:3333/pg/recharge/simpurchase",
    hppFailureCallbackUrl: "http://localhost:3333/pg/recharge/simpurchase",
    amount: "1",
    currency: "USD",
    description: "wan diray"
 }, function(err, res){
    console.log("response", res)    
 })

```

## HPP Cancellation Transaction
Hosted Paypage Transaction cancellation request

### A cancellation request
1. Creates a new request to cancel the transaction,
2. will be verified by authorized resources.
3. if success, it will return the amount to customer account.

```javascript
// For HPP Cancellation Use 

 const waafipay = require('waafipay-sdk-node').HPP("HPP-554757642", "1000011", "M0910002", {testMode: true}); // TestMode flag -->  true is production : false is test 


 waafipay.HPPCancelTransaction({
    transactionId: "1241409",
    description: "wan diray"
 }, function(err, res){
    console.log("response", res)    
 })

```


