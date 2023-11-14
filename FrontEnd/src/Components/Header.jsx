import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className=" w-full  lg:fixed  rounded-2xl border-b border-solid bg-slate-100 py-5">
        <nav>
          <div>
            <Link to={"/"}>
              <h1 className="text-blue-900 text-4xl font-extrabold px-5">
                WELLDEX{" "}
                <span className="text-blue-800 text-3xl">
                  Operaciones Aduanales
                </span>
              </h1>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
