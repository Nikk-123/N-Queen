function startGame() {
    const curtain = document.getElementById("curtain");
    curtain.style.animation = "waveCurtain 5s linear forwards"; // Apply waving animation
    setTimeout(() => {
        window.location.href = "index.html"; // Redirect after animation completes
    }, 5000); // 5 seconds
}
