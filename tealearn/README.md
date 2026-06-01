# Tea Learn — Versão HTML, CSS e JavaScript

Plataforma educacional voltada a alunos com TEA nível 1, em HTML, CSS e JS puros.

## Estrutura

```
tealearn/
├── index.html        # Tela de Login
├── dashboard.html    # Home (materiais recentes + upload)
├── materiais.html    # Meus Materiais (filtro por matéria + upload)
├── css/
│   └── styles.css
└── js/
    ├── login.js
    ├── dashboard.js
    └── materiais.js
```

## Como rodar

Basta abrir `index.html` no navegador. Para evitar bloqueios de arquivos locais,
recomendo um servidor estático simples:

```bash
# Python
python3 -m http.server 8080

# Node (npx)
npx serve .
```

Depois acesse `http://localhost:8080`.

## Paleta de cores

| Cor                | Hex       |
| ------------------ | --------- |
| Fundo (areia)      | `#ECE6DD` |
| Cartão             | `#F3EDE4` |
| Navy (primária)    | `#1B2B3A` |
| Areia (secundária) | `#D3C3B9` |
| Caramelo (acento)  | `#B58863` |
| Borda              | `#D8D0C5` |
