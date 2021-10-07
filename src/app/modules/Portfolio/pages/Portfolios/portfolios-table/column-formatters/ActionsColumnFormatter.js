// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../../../../_metronic/_helpers";
import ViewListIcon from '@material-ui/icons/ViewList';
export function ActionsColumnFormatter(
  cellContent,
  row,
  rowIndex,
  { openEditPortfolioDialog, openDeletePortfolioDialog, openViewPortfolioDialog }
) {
  return (
    <>

<a
        title="View Portfolio"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() =>   openViewPortfolioDialog(row.portfolioMasterId)}
      >

         <span className="svg-icon svg-icon-md svg-icon-primary">
        {/* <img src="/metronic/theme/html/demo1/dist/assets/media/svg/icons/Layout/Layout-grid.svg"/> */}
          {/* <SVG
          src="/metronic/theme/html/demo1/dist/assets/media/svg/icons/Layout/Layout-grid.svg"/>  */}
           {/* src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />  */}
          <ViewListIcon style={{color:'blue'}} />
        </span> 
      
      </a>
      <> </>
      <a
        title="Edit portfolio"
        className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
        onClick={() => openEditPortfolioDialog(row.portfolioMasterId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-primary">
          <SVG
            src={toAbsoluteUrl("/media/svg/icons/Communication/Write.svg")}
          />
        </span>
      </a>
      <> </>

      <a
        title="Delete portfolio"
        className="btn btn-icon btn-light btn-hover-danger btn-sm"
        onClick={() => openDeletePortfolioDialog(row.portfolioMasterId)}
      >
        <span className="svg-icon svg-icon-md svg-icon-danger">
          <SVG src={toAbsoluteUrl("/media/svg/icons/General/Trash.svg")} />
        </span>
      </a>
    </>
  );
}
