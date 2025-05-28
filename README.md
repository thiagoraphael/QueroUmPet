# Quero um Pet 🐾

Aplicativo mobile desenvolvido com **React Native + Expo**, com foco em **adoção de animais de estimação** e **experiência personalizada para o usuário**. Este projeto foi desenvolvido como parte da disciplina de Desenvolvimento para Dispositivos Móveis.

---

## 📱 Funcionalidades

- Tela de login com identidade visual personalizada
- Cadastro de usuário com Firebase Auth
- Autenticação com conta Google (OAuth2)
- Persistência local de sessão com AsyncStorage
- Exibição dos dados do usuário (nome, e-mail e foto)
- Interface responsiva, simples e acessível
- Tela de perfil com botão de logout
- Navegação segura entre telas com React Navigation

---

## 💾 Persistência local implementada

A aplicação **mantém o usuário autenticado mesmo após o fechamento do app**, utilizando `AsyncStorage` para armazenar a sessão localmente.

### ✅ O que foi feito:
- Ao fazer login, os dados do usuário são salvos no armazenamento local (`AsyncStorage`);
- Quando o app é reaberto, os dados são lidos e o usuário é redirecionado automaticamente para a **HomeScreen**, sem precisar logar novamente;
- O botão "Sair" limpa o armazenamento local e faz logout do Firebase.

### 📦 Tecnologia utilizada

- [`@react-native-async-storage/async-storage`](https://github.com/react-native-async-storage/async-storage)  
  Leve, fácil de integrar com Expo, ideal para armazenar informações simples como sessão do usuário.

### 🧪 Como testar

1. Execute o app e faça login com e-mail/senha ou com conta Google.
2. Feche completamente o app (inclusive no multitarefa).
3. Reabra o app: ele irá direto para a tela inicial com a sessão ativa.
4. Clique em "Sair" para voltar à tela de login e limpar os dados locais.

---

## 🛠 Tecnologias utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Expo Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://github.com/react-native-async-storage/async-storage)

---

## 🎨 Paleta de Cores

| Cor        | Hex       |
|------------|-----------|
| Preto      | `#1C1C1C` |
| Azul       | `#0578F9` |
| Verde      | `#009C53` |
| Cinza Claro| `#D9D9D9` |
| Branco     | `#FFFFFF` |

---

## ⚙️ Instalação e Execução

1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/quero-um-pet.git
   cd quero-um-pet