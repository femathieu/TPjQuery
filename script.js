$(document).ready(function(){
    $("#input").keypress(function(e) {
        if(e.which == 13) {
            var commande = $("#input").val();

            console.log('commande : ', commande); 
            display(commande);

            if(commande.match(/[=]/gi).length ==1){
                var result = calcul(commande);
                display(result);
            }
        }
    });

    function display(result){
        $("#screen").append('<div> > '+result+' </div>');
    }

    function calcul(commande){
        var result;
        var calcul;
        for(var i = 1 ; i < commande.length ; i++) {
            if(calcul != undefined){
                calcul = calcul + commande[i];
            }else{
                calcul = commande[i];
            }
        }
        result = eval(calcul);
        return result;
    }
});