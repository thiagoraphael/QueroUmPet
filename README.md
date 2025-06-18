
# Quero um Pet 🐾

Aplicativo mobile desenvolvido com **React Native + Expo**, com foco em **adoção de animais de estimação**, **controle de finanças**, **gestão de animais** e **experiência personalizada para ONGs**. Projeto desenvolvido para a disciplina de Desenvolvimento para Dispositivos Móveis.

---

## 📱 Funcionalidades

- Login com e-mail/senha (Firebase Auth)
- Login com conta Google (OAuth2)
- Cadastro de usuários
- Persistência de sessão com AsyncStorage
- Controle de Animais (Cadastro, Lista, Perfil, Edição, Exclusão)
- Controle de Finanças (Entradas, Saídas, Histórico)
- Controle de Adoções (Cadastro de Adotantes, Listagem de Pets Adotados)
- Dashboard resumido na Home
- Upload de fotos dos PETs (usando a galeria do celular)
- Design com fontes customizadas (Google Fonts: Barriecito e Georama)
- Navegação entre telas com React Navigation (Stack + Tabs)

---

## 🛠 Tecnologias utilizadas

- React Native
- Expo
- Firebase Authentication
- AsyncStorage
- Expo Auth Session (Google OAuth)
- Expo Image Picker (upload de fotos)
- React Navigation

---

## 🎨 Paleta de Cores

| Item        | Hex       |
|------------|-----------|
| Preto Texto      | `#1C1C1C` |
| Azul Principal   | `#0578F9` |
| Verde Botões     | `#009C53` |
| Cinza Inputs     | `#D9D9D9` |
| Fundo Branco     | `#FFFFFF` |

---

## ⚙️ Instalação do Projeto do Zero

### 1. Instalar Node.js
- Baixe e instale o Node.js:  
👉 https://nodejs.org/

---

### 2. Instalar Expo CLI
```bash
npm install --global expo-cli
```

---

### 3. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/quero-um-pet.git
cd quero-um-pet
```

---

### 4. Instalar as Dependências do Projeto
```bash
npm install
```

---

### 5. Instalar Dependências Extras do Projeto

```bash
expo install @react-native-async-storage/async-storage
expo install expo-image-picker
expo install expo-splash-screen
expo install expo-font @expo-google-fonts/barriecito @expo-google-fonts/georama
expo install expo-auth-session
expo install @react-navigation/native
expo install @react-navigation/native-stack
expo install @react-navigation/bottom-tabs
expo install react-native-screens react-native-safe-area-context
```

E também:

```bash
npm install firebase
```

---

## 🧪 Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Habilite **Authentication → Sign-in methods → Email/Password** e **Google**
3. Copie suas configurações (`apiKey`, `authDomain`, etc) e cole no arquivo:  
```
/src/services/firebaseConfig.js
```

Exemplo de configuração:

```js
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_BUCKET",
  messagingSenderId: "SEU_SENDER_ID",
  appId: "SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
```

---

## ✅ Como Executar o App

No terminal:

```bash
expo start
```

- Abra o app **Expo Go** no seu celular (Android ou iOS)
- Escaneie o QR Code
- Ou use um emulador Android/iOS se tiver configurado

---

## ✅ Testando o App:

1. Crie um usuário com e-mail/senha ou logue com Google
2. Acesse todas as abas:
   - Home
   - Animais
   - Finanças
   - Adoções
3. Teste cadastros, listagens, edições e exclusões
4. Teste persistência de login: feche o app e abra novamente, o usuário deve continuar logado.

---

## ✅ Próximos passos / Melhorias futuras (Sugestões)

- Salvar fotos dos PETs em Firebase Storage
- Migrar dados de AsyncStorage para Firestore
- Adicionar push notifications
- Implementar filtros nas listas (ex: por raça, status)
- Melhorar UI/UX

---

## ✅ Contato do Autor

> Desenvolvido por Thiago Raphael  
> Projeto acadêmico - UNIPAC Ciências da Computação  