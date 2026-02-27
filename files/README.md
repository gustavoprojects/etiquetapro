# EtiquetaPro — Reino Alimentos
Sistema de etiquetagem e separação de expedição hospedado no GitHub Pages.

---

## 🚀 Como publicar (primeira vez)

### 1. Criar conta no GitHub
Acesse https://github.com/signup e crie uma conta gratuita.

### 2. Criar repositório
- Clique em **New repository**
- Nome: `etiquetapro` (minúsculo, sem espaços)
- Visibilidade: **Public** (necessário para GitHub Pages gratuito)
- Clique em **Create repository**

### 3. Fazer upload dos arquivos
No repositório criado, clique em **uploading an existing file** e envie:
```
etiquetapro.html
manifest.json
sw.js
README.md
```

### 4. Ativar GitHub Pages
- Vá em **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: **main** → pasta **/ (root)**
- Clique **Save**

### 5. Acessar o sistema
Após ~2 minutos, o sistema estará disponível em:
```
https://SEU_USUARIO.github.io/etiquetapro/etiquetapro.html
```

---

## 🔄 Como atualizar o sistema

1. Abra o repositório no GitHub
2. Clique no arquivo que deseja atualizar (ex: `etiquetapro.html`)
3. Clique no ícone de **lápis** (editar) ou arraste o novo arquivo
4. Clique em **Commit changes**
5. Em ~1 minuto todos os usuários recebem a atualização automaticamente

---

## ⛔ Como pausar / tirar do ar

**Opção A — Pausar temporariamente:**
- Settings → Pages → **None** → Save
- O sistema fica offline. Para reativar, basta escolher a branch novamente.

**Opção B — Página de manutenção:**
- Substitua `etiquetapro.html` por uma página simples informando a manutenção

**Opção C — Tornar privado:**
- Settings → General → **Change visibility** → Private
- GitHub Pages não funciona em repos privados no plano gratuito (o sistema fica offline)

---

## 📱 Instalar como app no celular

**Android (Chrome):**
1. Abra a URL no Chrome
2. Menu (⋮) → **Adicionar à tela inicial**
3. Confirme → app aparece na tela inicial

**iPhone (Safari):**
1. Abra a URL no Safari
2. Botão compartilhar → **Adicionar à Tela de Início**
3. Confirme → app aparece na tela inicial

---

## 🖨️ Configurar impressora compartilhada

### No computador com a impressora (Windows):
1. Painel de Controle → Dispositivos e Impressoras
2. Clique com botão direito na impressora → **Propriedades da impressora**
3. Aba **Compartilhamento** → marcar **Compartilhar esta impressora**
4. Anotar o nome do computador (ex: `MAQUINA-EXPEDICAO`)

### Em qualquer dispositivo na mesma rede WiFi:
- O navegador mostrará a impressora compartilhada ao imprimir
- Para impressora de etiquetas: conectar pelo nome de rede

---

## 📁 Estrutura de arquivos

```
etiquetapro/
├── etiquetapro.html   ← sistema principal
├── manifest.json      ← configuração PWA
├── sw.js              ← service worker (offline)
└── README.md          ← este arquivo
```

---

## ⚙️ Configurar URL do Power Automate

1. Abra o sistema no navegador
2. Clique no botão **⚙️** no canto superior direito
3. Cole a URL do webhook do Power Automate
4. Clique em **Salvar**

A URL fica salva no dispositivo (localStorage). Cada usuário precisa configurar uma vez.

**Ou:** Edite `etiquetapro.html` e altere a linha `PA_URL_DEFAULT` para a URL do seu webhook — assim todos já abrem configurado.
