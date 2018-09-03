'use strict';

const BLOCK = require('./block');
const TRANSACTION = require('./transaction');
module.exports  = class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5;
        this.pendingTansactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock() {
        return new BLOCK("09/03/2019", "Genesis block", "0");
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
        let block = new BLOCK(Date.now(), this.pendingTansactions);
        block.mineBlock(this.difficulty);
        console.log('Block successfully mined!');

        this.chain.push(block);
        this.pendingTansactions = [
            new TRANSACTION(null, miningRewardAddress, this.miningReward)
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
};
