import PropTypes from "prop-types";

import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
} from "@mui/material";

export const ToDoCard = (props) => {
  const { sx, metric, setOpenModal, setOpenBlood, setSelectedMetric } = props;

  return (
    <Tooltip
      title={
        metric?.description
          ? metric?.description
          : "There is no any description."
      }
    >
      <Card
        sx={sx}
        style={{ outline: "solid 1px #e2e2e2", cursor: "pointer" }}
        onClick={(e) => {
          metric.fieldType === "bloodPressure"
            ? setOpenBlood(true)
            : setOpenModal(true);

          setSelectedMetric(metric);
        }}
      >
        <CardContent>
          <Stack
            alignItems="center"
            direction="row"
            justifyContent="space-between"
            spacing={3}
          >
            <Avatar
              sx={{
                backgroundColor: "error.main",
                height: 56,
                width: 56,
              }}
            >
              <SvgIcon>
                <ClockIcon />
              </SvgIcon>
            </Avatar>
            <Stack spacing={1} alignItems={"center"}>
              <Typography
                color="text.primary"
                variant="h3"
                sx={{ textAlign: "right", alignItems: "center" }}
              >
                {metric.name}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

ToDoCard.prototypes = {
  sx: PropTypes.object,
  value: PropTypes.string.isRequired,
};
