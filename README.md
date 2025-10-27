# Builder Kit: Onchain Starter Template

A modern, production-ready starter template for building decentralized applications with sensible defaults.

<table width="100%">
  <tr>
    <td width="50%"><img src="./public/lp-1.png" alt="Builder Kit Screenshot 1" width="100%"/></td>
    <td width="50%"><img src="./public/lp-2.png" alt="Builder Kit Screenshot 2" width="100%"/></td>
  </tr>
</table>

See deployed website: [builder-kit.vercel.app](https://builder-kit.vercel.app/)

## ✨ Features

- **Next.js 15** with App Router and React 19
- **Web3 Integration** with Wagmi v2 and RainbowKit
- **React Query** for data fetching
- **Shape Network** support (Mainnet & Sepolia)
- **Alchemy SDK** for performant blockchain interactions
- **TypeScript** for type safety
- **Tailwind CSS** with theming and dark mode support
- **Shadcn/ui** for a large range of fully customizable and themable components
- **Error Boundaries** for graceful error handling

## 🚀 Quick Start

1. **Clone or use as template**

   ```bash
   git clone https://github.com/shape-network/builder-kit.git
   cd builder-kit
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env-example .env
   ```

   Fill in your environment variables:
   - `NEXT_PUBLIC_ALCHEMY_KEY`: Get from [Alchemy](https://alchemy.com)
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: Get from [WalletConnect](https://cloud.walletconnect.com)
   - `NEXT_PUBLIC_CHAIN_ID`: Use `11011` for Shape Sepolia or `360` for Shape Mainnet

4. **Start development server**

   ```bash
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Development

### Available Scripts

- `bun dev` - Start development server with Turbopack
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun lint:fix` - Fix ESLint issues
- `bun type-check` - Run TypeScript type checking
- `bun format` - Format code with Prettier
- `bun format:check` - Check code formatting

### Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── get-nfts/     # Fetch NFTs for address
├── components/            # React components
│   ├── ui/               # Shadcn/ui components
│   ├── error-boundary.tsx
│   ├── loading.tsx
│   ├── providers.tsx
│   ├── theme-toggle.tsx
│   └── wallet-connect.tsx
├── hooks/                 # Custom React hooks
│   ├── web3.ts           # Web3 data fetching hooks
│   ├── use-balance.ts    # Wallet balance hook
│   ├── use-mobile.ts     # Mobile detection hook
├── lib/                   # Utility functions and configurations
│   ├── clients.ts        # Alchemy and RPC clients
│   ├── config.ts         # Environment configuration
│   ├── utils.ts          # Helper functions
│   └── web3.ts           # Wagmi configuration
└── public/               # Static assets
```

## 🎨 Customization

### Theme Customization

Edit `app/globals.css` to customize the color scheme:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  /* ... other CSS variables */
}
```

### Adding Components

Use Shadcn/ui CLI to add new components:

```bash
npx shadcn@latest add button
```

### Web3 Integration

The template includes examples of Web3 integration:

- Wallet connection with RainbowKit
- Balance fetching with custom hooks
- Chain switching and network detection
- Error handling for Web3 operations

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Wagmi Documentation](https://wagmi.sh)
- [RainbowKit Documentation](https://www.rainbowkit.com)
- [Shadcn/ui Documentation](https://ui.shadcn.com)
- [Shape Network Documentation](https://docs.shape.network)
- [Alchemy SDK Documentation](https://docs.alchemy.com/reference/alchemy-sdk-quickstart)

## 🤝 Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

- [Shape Discord](http://discord.com/invite/shape-l2)
- [Twitter/X @Shape_L2](https://x.com/Shape_L2)
- [Twitter/X @williamhzo](https://x.com/williamhzo)
