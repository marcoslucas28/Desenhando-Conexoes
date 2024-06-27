# Desenhando Conexões

## Sobre o projeto

O projeto **Desenhando Conexões** é um projeto da bolsa de pesquisa Fapema, no qual foi proposta a criação de uma mini CNC plotter com tutoriais interativos no período de um ano. Os participantes podem escolher desenhos, personalizar e observar suas criações ganharem vida. O objetivo dessa página web é ser onde ficam os tutoriais de como usar a CNC.

## Tecnologias usadas

* HTML
* CSS
* Javascript

## Estado Atual do Site

O site está em desenvolvimento e ainda não está completo. Aqui estão algumas áreas nas quais estamos trabalhando:

- **Tutoriais**: Vídeo temporário disponível, pois os tutoriais ainda não foram gravados. Vídeos de arquivo fornecidos por Freepik, baixados de [www.videvo.net](www.videvo.net)
- **Otimização do site**: O site pode apresentar problemas de posicionamento em telas grandes ou dispositivos como um iPad.
- **Responsividade**: Todas as páginas estão responsivas, mas ainda há muito a melhorar.

## Como Você Pode Ajudar

Estamos abertos a sugestões e melhorias! Aqui estão algumas formas de você contribuir:

1. **Sugerir Melhorias na Estrutura do Site**:
   - Revise a estrutura atual das páginas e sugira melhorias no layout, navegação e design.
   - Verifique a coerência e a clareza das informações apresentadas em cada página.
   - Sugira novas seções ou funcionalidades que poderiam agregar valor ao site.

2. **Reportar Problemas**:
   - Abra uma "Issue" descrevendo qualquer bug ou problema que você encontrar no site.
   - Inclua detalhes sobre como reproduzir o problema e, se possível, capturas de tela.

3. **Enviar Pull Requests**:
   - Faça um fork deste repositório.
   - Crie uma nova branch para sua contribuição: `git checkout -b nome-da-sua-branch`.
   - Adicione as alterações: `git add .`.
   - Faça suas modificações e commit: `git commit -m 'Descrição das suas alterações'`.
   - Envie sua branch para o repositório remoto: `git push origin nome-da-sua-branch`.
   - Abra um Pull Request explicando suas alterações.

   ## Estrutura do Repositório

```plaintext
/
├── assents/                 # Demais arquivos que a página vai usar (imagens, CSS, JavaScript, etc.)
│   ├── css/                # Arquivos CSS
│   ├── img/                # Imagens e ícones usados
│   ├── js/                # Arquivos javascript
│   ├── scr/                # Videos usados
├── .gitignore              # Arquivos e diretórios ignorados pelo Git
├── about.html              # Arquivo sobre nós
├── index.html              # Arquivo principal
└── README.md               # Este arquivo

