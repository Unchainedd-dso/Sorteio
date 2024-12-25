document.addEventListener('DOMContentLoaded', function(){
    document.getElementById('form-sorteio').addEventListener('submit', function(e){
        e.preventDefault();
        
        let numero_maximo = document.getElementById('numero').value
        numero_maximo = parseInt(numero_maximo)
        
        let numero_sorteado = Math.ceil(Math.random()*numero_maximo)
        console.log(numero_sorteado)

        document.getElementById('resultado').innerHTML = numero_sorteado
        document.querySelector('.mensagem-ganhador h3').style = 'display:block'
    })
})