$(document).ready(function(){
    $("#input").keypress(function(e) {
        var listcommandes = []
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

            if(commande.match(/^clear$/gi) != null){
                $('#screen').children().remove();
            }

            if(commande.match(/^exit$/gi) != null){
                $("#input").attr('disabled', 'true');
                display('logout');
            }
            
            if(commande.match(/^version$/gi) != null){
                version();
            }
            
            if(commande.match(/^free$/gi) != null){
                free();
            }
            
            if(commande.match(/^pwd$/gi) != null){
                pwd();
            }
            
            if (commande.match(/^ls$/gi) != null){
                ls();
            }
            
            if (commande.match(/^mkdir/gi) != null){
                mkdir(commande);
            }
            
            if (commande.match(/^rmdir/gi) != null){
                rmdir(commande);
            }
            
            if (commande.match(/^vi/gi) != null){
                vi(commande);
            }
            
            if (commande.mach(/^history$/gi) != null){
                history(commande);
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
    
    function version(){
        $.ajax({
            url: 'script.php',
            type: 'GET',
            dataType: 'json', 
            data: { 'version': 'true'},
            success: function(data, statut){
                display(data.key);
            },
            error: function(data, statut, error){
                console.log (error);
            }
        })
    }
    
    function free(){
        $.ajax({
            url: 'script.php',
            type: 'GET',
            dataType: 'json',
            data: {'free': 'true'},
            success: function(data, statut){
                var espacedispo =  data.key +' Gb'
                display(espacedispo);
            },
            error: function(data, statut, error){
                console.log (error);
            }
        })
    }
    
    function pwd(){
        $.ajax({
            url: 'script.php',
            type: 'GET',
            dataType: 'json',
            data: {'pwd': 'true'},
            success: function(data, statut){
                display(data.key);
            },
            error: function(data, statut, error){
                console.log (error);
            }
        })
    }
    
    function ls(){
        $.ajax({
            url: 'script.php',
            type: 'GET',
            dataType: 'json',
            data: {'ls': 'true'},
            success: function(data, statut){
                
                console.log(data.key);
                for (var i =0; i<data.key.files.length; i++){
                    display(data.key.files[i]+' ('+data.key.is_dir[i]+')');
                }
            },
            error: function(data, statut, error){
                console.log (error);
            }
        })
    }
    
    function mkdir(commande){
        var create = ''
        /*cette partie sert à parser le code */
        for (var i = 5; i< commande.length; i++ ){
            console.log('create partiel : ', create);
            if(commande[i] != ' '){
                create = create + commande[i];    
            }
            
        }
        console.log('create final :', create);
        
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {
                'mkdir': 'true',
                'nomdossier': create
                  },
            success: function(data, statut){
                console.log(data.key);
                console.log(create);
                if(data.key){
                    display('dossier : '+create+' créé');    
                }
                
            },
            error: function(data, statut, error){
                console.log (error);
            }
        })
    }
    
    function rmdir(commande){
        var remove = ''
        for (var i = 5; i < commande.length; i++ ){
            console.log('remove partiel : ', remove);
            /*enlever lespace avant le nom du dossier*/
            if(commande[i] != ' '){
                remove = remove + commande[i];    
            }
            
        }
        console.log('remove final :', remove);
        
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {
                'rmdir': 'true',
                'nomdossier': remove
                  },
            success: function(data, statut){
                console.log(data.key);
                console.log(remove);
                if(data.key){
                    display('dossier : '+remove+' supprimé')
                }
            },
            error : function(data, statut, error){
                console.log (error);
            }
        })
    }
    
    function vi(commande){
        var open = ''
        for (var i =2; i < commande.length; i++){
            console.log('ouverture du ficher: ', open);
            if (commande[i] != ' '){
                open = open + commande[i];
            }
        }
        
        console.log('ouverture fichier final :', open);
        
        $.ajax({
            url: 'script.php',
            type: 'GET',
            dataType: 'json',
            data: {
                'vi': 'true',
                'nomdossier': open
                },
            success: function(data, statut){
                console.log(data.key);
                console.log(open);
                if(data.key){
                    display('ouverture du ficher :<br> ' +data.key)
                }
            },
            error : function(data, statut, error){
                console.log (error);
            }
        })
    }
    
    function history(commande){
        $.ajax({
            url: 'script.php',
            type: 'GET',
            dataType: 'json',
            data: {'commande': listcommandes},
            success: function(data, statut){
                console.log(data.key);
            },
            error: function(data, statut, error){
                console.log (error);
            }
        })
    }
    
});