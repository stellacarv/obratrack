# 🏗️📱 ObraTrack - Aplicativo de Fiscalização de Obras

O **ObraTrack** é um aplicativo mobile desenvolvido em **React Native com Expo**, voltado para **o acompanhamento e fiscalização de obras**. Ele permite o **cadastro de obras, registros de fiscalizações com fotos, geolocalização** e o **envio de relatórios por e-mail**.

---

## 🚀 Funcionalidades

- 📋 **Cadastro de obras** com dados detalhados
- 📸 **Registro de fiscalizações**, incluindo:
  - Data
  - Status da obra
  - Observações
  - Foto registrada no local
- 🗺️ **Visualização da localização** da obra via mapa
- ✉️ **Envio de detalhes da obra por e-mail**
- 📱 Interface amigável e adaptada para uso em campo


## ⚙️ Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)
- Dispositivo físico com Expo Go (Android/iOS) ou emulador configurado

### Passos para rodar o projeto

1. Clone este repositório:

```bash
git clone https://github.com/seu-usuario/obratrack.git
Acesse a pasta do projeto:

bash
Copiar
Editar
cd obratrack

Instale as dependências:

bash
Copiar
Editar
npm install

Inicie o projeto com Expo:

bash
Copiar
Editar
npx expo start

Escaneie o QR Code com o app Expo Go ou rode em um emulador.

Integração com o Back-end:
A aplicação consome APIs REST desenvolvidas em Node.js/Express. Abaixo, estão as rotas utilizadas.

Rotas Utilizadas e Exemplos de Payloads

📥 GET /api/obras/:id
Busca os dados de uma obra por ID.

Exemplo de resposta:

json
Copiar
Editar
{
  "_id": "666123abc123def456",
  "nome": "Edifício Alpha",
  "responsavel": "Arq. Aline Silva",
  "data_inicio": "2025-06-01T00:00:00.000Z",
  "data_fim": "2025-12-31T00:00:00.000Z",
  "descricao": "Obra de edifício residencial.",
  "localizacao": {
    "latitude": -23.55052,
    "longitude": -46.633308
  },
  "foto": "https://url-da-foto-da-obra.com/imagem.jpg"
}
📥 GET /api/fiscalizacoes/obra/:obraId
Retorna as fiscalizações associadas a uma obra específica.

Exemplo de resposta:

json
Copiar
Editar
[
  {
    "_id": "665fabc123456",
    "data": "2025-06-19T00:00:00.000Z",
    "status": "atrasada",
    "observacoes": "Atrasada por falta de equipamentos",
    "foto": "https://url-da-foto-da-fiscalizacao.com/imagem.jpg"
  }
]
📤 POST /api/fiscalizacoes
Cadastra uma nova fiscalização para uma obra.

Exemplo de payload:

json
Copiar
Editar
{
  "obra": "666123abc123def456",
  "data": "2025-06-20",
  "status": "em_andamento",
  "observacoes": "Verificação inicial.",
  "foto": "base64_ou_url_da_foto"
}
📤 POST /api/send-email
Envia os dados da obra por e-mail para um destinatário.

Exemplo de payload:

json
Copiar
Editar
{
  "obraId": "666123abc123def456",
  "email": "destinatario@email.com"
}
🖼️ Telas do App
- Tela Inicial com listagem de obras
- Tela de Detalhes da Obra
- Tela de Detalhes da Obra com listagem de fiscalizações
- Tela de Cadastro de Fiscalização
- Tela de Envio de E-mail
- Abertura do mapa com localização da obra

👷‍♀️Desenvolvido por: Stella Carvalho
