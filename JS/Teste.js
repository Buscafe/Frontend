// Calculo Testes
let notaFinal = new Array();

$(document).ready(function(){
    function doTest(nota, chk){
        notaFinal[chk] = nota;
    }
    
    //Resultado final
    $("#btn-result").click(function(){
        let resultado = notaFinal[0] + notaFinal[1] + notaFinal[2] + notaFinal[3] + notaFinal[4];
        $("#result").text("Nota: " + (resultado.toFixed(2)));

        if(resultado > 8){
            $("#motivação").text("Muito bem, continue assim, Deus te abençõe.");
        } else if(resultado > 6){
            $("#motivação").text("Está no caminho certo, só acertar um detalhe ou outro (:");
        } else if(resultado > 4){
            $("#motivação").text("Não está mal, mas pode melhorar muito ainda.");
        } else if(resultado > 2){
            $("#motivação").text("Tome cuidado, reveja sua vida com Deus e busque sempre melhorar.");
        } else{
            $("#motivação").text("Você precisa de um apoio espiritual, procure uma igreja e peça conselhos!!");
        }
    });
        //alert(notaFinal[0] + notaFinal[1] + notaFinal[2] + notaFinal[3] + notaFinal[4]);
});
