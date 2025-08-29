# TextMirror App

## Execução

```powershell
cd "C:\Dev\DispositivosMoveis\A1\TextMirrorApp"
npm start
npx react-native run-android
```

## Uso do componente

```tsx
import TextMirror from './TextMirror';

<TextMirror placeholder="Digite algo aqui..." />
<TextMirror placeholder="Seu nome" label="Nome informado:" />
```

Props:
- `placeholder` (opcional): Texto no campo de entrada
- `label` (opcional): Prefixo antes do texto (padrão: "Você digitou:")
