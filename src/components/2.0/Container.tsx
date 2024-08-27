interface ContainerProps extends React.PropsWithChildren<{}> {
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div id="container" className={className}>
      {children}
    </div>
  );
};

export default Container;
