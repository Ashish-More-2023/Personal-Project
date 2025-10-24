import clsx from 'clsx';

const Card = ({ 
  children, 
  className = '', 
  padding = 'default',
  hover = false,
  ...props 
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    default: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-md border border-gray-200',
        paddingStyles[padding],
        hover && 'hover:shadow-lg transition-shadow duration-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
