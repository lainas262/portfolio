var hidden = true;

function showArticles(){
    if(hidden == true){
        document.getElementById("hidden-articles").style.display ="block";
        document.getElementById("article-button").className ="button clicked-button center-block";
        hidden = false;
    }
    else{
        document.getElementById("hidden-articles").style.display ="none";
        document.getElementById("article-button").className ="button unclicked-button center-block";
        hidden = true;
    }
}