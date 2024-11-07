
const Image = ({src, className, ...rest}) => {
    src = src && src.includes('https://') ? src : 'http://localhost:4000/uploads/' + src;
  return (
    <img className={className} {...rest} src={src} alt="" />
  );
};

export default Image