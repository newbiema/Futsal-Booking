// src/components/ui/Button.tsx
interface ButtonProps {
  text: string
  onClick?: () => void
  href?: string
}

const Button = ({ text, onClick, href }: ButtonProps) => {
  return href ? (
    <a
      href={href}
      className="bg-blue-500 py-2 px-6 rounded-lg text-white font-semibold hover:bg-blue-700"
    >
      {text}
    </a>
  ) : (
    <button
      onClick={onClick}
      className="bg-blue-500 py-2 px-6 rounded-lg text-white font-semibold hover:bg-blue-700"
    >
      {text}
    </button>
  )
}

export default Button
