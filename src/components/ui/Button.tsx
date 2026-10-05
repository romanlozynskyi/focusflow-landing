import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'outline' | 'outline-light'
type Size = 'md' | 'lg'

type CommonProps = {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type LinkButtonProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & { href: string }

type NativeButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { href?: undefined }

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 ease-out active:scale-[0.98]'

const variants: Record<Variant, string> = {
  primary:
    'bg-signal text-ink shadow-[0_8px_24px_-10px_rgba(255,90,31,0.8)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(255,90,31,0.9)]',
  outline: 'border border-ink/15 bg-white/60 text-ink hover:border-ink/40 hover:bg-white',
  'outline-light': 'border border-white/25 text-white hover:border-white/60 hover:bg-white/5',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children, ...rest } = props
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}
