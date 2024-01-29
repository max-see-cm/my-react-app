import { Card, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import EwaMedLogo from "../../assets/ewark-logo.svg";
import SuccessApproveHumanIcon from "../../assets/success-approve-human.svg";

interface SuccessApproveProps {
  referenceNo: string | undefined;
  actionType: string;
}

export default function SuccessApproveCard(props: SuccessApproveProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Card
        sx={{
          width: "35rem", // Approximately 600px in rem (assuming 1rem = 16px)
          // height: '48.625rem', // Approximately 778px in rem (assuming 1rem = 16px)
          borderRadius: "1.5rem", // Approximately 24px in rem (assuming 1rem = 16px)
          backgroundColor: "white",
          padding: { xs: "2rem", sm: "4rem" },
        }}
      >
        <Stack>
          <img
            src={EwaMedLogo}
            style={{
              transform: "scale(0.7)",
            }}
          />
          <img
            src={SuccessApproveHumanIcon}
            style={{
              transform: "scale(0.8)",
            }}
          />
          <Typography variant="h5" align="center">
            You have successfully approved the {props.actionType}!
          </Typography>
          <Typography variant="labelText2" align="center" sx={{ mt: 4 }}>
            Reference No.
          </Typography>
          <Typography
            variant="subtitle2"
            align="center"
            sx={{ color: "#252A2D", fontSize: "1.125rem", mt: 1 }}
          >
            {props.referenceNo ? props.referenceNo : "-"}
          </Typography>
        </Stack>
      </Card>
    </motion.div>
  );
}
