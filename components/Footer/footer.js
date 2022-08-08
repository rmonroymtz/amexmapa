import classes from './footer.module.css';
const Footer = (props) => {
    const { footer: component, error } = props;
    if (error) return 'Error load footer';

    if (!component) return null;
    return (
        <div
            className={classes.footer}
            dangerouslySetInnerHTML={{ __html: component }}
        />
    );
};

export default Footer;
