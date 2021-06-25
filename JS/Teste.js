// Calculo Testes
let notaFinal = new Array ();

$(document).ready(function(){
    //Primeira Pergunta
    // 3 Primeiros botões positivos
    $("#p1chk1").click(function(){
        notaFinal[0] = 2;
    })
    $("#p1chk2").click(function(){
        notaFinal[0] = 1.6;
    })
    $("#p1chk3").click(function(){
        notaFinal[0] = 1.2;
    })

    //Botão Neutro
    $("#p1chk4").click(function(){
        notaFinal[0] = 1;
    })

    // 3 Últimos botões negativos
    $("#p1chk5").click(function(){
        notaFinal[0] = 0.8;
    })
    $("#p1chk6").click(function(){
        notaFinal[0] = 0.4;
    })
    $("#p1chk7").click(function(){
        notaFinal[0] = 0;
    })

    //Segunda Pergunta
    // 3 Primeiros botões positivos
    $("#p2chk1").click(function(){
        notaFinal[1] = 2;
    })
    $("#p2chk2").click(function(){
        notaFinal[1] = 1.6;
    })
    $("#p2chk3").click(function(){
        notaFinal[1] = 1.2;
    })

    //Botão Neutro
    $("#p2chk4").click(function(){
        notaFinal[1] = 1;
    })

    // 3 Últimos botões negativos
    $("#p2chk5").click(function(){
        notaFinal[1] = 0.8;
    })
    $("#p2chk6").click(function(){
        notaFinal[1] = 0.4;
    })
    $("#p2chk7").click(function(){
        notaFinal[1] = 0;
    })

    //Terceira Pergunta
    // 3 Primeiros botões positivos
    $("#p3chk1").click(function(){
        notaFinal[2] = 2;
    })
    $("#p3chk2").click(function(){
        notaFinal[2] = 1.6;
    })
    $("#p3chk3").click(function(){
        notaFinal[2] = 1.2;
    })

    //Botão Neutro
    $("#p3chk4").click(function(){
        notaFinal[2] = 1;
    })

    // 3 Últimos botões negativos
    $("#p3chk5").click(function(){
        notaFinal[2] = 0.8;
    })
    $("#p3chk6").click(function(){
        notaFinal[2] = 0.4;
    })
    $("#p3chk7").click(function(){
        notaFinal[2] = 0;
    })

    //Quarta Pergunta
    // 3 Primeiros botões positivos
    $("#p4chk1").click(function(){
        notaFinal[3] = 2;
    })
    $("#p4chk2").click(function(){
        notaFinal[3] = 1.6;
    })
    $("#p4chk3").click(function(){
        notaFinal[3] = 1.2;
    })

    //Botão Neutro
    $("#p4chk4").click(function(){
        notaFinal[3] = 1;
    })

    // 3 Últimos botões negativos
    $("#p4chk5").click(function(){
        notaFinal[3] = 0.8;
    })
    $("#p4chk6").click(function(){
        notaFinal[3] = 0.4;
    })
    $("#p4chk7").click(function(){
        notaFinal[3] = 0;
    })

    //Quinta Pergunta
    // 3 Primeiros botões positivos
    $("#p5chk1").click(function(){
        notaFinal[4] = 2;
    })
    $("#p5chk2").click(function(){
        notaFinal[4] = 1.6;
    })
    $("#p5chk3").click(function(){
        notaFinal[4] = 1.2;
    })

    //Botão Neutro
    $("#p5chk4").click(function(){
        notaFinal[4] = 1;
    })

    // 3 Últimos botões negativos
    $("#p5chk5").click(function(){
        notaFinal[4] = 0.8;
    })
    $("#p5chk6").click(function(){
        notaFinal[4] = 0.4;
    })
    $("#p5chk7").click(function(){
        notaFinal[4] = 0;
    })

    //Resultado final
    $("#btn-result").click(function(){
        var resultado = notaFinal[0] + notaFinal[1] + notaFinal[2] + notaFinal[3] + notaFinal[4];
        $("#result").text("Nota: " + (resultado.toFixed(2)));
        if(resultado >8){
            $("#motivação").text("Muito bem, continue assim, Deus te abençõe.");
        } else if(resultado >6){
            $("#motivação").text("Está no caminho certo, só acertar um detalhe ou outro (:");
        } else if(resultado >4){
            $("#motivação").text("Não está mal, mas pode melhorar muito ainda.");
        } else if(resultado >2){
            $("#motivação").text("Tome cuidado, reveja sua vida com Deus e busque sempre melhorar.");
        } else{
            $("#motivação").text("Você precisa de um apoio espiritual, procure uma igreja e peça conselhos!!");
        }
    });
        //alert(notaFinal[0] + notaFinal[1] + notaFinal[2] + notaFinal[3] + notaFinal[4]);
});

// Animação Navbar
function onClickMenu(){
    //Navbar em si
    document.getElementById("navbar").classList.toggle("change-nav");
    //Elementos li do Text-navbar
    document.getElementById("loc").classList.toggle("change-text-nav");
    document.getElementById("texto-li1").classList.toggle("change-text-nav");
    document.getElementById("texto-li2").classList.toggle("change-text-nav");
    document.getElementById("ajuda").classList.toggle("change-text-nav");
    //Menu
    document.getElementById("menu").classList.toggle("change-menu");
}