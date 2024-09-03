function Button({ children, textOnly, className, ...props }) {
  let buttonClasses = textOnly ? "text-button" : "button";
  buttonClasses += " " + className;

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
}

export default Button;
