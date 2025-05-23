const contractAddress = 0xb28761e55891e5ce22D3C94469A6b14669eA2Cc9;

let provider;
let signer;
let contract;

async function connectWallet() {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      document.getElementById("walletAddress").innerText = "Connected: " + accounts[0];
      loadContract();
    } catch (err) {
      console.error("User denied connection", err);
    }
  } else {
    alert("Please install MetaMask!");
  }
}


async function loadContract() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  signer = provider.getSigner();
  contract = new ethers.Contract(contractAddress, contractABI, signer);

  const msg = await contract.message();
  document.getElementById("message").innerText = msg;
}

async function updateMessage() {
  const input = document.getElementById("newMessage").value;
  try {
    const tx = await contract.updateMessage(input);
    document.getElementById("status").innerText = "Updating...";
    await tx.wait();
    document.getElementById("status").innerText = "Message updated!";
    loadContract(); // refresh message
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Transaction failed.";
  }
}

loadContract();
