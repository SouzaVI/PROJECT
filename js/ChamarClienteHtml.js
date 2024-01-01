// seu_script_principal.js

document.addEventListener('DOMContentLoaded', function () {
    // Função para carregar dinamicamente o conteúdo
    function carregarConteudo(url, containerId) {
        fetch(url)
            .then(response => response.text())
            .then(data => {
                document.getElementById(containerId).innerHTML = data;
            })
            .catch(error => console.error('Erro ao carregar o conteúdo:', error));
    }

    // Chamada para carregar o conteúdo no container desejado
    carregarConteudo('cliente.html', 'conteudoContainer');
});
