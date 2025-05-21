# 🗺️ KubeRoutes

**Visualizza le tue API Gateway e HTTPRoute su Kubernetes in un attimo.**  
KubeRoutes è un tool cross-platform e cloud-native per mappare graficamente le rotte tra i Gateway e i backend HTTP in ambienti Kubernetes (GKE, Kind, Minikube, ecc.), utilizzando [Gateway API](https://gateway-api.sigs.k8s.io/) e [Mermaid](https://mermaid.js.org/).

---

## 🚀 Funzionalità

- 🔍 Scansione automatica di Gateway e HTTPRoute
- 📊 Visualizzazione interattiva tramite diagrammi Mermaid
---

## 🧠 Architettura

```bash
KubeRoutes/
├── backend/      
│   ├── main.py
│   ├── k8s_parser.py
│   └── requirements.txt
├── frontend/      
    ├── src/
        ├── App.jsx
        └── components/
        └── GatewayDiagram.jsx

```

---

## 🛠️ Requisiti

- Python 3.8+
- Node.js 18+
- `kubectl` configurato (`~/.kube/config`)

---

## 🧪 Avvio rapido

### 1. Clona il progetto
```bash
git clone https://github.com/tuo-username/KubeRoutes.git
cd KubeRoutes
```

### 2. Avvia il backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Avvia il frontend

```bash
cd ../frontend
npm install
npm run dev
```

Visita `http://localhost:5173` nel browser 🎉

---

## 🧰 Debug / Test

Puoi usare Kind o Minikube per creare un cluster di test e installare Gateway API con:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/gateway-api/releases/latest/download/standard-install.yaml
```

---

## 🙌 Contribuisci!

Pull request benvenute!  
Apri una issue per bug, richieste o funzionalità che vuoi vedere!

---

## 🧑‍💻 Autore

**[Lorenzofini]**  
DevOps & Cloud Engineer | K8s Lover ☁️🐳

---

## 📄 Licenza

MIT — fai quello che vuoi, ma non dimenticare di citare il progetto 😉

> _“Routing è un’arte. Con KubeRoutes è anche una mappa.”_
