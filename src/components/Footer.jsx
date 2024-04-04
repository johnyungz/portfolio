function Footer() {
  return (
    <footer className="bg-background text-text-colour font-hankeng">
      <section className="flex py-6 justify-center">
        <section className="pr-4">
          <h2 className="max-w-40 border-b">contact</h2>
          <a href="mailto:johnyungzhou1@gmail.com" className="link">Email</a>
        </section>
        <ul className="justify-center max-w-40">
          <h2 className="border-b">Socials</h2>
          <li className="pr-12"><a href="https://www.linkedin.com/in/johnyungzhou/" className="link">LinkedIn</a></li>
          <li><a href="https://github.com/johnyungz" className="link">Github</a></li>
        </ul>
      </section>
      <p className="pb-4 font-semibold text-center text-lgsm:text-xl md:text-2xl lg:pb-12  lg:text-3xl"> &#169; John Zhou 2023</p>
    </footer>
  );
}

export default Footer;
