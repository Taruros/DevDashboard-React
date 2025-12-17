const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <p class="footer-p">
        <time id="footer-year">{year}</time> &copy; taruros
      </p>
    </footer>
  );
};

export default Footer;
