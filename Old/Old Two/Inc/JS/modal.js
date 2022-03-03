var modal;
var span;

function LoadModal(){
    // Get the modal
    modal = document.getElementById("myModal");
    console.log(modal);

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];


    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        CloseModal();
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            CloseModal();
        }
    }
}

function OpenModal(subID){
    modal.style.display = "block";

    if(subID != "" && subID != null){
        let subContent = document.getElementById(subID);

        if(subContent != null && subContent != undefined){
            subContent.style.display = "block";
        }
        
    }
}

function CloseModal(){
    modal.style.display = "none";

    let subContents = document.getElementsByClassName('modal-content-inner');
    for( let i = 0; i < subContents.length; i++){
        subContents[i].style.display = "";
    }
}