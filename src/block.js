'use strict';

const SHA256 = require('crypto-js/sha256');

module.exports = class Block{
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.hash = this.caculateHash();
        this.nonce = 0;
    }

    caculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

    mineBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce ++;
            this.hash = this.caculateHash();
        }

        console.log('Block mined: ' + this.hash)
    }
};
