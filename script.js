$(document).ready(function(){
    $("#input").keypress(function(e) {
        if(e.which == 13) {
            var commande = $("#input").val();

            console.log('commande : ', commande); 
            display(commande);

            if(commande.match(/[=]/gi) != null){
                var result = calcul(commande);
                display(result);
            }

            if(commande.match(/^clear$/gi) != null){
                $('#screen').children().remove();
            }

            if(commande.match(/^exit$/gi) != null){
                $("#input").attr('disabled', 'true');
                display('logout');
            }

            if(commande.match(/^date$/gi) != null){
                date(commande);
            }
            
            $("#input").val('');
        }
    });

    function display(result){
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

    function date(commande){
        $.ajax({
            url: 'script.php',               
            type: 'GET',
            dataType: 'json',
            data: {"date": "true"},
            success: function(data, statut){
                display(data.key);
            },
            error: function(data, statut, error){
                alert(error);
            }
    });
    }
});