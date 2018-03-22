$(document).ready(function(){
    $("#input").keypress(function(e) {
        /*identifiant de la touche entrer*/
        if(e.which == 13) { 
            /*recuperer la valeur dans linput*/
            var commande = $("#input").val();
            
            console.log('commande : ', commande); 
            display(commande); /*affiche la methode commande*/

            if(commande.match(/[=]/gi) != null){
                var result = calcul(commande);
                display(result);
            }

            if(commande.match(/[clear]/gi) != null){
                $('#screen').children().remove();
            }

            if(commande.match(/[exit]/gi) != null){
                $("#input").attr('disabled', 'true');
                display('logout');
            }
            
            $("#input").val('');
        }
    });

    function display(result){ /*afficher sur lecran le resultat*/
        $("#screen").append('<div> > '+result+' </div>');
    }

    function calcul(commande){
        var calcul = '';
        for(var i = 1 ; i < commande.length ; i++) {
            if(calcul != undefined){
                calcul = calcul + commande[i];
            }
        }
        var result = eval(calcul);
        return result;
    }
});