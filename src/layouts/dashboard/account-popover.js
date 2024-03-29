import { useCallback } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const auth = useSelector((state) => state.auth.user);

  const handleSignOut = useCallback(() => {
    onClose?.();
    props.onAction();
    return <Navigate to="/auth/login" />;

    // eslint-disable-next-line
  }, []);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {auth?.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            handleSignOut();
            localStorage.removeItem("smart-metrics-logbook");
          }}
        >
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
