var hidden = true;

function showArticles(){
    if(hidden == true){
        document.getElementById("hidden-articles").style.display ="block";
        hidden = false;
    }
    else{
        document.getElementById("hidden-articles").style.display ="none";
        document.getElementById("article-button").className ="btn btn-default center-block";
        hidden = true;
    }
}