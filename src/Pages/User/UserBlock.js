import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../../Redux/Slice/userSlice";

function UserBlock() {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Avatar {...bindTrigger(popupState)} />
          <Menu {...bindMenu(popupState)}>
            <MenuItem
              onClick={
                (popupState.close,
                () =>
                  navigate(
                    `/user-profile/${userInfo?.result?.clientInfo?.name}`
                  ))
              }
            >
              My account
            </MenuItem>
            <MenuItem onClick={(popupState.close, () => dispatch(logout()))}>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

export default UserBlock;
