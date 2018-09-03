'use strict';

const TRANSACTION = require('./src/transaction');
const BLOCK = require('./src/block');
const BLOCKCHAIN = require('./src/blockchain');

let firstCoin = new BLOCKCHAIN();

console.log('Is a blockchain?', firstCoin.isChainValid());

console.log('Mining block 1...');
firstCoin.addBlock(new BLOCK(1, "09/04/2019", {amount: 4}));

console.log('Mining block 2...');
firstCoin.addBlock(new BLOCK(2, "09/05/2019", {amount: 10}));

// Transaction

firstCoin.createTransaction(new TRANSACTION('address1', 'address2', 100));
firstCoin.createTransaction(new TRANSACTION('address2', 'address1', 5));

console.log('\n Starting the miner...');
firstCoin.minePendingTransaction('thien-bui');
console.log('\n Balance of thien-bui is: ' + firstCoin.getBalanceOfAddress('thien-bui'));

console.log('\n Starting the miner again...');
firstCoin.minePendingTransaction('thien-bui');
console.log('\n Balance of thien-bui is: ' + firstCoin.getBalanceOfAddress('thien-bui'));

console.log(firstCoin, null, 4);
