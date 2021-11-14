function setWinner(){
    document.getElementById("winnerText").innerHTML = sessionStorage.getItem("Winner") + " Wins!";
    document.getElementById("winnerTitle").innerHTML = sessionStorage.getItem("Winner") + " Wins!";
}

function resetName(){
    sessionStorage.setItem("player1Name", "");
    sessionStorage.setItem("player2Name", "");
    sessionStorage.setItem("player3Name", "");
    sessionStorage.setItem("player4Name", "");
}