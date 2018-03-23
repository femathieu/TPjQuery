$(document).ready(function(){
    var listCommandes = [];
    $("#input").keypress(function(e) {
        if(e.which == 13) {
            display()
            var commande = $("#input").val();

            memorizeCommande(commande);

            console.log('commande : ', commande);
            $('#display').append('<div style=\'color: red;\'>'+commande+'</div>');

            if(commande.match(/[=]/gi) != null){
                var result = calcul(commande);
                display(result);
            }

            if(commande.match(/^clear$/gi) != null){
                clear();
            }

            if(commande.match(/^exit$/gi) != null){
                $("#input").attr('disabled', 'true');
                display('logout');
                $.ajax({
                    url: 'script.php',
                    type: 'GET',
                    dataType: 'json',
                    data: {'logout' : 'true'},
                    success: function(data, statut){
                        console.log(data.key)
                    },
                    error: function(data, statut, error){
                        console.log(data);
                    }
                });
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

            if(commande.match(/^cd/gi) != null){
                cd(commande);
            }

            if(commande.match(/^ls$/gi) != null){
                ls();
            }

            if(commande.match(/^mkdir/gi) != null){
                mkdir(commande);
            }

            if(commande.match(/^rmdir/gi) != null){
                rmdir(commande);
            }

            if(commande.match(/^vi/gi) != null){
                vi(commande);
            }

            if(commande.match(/^history$/gi) != null){
                memorizeCommande(commande, true);
            }

            if(commande.match(/^reset$/gi) != null){
                reset();
            }

            if(commande.match(/^man$/gi) != null){
                listcmd();
            }

            if(commande.match(/^pwd$/gi) != null){
                cd();
            }
            
            $("#input").val('');
        }
    });

    function memorizeCommande(commande, display = false){
        if(commande != ''){
            if(!display){
                listCommandes.push(commande);
            }
            $.ajax({
                url: 'script.php',               
                type: 'POST',
                dataType: 'json',
                data: {"commande": listCommandes},
                success: function(data, statut){
                    console.log('commandes : ',data.key);
                    if(display){
                        for(var i = 0 ; i < data.key.length ; i++){
                            $("#screen").append('<div> > '+data.key[i]+' </div>');
                        }
                    }
                },
                error: function(data, statut, error){
                    console.log(data);
                }
            });
        }
    }

    function display(result){
        $("#display").append('<div style=\'margin-left: 2em;\'> > '+result+' </div>');
        $("#display").scrollTop($('#display')[0].scrollHeight);
    }

    function calcul(commande){
        var calcul = '';
        for(var i = 1 ; i < commande.length ; i++) {
            calcul = calcul + commande[i];
        }
        var result = eval(calcul);
        return result;
    }

    function clear(){
        $('#display').children().remove();
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

    function cd(commande){
        path = '';
        if(commande != undefined){
            for(var i = 2 ; i < commande.length ; i++){
                if(commande[i] != ' '){
                    path = path + commande[i];
                }
            }
        }

        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'cd' : 'true', 'path': path},
            success: function(data, statut){
                if(data.cd){
                    display(data.key);
                }else{
                    display('no such file directory');
                }
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
        for(var i = 6 ; i < commande.length ; i++) {
            if(commande[i] != ' '){
                path = path + commande[i];
            }
        }
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'mkdir': 'true', 'foldername': path},
            success: function(data, statut){
                if(data.key){
                    display('dossier : '+path+' créé');
                }else{
                    display('le dossier spécifié existe déjà');
                }
            },
            error: function(data, statut, error){
                console.log(data);
            }
        })
    }

    function rmdir(commande){
        var path = '';
        for(var i = 6; i < commande.length ; i++){
            if(commande[i] != ' '){
                path = path + commande[i];
            }
        }
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'rmdir': 'true', 'path': path},
            success: function(data, statut){
                if(data.key){
                    display('dossier : '+path+' supprimé');
                }else{
                    display('le dossier n\'existe pas');
                }
            },
            error: function(data, statut, error){
                console.log(data);
            }
        });
    }

    function vi(commande){
        var filename = '';
        for(var i = 2; i < commande.length ; i++){
            if(commande[i] != ' '){
                filename = filename + commande[i];
            }
        }
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'vi': 'true', 'file': filename},
            success: function(data, statut){
                display(data.key);
            },
            error: function(data, statut, error){
                display('no such file');
                console.log(data);
            }
        });
    }

    function history(){
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'history': 'true'},
            success: function(data, statut){
                console.log(data.key);
                //display(data.key);
            },
            error: function(data, statut, error){
                console.log(data);
            }
        });
    }

    function reset(){
        listCommandes = [];
        clear();
        $.ajax({
            url: 'script.php',
            type: 'POST',
            dataType: 'json',
            data: {'reset': 'true'},
            success: function(data, statut){
                console.log(data.key);
            },
            error: function(data, statut, error){
                console.log(data);
            }
        });
    }

    function listcmd(){
        for(var i = 0 ; i < man.length ; i++){
            display(man[i].nomCommande+' -> '+man[i].action);
        }
    }

    var man = [
        {"nomCommande" : "calcul", "action" : "effectue un calcul"},
        {"nomCommande" : "clear", "action" : "efface l'invite de commande"},
        {"nomCommande" : "exit", "action" : "désactive le champ input de saisie et affiche 'logout' ; permet également de 'kill' la session et de retourner dans le dossier racine"},
        {"nomCommande" : "date", "action" : "affiche la date et l'heure actuelle"},
        {"nomCommande" : "version", "action" : "affiche la version de php utilisé sur le serveur"},
        {"nomCommande" : "free", "action" : "affiche l'espace disque (en GB) disponible sur le serveur"},
        {"nomCommande" : "cd dossier", "action" : "indique le dossier courant"},
        {"nomCommande" : "ls", "action" : "liste les dossiers et fichiers présent dans le dossier courant"},
        {"nomCommande" : "mkdir [nom_dossier]", "action" : "créer un dossier"},
        {"nomCommande" : "rmdir [nom_dossier]", "action" : "efface un dossier"},
        {"nomCommande" : "vi [nom_fichier]", "action" : "affiche un fichier"},
        {"nomCommande" : "history", "action" : "affiche l'historique des commandes"},
        {"nomCommande" : "reset", "action" : "supprime l'historique de commandes et clear l'invite de commande"},
        {"nomCommande" : "man", "action" : "affiche toutes les commandes disponibles"}
    ]
});