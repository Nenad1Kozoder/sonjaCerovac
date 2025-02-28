import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Title.module.scss';


function Title ({ as: Tag = 'h1', className, children }) {
  return (
    <Tag className={classNames(classes[className])}>
      {children}
    </Tag>
  );
};

Title.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Title;