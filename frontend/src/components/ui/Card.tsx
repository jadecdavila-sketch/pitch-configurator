import { forwardRef, type HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', selected = false, children, ...props }, ref) => {
    const baseStyles = 'rounded-lg border-2 p-6 transition-all duration-200 hover:shadow-lg';
    const selectedStyles = selected
      ? 'border-primary bg-primary/10 shadow-md'
      : 'border-neutral-light-gray hover:border-primary hover:bg-primary/5';

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${selectedStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={`mb-4 ${className}`} {...props} />
  )
);

CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className = '', ...props }, ref) => (
    <h3 ref={ref} className={`text-xl font-bold text-secondary-dark ${className}`} {...props} />
  )
);

CardTitle.displayName = 'CardTitle';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className = '', ...props }, ref) => (
    <div ref={ref} className={className} {...props} />
  )
);

CardContent.displayName = 'CardContent';

export { Card, CardHeader, CardTitle, CardContent };
