# Starknet Africa Basecamp 7 - Counter DApp

A decentralized counter application built on Starknet, created for the Starknet Africa Basecamp 7 program. This project demonstrates how to build a frontend that interacts with a Cairo smart contract on Starknet.

![Starknet](https://img.shields.io/badge/Starknet-Sepolia-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🚀 Features

- **Wallet Connection** - Connect with Braavos or ArgentX wallets
- **Counter Interactions** - Increase and decrease the counter value on-chain
- **Real-time Updates** - View the current counter value from the blockchain
- **Token Balances** - Display connected wallet's token balances
- **Modern UI** - Beautiful, responsive design with Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Braavos](https://braavos.app/) or [ArgentX](https://www.argent.xyz/) wallet browser extension
- Some Sepolia ETH for gas fees (get from [Starknet Faucet](https://starknet-faucet.vercel.app/))

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/starknet-africa-basecamp7-frontend.git
   cd starknet-africa-basecamp7-frontend/starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
starter/
├── abi/
│   └── counter_abi.ts        # Counter contract ABI and address
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with providers
│   └── page.tsx              # Main counter page
├── components/
│   ├── ConnectModal.tsx      # Wallet connection modal
│   ├── DecreaseButton.tsx    # Decrease counter button
│   ├── DisconnectModal.tsx   # Wallet disconnect modal
│   ├── IncreaseButton.tsx    # Increase counter button
│   ├── Navbar.tsx            # Navigation bar
│   ├── TokenBalance.tsx      # ETH balance display
│   ├── UsdcBalance.tsx       # USDC balance display
│   └── ui/                   # Reusable UI components
├── context/
│   └── WalletContext.tsx     # Wallet state management
├── hooks/
│   └── useCounterContract.ts # Counter contract hook
├── lib/
│   ├── coins.ts              # Token configurations
│   └── utils.ts              # Utility functions
└── providers/
    └── StarknetProvider.tsx  # Starknet React configuration
```

## 🔧 Configuration

### Smart Contract

The counter smart contract is deployed on Starknet Sepolia at:
```
0x0070c4689c7c2357a75efb62cadf39ebc0b076c7ac7261d577312ae9fe8a4ac2
```

To use your own contract, update the address in `abi/counter_abi.ts`.

### Network

The app is configured to use Starknet Sepolia testnet. The RPC provider is set in `providers/StarknetProvider.tsx`.

## 🎯 Usage

1. **Connect Wallet** - Click "Connect Wallet" and select Braavos or ArgentX
2. **Ensure Sepolia Network** - Make sure your wallet is on Starknet Sepolia
3. **Interact with Counter**:
   - Click **Increase** to increment the counter
   - Click **Decrease** to decrement the counter
4. **View Balances** - Your ETH and token balances are displayed in the UI

## 🧰 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Blockchain**: [Starknet](https://www.starknet.io/)
- **Wallet Integration**: [@starknet-react/core](https://starknet-react.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📚 Learn More

- [Starknet Documentation](https://docs.starknet.io/)
- [Starknet React Documentation](https://starknet-react.com/)
- [Cairo Programming Language](https://book.cairo-lang.org/)
- [Starknet Africa](https://www.starknet.africa/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ for the Starknet Africa community
