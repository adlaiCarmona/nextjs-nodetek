import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { styled, Box, Grid, Input, Modal, TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "@auth0/nextjs-auth0";

const SearchBar = styled(Input)({
    // maybe use input rather than textfiel; check: https://stackoverflow.com/questions/56122219/in-mui-when-do-we-use-input-vs-textfield-for-building-a-form
    width: 300,
    height: 40,
    color: "darkslategray",
    backgroundColor: "#ffffff",
    borderRadius: "15px 0px 0px 15px",
    input: { padding: 12 },
});

const Header = () => {
    const { user, error, isLoading } = useUser();
    const [search, setSearch] = useState("");

    if (error) console.log(error.message);

    return (
        <div id="header" className="container">
            <div className="tab-img">
                <Link href="/">
                    <a>
                        <Image
                            src="/NodetekNameWY.png"
                            width={200}
                            height={40}
                            quality={100}
                        />
                    </a>
                </Link>
            </div>

            <div className="search-bar">
                <SearchBar
                    disableUnderline={true}
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                />
                <Link href={`/search?q=${search}`}>
                    <div className="search-button">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </div>
                </Link>
            </div>

            <div id="user" className="user-menu">
                <div className="tab">
                    <FontAwesomeIcon icon={faUser} />
                    {user ? (
                        <a href="/account">{user.name}</a>
                    ) : (
                        <a href="/api/auth/login">Login</a>
                    )}
                </div>
                {user && (
                    <div className="tab">
                        <a href="/api/auth/logout">Logout</a>
                    </div>
                )}
            </div>

            <style jsx>{`
                .container {
                    height: 65px;
                    padding: 0.2rem 0.5rem;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    background-color: #255075;
                }

                .modal {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    max-width: 600;
                    background-color: white;
                    border: 0px;
                    border-radius: 10px;
                    boxshadow: 24;
                    padding: 30px;
                }

                .user-menu {
                    display: flex;
                    flex-direction: row;
                }

                .tab {
                    padding: 17px;
                    gap: 7px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    height: 40px;
                    color: white;
                }

                .tab:hover,
                .tab:focus,
                .tab:active {
                    background-color: #f0f0f0;
                    color: #000000;
                    border-color: #000000;
                    cursor: pointer;
                }

                .tab a,
                .tab a:visited,
                .tab a:hover,
                .tab a:active {
                    color: inherit;
                    text-decoration: none;
                }

                .tab-img {
                    padding: 5px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    height: 40px;
                }

                .tab-img:hover,
                .tab-img:focus,
                .tab-img:active {
                    border-color: #0070f3;
                    cursor: pointer;
                }

                .search-bar {
                    display: flex;
                    align-items: center;
                }

                .search-button {
                    padding: 5px;
                    border-radius: 0px 15px 15px 0px;
                    display: flex;
                    align-items: center;
                    height: 40px;
                    color: white;
                }

                .search-button:hover,
                .search-button:focus,
                .search-button:active {
                    background-color: #f0f0f0;
                    color: #000000;
                    border-color: #000000;
                    cursor: pointer;
                }

                .login-button {
                    height: 40px;
                    border-radius: 15px;
                    background-color: #372000;
                    padding: 5px;
                }

                .login-button:hover,
                .login-button:focus,
                .login-button:active {
                    background-color: #f0f0f0;
                    color: #000000;
                    border-color: #000000;
                    cursor: pointer;
                }
            `}</style>
        </div>
    );
};

export default Header;
