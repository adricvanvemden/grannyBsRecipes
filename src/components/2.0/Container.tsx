interface ContainerProps extends React.PropsWithChildren<{}> {
  id?: string;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className, id }) => {
  return (
    <div id={id ? id : 'container'} className={className}>
      {children}
    </div>
  );
};

export default Container;
