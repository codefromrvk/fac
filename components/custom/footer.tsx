const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col border-t-2 border-gray-100  pt-4">
      <div className="flex justify-between px-2  text-center ">
        <div className="text-xs  font-semibold text-muted-foreground">
          Friends Auto Cars
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {currentYear} All rights reserved.
        </p>
      </div>
      <p className=" p-2 text-xs text-muted-foreground">
        <span className=" font-semibold">Address:</span> Kamala Complex,
        Tharethota, Solapur - Mangalore Highway, near Pumpwell, Mallikatte,
        Kadri, Mangaluru, Karnataka 575005
      </p>
    </footer>
  );
};

export default Footer;
