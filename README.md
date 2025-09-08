## 📌 Visão geral
Projeto desenvolvido como parte do teste técnico do Grupo Deal para a vaga de Front-End React.
O objetivo principal era ser construído priorizando boas práticas de React, organização arquitetural e clareza de código, de forma a garantir escalabilidade, manutenção e usabilidade.

O desafio consistiu em criar uma versão evoluída do Jogo da Velha, com foco em:
- Placar em séries com meta configurável.
- Configurações dinâmicas via modal inicial.
- Interface moderna, responsiva e acessível.
- Persistência de dados no localStorage.
- Temas dinâmicos aplicáveis em tempo real.
- Modo autoplay opcional com jogadas automáticas.

## 🕹️ Funcionalidades

### Série e Placar
- Definição da meta de vitórias antes de iniciar (3, 5, 11…).
- Placar em tempo real com vitórias e empates acumulados.
- Empates não encerram a série.
- Encerramento automático ao atingir a meta → abre WinnerModal.
- Opções: Reiniciar Partida (mantém placar) e Reiniciar Série (zera resultados).

### Modal Inicial de Configuração
- Exibido ao abrir ou reiniciar série.
- Permite definir:
  - Nome dos jogadores (obrigatório, com validação HTML base).
  - Meta de vitórias (obrigatória, com validação HTML base).

### Modal de Vencedor da Série
- Abre automaticamente quando um jogador atinge a meta.
- Mostra o vencedor e o placar final.
- Oferece duas opções: Nova série (reset total) ou Jogar novamente (manter configs).

### Regras da Partida
- Tabuleiro 3x3 com turnos alternados.
- Células já ocupadas não aceitam jogada.
- Detecção de vitória, empate e partida em andamento.
- Ao fim da partida, o placar é atualizado e o tabuleiro bloqueado até reinício.

### Modo Autoplay
- Toggle para ativar/desativar.
- Jogadas automáticas válidas e aleatórias.
- Contador regressivo visível antes de cada jogada.
- Pausa quando modais são abertos e encerra ao final da série.
- Pode ser interrompido a qualquer momento.

### UI/UX e Responsividade
- Variáveis CSS para cores, espaçamentos, tipografia e temas.
- Layout responsivo: mobile (≥360px), tablet e desktop.
- Animações consistentes em modais, sem quebras de layout.
- Feedbacks visuais claros para turno, células e resultados.
- Acessibilidade: navegação por teclado (Tab/Enter/Esc), foco visível e contraste conforme WCAG AA.
- Verificação de tema padrão do SO e aplicação automática no primeiro acesso do usuário.
- Configurações validadas e persistidas de dados no localStorage.

### Temas e Persistência
- Disponibiliza ao menos 4 temas predefinidos.
- Aplicação imediata via variáveis CSS, sem reload.
- Configurações persistidas no localStorage (nomes, meta, tema, autoplay).

### Estado e Reinicialização
- Reiniciar Partida: limpa tabuleiro e mantém configs iniciais.
- Novo jogo: zera placar/resultados e redefine configs iniciais.
- Abertura do StartModal pausa autoplay automaticamente.

## 🛠️ Tecnologias

- React (JavaScript)
- Context API para gerenciamento global de estado
- Hooks customizados (useTicTacToe, useSeries, useAutoplay)
- CSS Variables + SCSS para temas e estilos dinâmicos
- Vite para build e ambiente de desenvolvimento

## ⚙️ Justificativas Técnicas

### Arquitetura e Componentização
- Atomic Design (atoms, molecules, organisms) → modularidade, reuso e evolução da UI.
- Contextos dedicados:
  - GameSettingsContext: mantém nomes e meta em memória, sincronizando com localStorage.
  - HistoryContext: centraliza estatísticas de vitórias e empates.

### Hooks Customizados
- useTicTacToe: encapsula regras do jogo e expõe API clara (play, resetBoard, winner, isDraw).
- useSeries: controla ciclo da série, abertura do WinnerModal e reset automático.
- useAutoplay: gerencia timers e reinicia contagem a cada jogada.
- useRequiresSetup: força abertura do StartModal quando necessário.

### Gestão de Modais
- StartModal e WinnerModal → controlados por props (open, onClose).
- Orquestração centralizada em TictactoeTable, simplificando fluxos como Novo Jogo e Jogar Novamente.

### Responsividade e UX
- Navegação completa via teclado (Tab, Enter, Esc).
- Animações e transições para destacar eventos importantes.
- Persistência em localStorage garante continuidade da experiência.

## 📂 Estrutura de pastas

```
src/
  components/
    atoms/            # Componentes básicos e reutilizáveis
      Modal/          # Modal base com animação padrão
      Square/         # Célula do tabuleiro
      X/, O/          # Ícones SVG
      CurrentPlayer/  # Indicador do jogador atual
      btnAutoplay/    # Botão + contador do autoplay
      molecules/      # Combinação de átomos
      Header/         # Placar (p1, empates, p2)
      StartModal/     # Configuração inicial (nomes e meta)
      WinnerModal/    # Resultado da série (apenas X/O)
      ThemeToggle/    # Alternância de tema
    organisms/
      TictactoeTable/ # Tabuleiro e orquestração de jogo
  context/
    GameSettingsContext.jsx  # p1, p2, amountToWin + persistência
    HistoryContext.jsx       # histórico e estatísticas (xWins, oWins, draws)
  hooks/
    useTicTacToe.js    # Regras do jogo (estado do tabuleiro, jogadas)
    useAutoplay.js     # Jogadas automáticas com intervalo
    useSeries.js       # Lógica da série (abre WinnerModal, reset após vitória)
    useRequiresSetup.js# Verifica se precisa exibir o StartModal
  utils/
    tictactoe.js       # Utilidades: vencedor, linha vencedora, empate
  services/
    storage.js         # Acesso seguro ao localStorage
  constants/
    constants.js, theme.js  # Constantes (intervalos, opções de rodadas, temas)
  styles/
    themes.scss        # Variáveis e temas globais
  App.jsx, App.scss
  main.jsx
```

## 🚀 Instruções de Execução

Pré‑requisitos:
- Node.js 18+ (recomendado)
- npm 9+ (ou pnpm/yarn, se preferir)

Clonar o repositório e instalar:

```
git clone <url-do-repositorio>
cd jogo-da-velha
npm install
```

Rodar em ambiente de desenvolvimento (HMR via Vite):

```
npm run dev
```

Acesse a URL exibida no terminal (geralmente http://localhost:5173).

Os artefatos de build são gerados em `dist/`.

## 🌐 Demo Online

👉 Acesse aqui a versão publicada: https://tic-tac-toe-chi-ten-81.vercel.app/

## ✅ Conclusão

O projeto de Jogo da Velha foi desenvolvido para atender integralmente os requisitos do desafio, mas também foi possível identificar oportunidades para demonstrar como uma aplicação simples pode ser expandida com valor adicional em usabilidade, acessibilidade e arquitetura de código, sem perder a simplicidade ou conflitar com os requisitos obrigatórios.

A proposta entrega uma solução completa, com interface responsiva, temas dinâmicos, persistência de dados e modo automático de jogo, ao mesmo tempo em que mantém um código modular, escalável e de fácil manutenção.

Espera-se demonstrar, como resultado final, não apenas um jogo funcional, mas uma aplicação que reflete boas práticas de desenvolvimento front-end, priorizando tanto a experiência do usuário quanto a clareza e a sustentabilidade técnica do código.
