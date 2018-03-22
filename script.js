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

            if(commande.match(/^version$/gi) != null){
                version();
            }

            if(commande.match(/^free$/gi) != null){
                free();
            }

            if(commande.match(/^cd dossier$/gi) != null){
                cd();
            }

            if(commande.match(/^ls$/gi) != null){
                ls();
            }

            if(commande.match(/^mkdir/gi) != null){
                mkdir(commande);
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
            calcul = calcul + commande[i];
        }
        var result = eval(calcul);
        return result;
    }

    function date(){
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

    function version(){
        $.ajax({
            url: 'script.php',               
            type: 'GET',
            dataType: 'json',
            data: {"version": "true"},
            success: function(data, statut){
                display(data.key);
            },
            error: function(data, statut, error){
                console.log(error);
            }
        });
    }

    function free(){
        $.ajax({
            url: 'script.php',
            type: 'GET',
            dataType: 'json',
            data: {'free' : 'true'},
            success: function(data, statut){
                var espacedispo = data.key + ' GB';
                display(espacedispo);
            },
            error: function(data, statut, error){
                console.log(data);
            }
        });
    }

    function cd(){
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'cd' : 'true'},
            success: function(data, statut){
                display(data.key);
            },
            error: function(data, statut, error){
                console.log(data);
            }
        });
    }

    function ls(){
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'ls' : 'true'},
            success: function(data, statut){
                for(var i = 0 ; i < data.key.files.length ; i++){
                    display(data.key.files[i]+' ('+data.key.is_dir[i]+')');
                }
            },
            error: function(data, statut, error){
                console.log(data);
            }
        });
    }

    function mkdir(commande){
        var path = '';
        for(var i = 5 ; i < commande.length ; i++) {
            path = path + commande[i];
        }
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'mkdir': 'true', 'path': path},
            success: function(data, statut){
                if(data.key){
                    display('dossier : '+path+' créé');
                }
            },
            error: function(data, statut, error){
                console.log(data);
            }
        })
    }
});