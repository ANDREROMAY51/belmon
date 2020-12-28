function fechar_pedido(){
    let preco1 = document.getElementById("tabela").rows[1].cells[2].innerHTML.replace(",",".").replace("R$ ","");
    let qde1 = window.document.getElementById("kit1").value;

    let preco2 = document.getElementById("tabela").rows[2].cells[2].innerHTML.replace(",",".").replace("R$ ","");
    let qde2 = window.document.getElementById("kit2").value;

    let preco3 = document.getElementById("tabela").rows[3].cells[2].innerHTML.replace(",",".").replace("R$ ","");
    let qde3 = window.document.getElementById("kit3").value;
    //verifica se pelo menos um item foi escolhido
    if (qde1 == "" && qde2 == "" && qde3 == "" ){
        alert("Por favor, escolha pelo menos a quantidade de um item.");
        document.getElementById("kit1").focus();
    } else {
        // faz os cálculos e transforma em reais
        let valor1 = preco1 * qde1;
        let valor1ext = valor1.toFixed(2).replace(".", ",").replace(""," R$ ");

        let valor2 = preco2 * qde2;
        let valor2ext = valor2.toFixed(2).replace(".", ",").replace(""," R$ ");

        let valor3 = preco3 * qde3;
        let valor3ext = valor3.toFixed(2).replace(".", ",").replace(""," R$ ");

        //soma os valores
        let total = valor1 + valor2 + valor3;
        let totalext = total.toFixed(2).replace(".", ",").replace(""," R$ ");
        document.getElementById("total").innerHTML = totalext; 
        
        alert(`O total de seu pedido foi :${totalext}.\nFinalize preenchedo as informações abaixo.`);
        document.getElementById("nome").focus();//foca o campo nome
        
    }
}  

//gera o e-mail com o pedido
function email() {
    //validação    
    let prod1 = document.getElementById("tabela").rows[1].cells[0].innerHTML;
    let preco1 = document.getElementById("tabela").rows[1].cells[2].innerHTML.replace(",",".").replace("R$ ","");
    let preco1ext = document.getElementById("tabela").rows[1].cells[2].innerHTML;
    let qde1 = window.document.getElementById("kit1").value;
    let valor1 = qde1*preco1;
    let valor1ext = valor1.toFixed(2).replace(".", ",").replace(""," R$ ");
    
    let prod2 = document.getElementById("tabela").rows[2].cells[0].innerHTML;
    let preco2 = document.getElementById("tabela").rows[2].cells[2].innerHTML.replace(",",".").replace("R$ ","");
    let preco2ext = document.getElementById("tabela").rows[2].cells[2].innerHTML
    let qde2 = window.document.getElementById("kit2").value;
    let valor2 = qde2*preco2;
    let valor2ext = valor2.toFixed(2).replace(".", ",").replace(""," R$ ");

    let prod3 = document.getElementById("tabela").rows[3].cells[0].innerHTML;
    let preco3 = document.getElementById("tabela").rows[3].cells[2].innerHTML.replace(",",".").replace("R$ ","");
    let preco3ext = document.getElementById("tabela").rows[3].cells[2].innerHTML
    let qde3 = window.document.getElementById("kit3").value;
    let valor3 = qde3*preco3;
    let valor3ext = valor3.toFixed(2).replace(".", ",").replace(""," R$ ");

    if (qde1 == "" && qde2 == "" && qde3 == "" ) {
        alert("Antes de clicar aqui, precisa:\n1 - Escolher ao menos a quantidade de um item.\n2 - Preencher o nome.");
        document.getElementById("kit1").focus();  
    } else {
        let nome = document.getElementById("nome").value;
        if (nome == ""){
            alert("Por favor, preencha o campo nome para continuar.");
            document.getElementById("nome").focus();
        } else {   
            if (qde1 > 0) {
                let produto1 = `produto:  ${prod1}.....qde:  ${qde1} unidades.....Preço Unitário: .....${preco1ext}.....Valor: ${valor1ext}\n`;
                document.getElementById("produto1").innerHTML = produto1;                 
            } else {
                produto1 = "";
                document.getElementById("produto1").innerHTML = produto1;                             
            }
            if (qde2 > 0) {
                let produto2 = `produto:  ${prod2}.....qde:  ${qde2} unidades.....Preço Unitário: .....${preco2ext}.....Valor: ${valor2ext}\n`;
                document.getElementById("produto2").innerHTML = produto2; 
            } else {
                produto2 = "";
                document.getElementById("produto2").innerHTML = produto2;                  
            }    
            if (qde3 > 0){
                 let produto3 = `produto:  ${prod3}.....qde:  ${qde3} unidades.....Preço Unitário: .....${preco3ext}.....Valor: ${valor3ext}\n`;
                 document.getElementById("produto3").innerHTML = produto3;    
            } else {
                produto3 = "";
                document.getElementById("produto3").innerHTML = produto3;                       
            }                
            let produto_1 = document.getElementById("produto1").innerHTML;
            let produto_2 = document.getElementById("produto2").innerHTML;
            let produto_3 = document.getElementById("produto3").innerHTML;
            let produtos = `${produto_1} ${produto_2} ${produto_3}`;
            
            let total = document.getElementById("total").innerHTML;            

            let textarea = document.getElementById("textarea").value;
            if (textarea == "") {
                textarea = "sem informações";
            }
            //seleção da forma de entrega
            let escolhas = document.getElementsByName("escolha");
            for (let i = 0; i < escolhas.length; i++) {
                if (escolhas[i].checked) {
                    let escolha = "Você prefere:  " + `${escolhas[i].value }`;
                    document.getElementById("escolhido").innerHTML = escolha; //para sair do loop colocar uma tag p para receber o conteúdo e poder ser usada fora                                      
                } 
            }           
    
            let escolha = document.getElementById("escolhido"); //variável fora para poder ser usada 

            //gera o protocolo    
            let qde_n = 9; //protocolo poderá ter até 9 dígitos aleatórios
            let qde = "9".repeat(qde_n)
            let aleatorio = Math.floor(Math.random() * qde + 1);
            alert(`Olá ${nome},\nObrigado pela preferência!\nSeu e-mail já está pronto para ser enviado.\nO número de seu pedido é:  ${aleatorio}`);
            let destinatario = "belmonvegan@gmail.com"; //email da BelmonVegan                   
        
            //preparando o e-mail
            let link = `mailto: ${destinatario}`
                + "?cc=" + ""
                + "&subject=" + encodeURIComponent(`BelmonVegan Pedido nº:${aleatorio}`)
                + "&body=" + encodeURIComponent(`Olá, ${nome}, obrigado pela preferência!\n\nSeu Pedido:\n${produtos}\nTotal: ${total}\n\nInformações Adicionais: ${textarea}\n\n${escolha.innerHTML}\n\nAguarde que nós entraremos em contato.\n\nAtenciosamente,\nBelmon Vegan`);
       
            window.open(link, "_blank");    
        
            //ir para o topo da página
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            //limpa os campos
            document.getElementById("kit1").value = "";
            document.getElementById("kit2").value = "";
            document.getElementById("kit3").value = "";
            document.getElementById("nome").value = ""
            document.getElementById("textarea").value = "";
        }                 
    }   
}