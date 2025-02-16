import React, { useState, useEffect } from "react";
import { usePopStarContext } from "../contexts/PopStarContext";
import AddPopStar from "../components/AddPopStar";
import UpdatePopStars from "../components/UpdatePopStar";
import DeletePopStar from "../components/DeletePopStar";
import PopStarCardAdmin from "../components/PopStarListCardAdmin";
import Searchbar from "../components/shared/Searchbar";
import SearchbarDbAdmin from "../components/shared/SearchbarDbAdmin";
import "./AdminPage.css";  // Import the CSS file

function AdminPage() {
  const { filterPopStarsLocallyByAny } = usePopStarContext();
  const [showAdminOps, setShowAdminOps] = useState(false);

  useEffect(() => {
    filterPopStarsLocallyByAny("");
  }, []);

  return (
    <div className="admin-container">
        <div className="admin-operation-container">

            <h1 className="admin-h1 admin-text-white">Administrate Pop Stars</h1>

            {/* Toggle button for small screen/mobile */}
            <button
                className="admin-toggle-button"
                onClick={() => setShowAdminOps(!showAdminOps)}
                >
                {showAdminOps ? "Hide Admin Operations" : "Show Admin Operations"}
            </button>

            {/* Wrap admin components in a container */}
            <div className={`admin-operations ${showAdminOps ? "active" : ""}`}>
                <div className="admin-item">
                <AddPopStar />
                    {/* <div className="divider"></div> */}
                </div>
                <div className="admin-item">
                <UpdatePopStars />
                    {/* <div className="divider"></div> */}

                </div>
                <div className="admin-item">
                <DeletePopStar />
                    {/* <div className="divider"></div> */}
                </div>
            </div>

        </div>
      <h3 className="admin-h3 admin-text-white">Database Query</h3>
      <SearchbarDbAdmin />

      <div className="divider"></div>

      <Searchbar />
      <h1>Pop Stars</h1>
      <PopStarCardAdmin />
    </div>
  );
}

export default AdminPage;