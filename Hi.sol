// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloBlockchain {
    string public message;

    constructor() {
        message = "Hello, blockchain world!";
    }

    function updateMessage(string memory newMessage) public {
        message = newMessage;
    }
}
