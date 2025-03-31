import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        <span>Developed by David Roman</span>
        <span className="footer__year">{new Date().getFullYear()}</span>
      </p>
    </footer>
  );
}

export default Footer;
