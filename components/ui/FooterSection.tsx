import Link from "next/link";
import React from "react";

const FooterSection = () => {
  return (
    <footer className="text-center py-4 w-full border-t border-gray-700 bg-[#121212] text-white font-bold">
      <p>
        Powered by{" "}
        <Link
          className="hover:underline transition-all cursor-pointer"
          href="https://ieeecsvitc.com"
        >
          IEEE Computer Society
        </Link>
      </p>
    </footer>
  );
};

export default FooterSection;
