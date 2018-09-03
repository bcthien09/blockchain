'use strict';

const SHA256 = require('crypto-js/sha256');

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}

class Block{
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
}

class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTansactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new Block("09/03/2019", "Genesis block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.caculateHash();
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }

    minePendingTransaction(miningRewardAddress) {
        let block = new Block(Date.now(), this.pendingTansactions);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');

        this.chain.push(block);
        this.pendingTansactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction) {
        this.pendingTansactions.push(transaction);
    }

    getBalanceOfAddress(address) {
        let balance = 0;
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                } 
                
                if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            } 
        }

        return balance;
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.caculateHash()) return false;
            if (currentBlock.previousHash !== previousBlock.hash) return false;
        }

        return true;
    }
}


let firstCoin = new BlockChain();

console.log('Is a blockchain?', firstCoin.isChainValid());

console.log('Mining block 1...');
firstCoin.addBlock(new Block(1, "09/04/2019", {amount: 4}));

console.log('Mining block 2...');
firstCoin.addBlock(new Block(2, "09/05/2019", {amount: 10}));

// Transaction

firstCoin.createTransaction(new Transaction('address1', 'address2', 100));
firstCoin.createTransaction(new Transaction('address2', 'address1', 5));

console.log('\n Starting the miner...');
firstCoin.minePendingTransaction('thien-bui');
console.log('\n Balance of thien-bui is: ' + firstCoin.getBalanceOfAddress('thien-bui'));

console.log('\n Starting the miner again...');
firstCoin.minePendingTransaction('thien-bui');
console.log('\n Balance of thien-bui is: ' + firstCoin.getBalanceOfAddress('thien-bui'));

console.log(firstCoin, null, 4);
