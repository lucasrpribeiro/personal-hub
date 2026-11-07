---
title: "Tipografia como interface: quando a palavra guia a interação"
description: "Por que as boas escolhas tipográficas fazem mais pela experiência de leitura e clareza de produto do que qualquer elemento decorativo."
date: "2026-07-15"
category: "tech"
tags: ["design", "tipografia", "css", "arquitetura"]
featured: true
readingTime: "5 min de leitura"
---

## A página em branco é o ponto de partida

Quando removemos tudo o que não é essencial em um produto digital, sobra o texto. E é exatamente aí que a tipografia deixa de ser um detalhe estético e passa a ser a própria interface. 

O ritmo vertical das linhas, o contraste entre pesos e o espaço generoso ao redor das palavras guiam o olhar humano sem que percebamos.

> "Boa tipografia é invisível durante o consumo da mensagem; má tipografia salta aos olhos e cansa a mente."

### Três decisões estruturais que importam

1. **Escala tipográfica proporcional**: Definir proporções matemáticas harmoniosas (como *Minor Third* ou *Perfect Fourth*) garante hierarquia instantânea sem exigir ruído de cores.
2. **Largura de linha (Measure)**: Manter entre 60 e 75 caracteres por linha (`max-w-prose` ou cerca de `65ch`) evita que o olho se perca ao pular de uma linha para a próxima.
3. **Leading / Line-height consciente**: Textos de leitura longa exigem respiro (`1.6` a `1.75`), enquanto títulos em tamanhos display pedem proximidade (`1.1` a `1.2`).

### Implementando com CSS moderno

Com as novas funções matemáticas do CSS e tokens de design fluidos:

```css
/* Escala de texto com clamp para responsividade sem media queries */
h1 {
  font-size: clamp(2.25rem, 5vw + 1rem, 3.75rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.prose-body {
  max-width: 68ch;
  line-height: 1.7;
}
```

Interfaces maduras não dependem de enfeites. Elas respeitam o leitor através de ritmo, silêncio e precisão técnica.
