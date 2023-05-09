# react-native-simple-crud
Aplicativo desenvolvido para aplicar conceitos básicos de criação de APPs (navegação, estado, componentização, comunicação com backend e estilização) usando React Native

#Integrantes
- Cesar August
- Gracielle Oliveira
- Matheus Alves

## preparação do ambiente
é importante que sejam instaladas as dependências (tanto do back quanto do app) usando o comando:
```npm install```

## para rodar o backend
- navegue até /back e use o seguinte comando:
```npm start```
Observação: deixe em um terminal separado rodando em segundo plano para não finalizá-lo
Nota: Qualquer dúvida quanto aos endpoints acesse ```http://localhost:3000/docs```

## para rodar o app
- navegue até /app e use o seguinte comando:
```npx expo start```

## Para conectar APP com Back
- O projeto APP possui 3 arquivos responsáveis por conectar as funcionalidades ao backend
  - /src/services/auth.service.ts
  - /src/services/user.service.ts
  - /src/services/role.service.ts
- Altere o IP nesses 3 arquivos para apontar corretamente para o backend em ambiente de teste
