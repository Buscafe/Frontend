// Calculo Testes
let notaFinal = new Array ();

$(document).ready(function(){
    //Primeira Pergunta
    // 3 Primeiros botões positivos
    $("#p1chk1").click(function(){
        notaFinal[0] = 2;
    })
    $("#p1chk2").click(function(){
        notaFinal[0] = 1;
    })
    $("#p1chk3").click(function(){
        notaFinal[0] = 0.5;
    })

    //Botão Neutro
    $("#p1chk4").click(function(){
        notaFinal[0] = 0;
    })

    // 3 Últimos botões negativos
    $("#p1chk5").click(function(){
        notaFinal[0] = -2;
    })
    $("#p1chk6").click(function(){
        notaFinal[0] = -1;
    })
    $("#p1chk7").click(function(){
        notaFinal[0] = -0.5;
    })

    //Segunda Pergunta
    // 3 Primeiros botões positivos
    $("#p2chk1").click(function(){
        notaFinal[1] = 2;
    })
    $("#p2chk2").click(function(){
        notaFinal[1] = 1;
    })
    $("#p2chk3").click(function(){
        notaFinal[1] = 0.5;
    })

    //Botão Neutro
    $("#p2chk4").click(function(){
        notaFinal[1] = 0;
    })

    // 3 Últimos botões negativos
    $("#p2chk5").click(function(){
        notaFinal[1] = -2;
    })
    $("#p2chk6").click(function(){
        notaFinal[1] = -1;
    })
    $("#p2chk7").click(function(){
        notaFinal[1] = -0.5;
    })

    //Terceira Pergunta
    // 3 Primeiros botões positivos
    $("#p3chk1").click(function(){
        notaFinal[2] = 2;
    })
    $("#p3chk2").click(function(){
        notaFinal[2] = 1;
    })
    $("#p3chk3").click(function(){
        notaFinal[2] = 0.5;
    })

    //Botão Neutro
    $("#p3chk4").click(function(){
        notaFinal[2] = 0;
    })

    // 3 Últimos botões negativos
    $("#p3chk5").click(function(){
        notaFinal[2] = -2;
    })
    $("#p3chk6").click(function(){
        notaFinal[2] = -1;
    })
    $("#p3chk7").click(function(){
        notaFinal[2] = -0.5;
    })

    //Quarta Pergunta
    // 3 Primeiros botões positivos
    $("#p4chk1").click(function(){
        notaFinal[3] = 2;
    })
    $("#p4chk2").click(function(){
        notaFinal[3] = 1;
    })
    $("#p4chk3").click(function(){
        notaFinal[3] = 0.5;
    })

    //Botão Neutro
    $("#p4chk4").click(function(){
        notaFinal[3] = 0;
    })

    // 3 Últimos botões negativos
    $("#p4chk5").click(function(){
        notaFinal[3] = -2;
    })
    $("#p4chk6").click(function(){
        notaFinal[3] = -1;
    })
    $("#p4chk7").click(function(){
        notaFinal[3] = -0.5;
    })

    //Quinta Pergunta
    // 3 Primeiros botões positivos
    $("#p5chk1").click(function(){
        notaFinal[4] = 2;
    })
    $("#p5chk2").click(function(){
        notaFinal[4] = 1;
    })
    $("#p5chk3").click(function(){
        notaFinal[4] = 0.5;
    })

    //Botão Neutro
    $("#p5chk4").click(function(){
        notaFinal[4] = 0;
    })

    // 3 Últimos botões negativos
    $("#p5chk5").click(function(){
        notaFinal[4] = -2;
    })
    $("#p5chk6").click(function(){
        notaFinal[4] = -1;
    })
    $("#p5chk7").click(function(){
        notaFinal[4] = -0.5;
    })

    $("#btn-result").click(function(){
        $("#result").text("Nota: " + (notaFinal[0] + notaFinal[1] + notaFinal[2] + notaFinal[3] + notaFinal[4]));
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