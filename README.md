# Tipos de Conventional Commits

## Principais tipos
- **feat**: adiciona uma nova funcionalidade.
- **fix**: corrige um bug.
- **docs**: mudanças apenas na documentação.
- **style**: alterações de formatação (espaços, ponto e vírgula, indentação), sem impacto no código.
- **refactor**: mudanças no código que não corrigem bugs nem adicionam funcionalidades.
- **perf**: melhorias de performance.
- **test**: inclusão ou alteração de testes.
- **build**: mudanças que afetam o sistema de build ou dependências externas.
- **ci**: alterações em configuração de integração contínua (CI/CD).
- **chore**: tarefas menores, manutenção, ajustes que não afetam código de produção.
- **revert**: desfaz um commit anterior.

## Estrutura da mensagem
tipo(escopo opcional): descrição curta

### Exemplos
- `feat(user-service): adicionar endpoint de cadastro`
- `fix(auth): corrigir erro de validação no login`
- `docs: atualizar README com instruções de execução`
- `style: ajustar indentação no UserController`
- `refactor: simplificar lógica de autenticação`
- `perf: otimizar consulta no repositório`
- `test: criar testes unitários para UserService`
- `build: atualizar versão do Maven`
- `ci: configurar pipeline no GitHub Actions`
- `chore: atualizar dependências no pom.xml`
- `revert: revert "feat: adicionar endpoint de cadastro"`
