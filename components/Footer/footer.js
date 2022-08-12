import classes from './footer.module.css';
import { useFooter } from './useFooter';
const Footer = () => {

    const { footer, error } = useFooter();

    if (error) return 'Error load footer';

    if (!footer) return null;

    return (
        <div
            className={classes.footer}
            dangerouslySetInnerHTML={{ __html: footer }}
        />
    );
};

export default Footer;
