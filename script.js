function copyWallet() {
    const walletAddress = document.getElementById("wallet-address").textContent;
    navigator.clipboard.writeText(walletAddress).then(() => {
        alert("Wallet address copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy wallet address: ", err);
    });
}
