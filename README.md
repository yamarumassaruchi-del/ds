# Nexa Business

## Instalação

1. Instale o Node.js LTS.
2. Abra um terminal na pasta `nexa-business`.
3. Execute `npm install`.
4. Copie `.env.example` para `.env` e substitua `cole_sua_chave_aqui` por sua chave da OpenAI.
5. Execute `npm start`.
6. Acesse `http://localhost:3000` no navegador.

**Importante:** nunca coloque a chave no HTML ou no JavaScript da pasta `public`. Não compartilhe o arquivo `.env` nem publique a chave no GitHub.

As notas, tarefas, registros financeiros e conversas ficam no `localStorage` do navegador. Não são sincronizados com outros aparelhos. A API da OpenAI exige chave válida e faturamento/créditos disponíveis. O chat envia apenas o histórico da conversa, não os registros financeiros ou as notas.

Para uso público em produção, adicione autenticação, armazenamento em banco de dados, HTTPS e rate limiting persistente.
