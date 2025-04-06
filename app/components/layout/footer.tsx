const Footer = () => {
  return (
    <footer className="relative bg-background text-foreground pt-0">
      {/* موج SVG بالای فوتر */}
      <div className="w-full overflow-hidden leading-none">
        <svg
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#273036"
            fillOpacity="0.7"
            d="M0,96L21.8,85.3C43.6,75,87,53,131,53.3C174.5,53,218,75,262,80C305.5,85,349,75,393,101.3C436.4,128,480,192,524,197.3C567.3,203,611,149,655,144C698.2,139,742,181,785,208C829.1,235,873,245,916,224C960,203,1004,149,1047,122.7C1090.9,96,1135,96,1178,106.7C1221.8,117,1265,139,1309,149.3C1352.7,160,1396,160,1418,160L1440,160L1440,0L1418.2,0C1396.4,0,1353,0,1309,0C1265.5,0,1222,0,1178,0C1134.5,0,1091,0,1047,0C1003.6,0,960,0,916,0C872.7,0,829,0,785,0C741.8,0,698,0,655,0C610.9,0,567,0,524,0C480,0,436,0,393,0C349.1,0,305,0,262,0C218.2,0,175,0,131,0C87.3,0,44,0,22,0L0,0Z"
          />
        </svg>
      </div>

      {/* محتوای فوتر */}
      <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
        <p>
          © {new Date().getFullYear()} Silkroad. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
