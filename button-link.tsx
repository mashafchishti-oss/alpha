import { cva, type VariantProps } from 'class-variance-authority'
import { ArrowRight } from 'lucide-react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export const buttonLinkVariants = cva(
  'group/cta inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-sm font-semibold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-60',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-[0_10px_40px_-10px] hover:shadow-primary/60',
        outline:
          'border border-white/20 bg-white/5 text-foreground backdrop-blur-sm hover:border-primary hover:text-primary',
        ghost: 'px-0 text-foreground hover:text-primary',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
)

type ButtonLinkProps = ComponentProps<'a'> &
  VariantProps<typeof buttonLinkVariants> & { withArrow?: boolean }

export function ButtonLink({
  className,
  variant,
  withArrow = false,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a className={cn(buttonLinkVariants({ variant }), className)} {...props}>
      {children}
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-300 group-hover/cta:translate-x-1"
        />
      )}
    </a>
  )
}
