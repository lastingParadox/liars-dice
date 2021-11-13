
function toggleRules(){
    let rulesText = document.getElementById("rulesDisplay");
    console.log(rulesText.style.display);
    if(rulesText.style.display == "none"){
        rulesText.style.display = "block";
    }
    else if (rulesText.style.display == "block"){
        rulesText.style.display = "none"
    }
}