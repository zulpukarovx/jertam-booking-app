
const Image = ({src, className, ...rest}) => {
  return (
    <img className={className} {...rest} src={src} alt="" />
  );
};

export default Image