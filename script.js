const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";

let provider;
let signer;
let contract;

async function loadContract() {
  if (typeof window.ethereum === "undefined") {
    alert("Please install MetaMask");
    return;
  }

  provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
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
