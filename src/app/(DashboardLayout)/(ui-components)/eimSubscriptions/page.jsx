import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import Image from "next/image";
import Tick from "../../../../../public/Img/tick.svg";
import ManagementGrid from "@/app/(components)/mui-components/Card";

const cardData = [
  {
    title: "Basic Plan",
    description:
      "The basic plan offers essential features. With the basic plan, users can access standard navigation.",
    features: ["Fleet Management", "CS/SS Management"],
  },
  {
    title: "Standard Plan",
    description:
      "The standard plan includes all basic features and additional functionalities for better management.",
    features: [
      "Fleet Management",
      "CS/SS Management",
      "CS/SS Efficiency",
      "Battery Analysis",
      "Fleet Management",
    ],
    chip: "Best Seller",
  },
  {
    title: "Premium Plan",
    description:
      "The premium plan provides comprehensive features and top-tier support for enterprise needs.",
    features: [
      "Fleet Management",
      "CS/SS Management",
      "CS/SS Efficiency",
      "Battery Analysis",
      "Tariff Management",
      "Customer Management",
      "User Management",
    ],
  },
];
const breadcrumbItems = [
  { label: "Dashboard", link: "/" },
  { label: "EIM-Subscription", link: "/eimSubscriptions" },
];
function MyCards() {
  return (
    <Grid container rowGap={2}>
      <ManagementGrid
        moduleName={"EIM Subscriptions"}
        breadcrumbItems={breadcrumbItems}
      />
      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item key={index} xs={12} sm={8} md={4} lg={4}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#6099EB",
                borderRadius: "12px",
                mb: 8,
                p: 2,
              }}
            >
              <CardContent>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="h3"
                  >
                    {card.title}
                  </Typography>
                  {card?.chip && (
                    <Chip
                      sx={{
                        minWidth: 100,
                        color: "#C0FE72",
                      }}
                      color="primary"
                      label={card?.chip}
                    />
                  )}
                </Grid>
                <Grid container spacing={1} mt={2}>
                  <Grid item xs={12}>
                    <Typography >
                      {card.description}
                    </Typography>
                  </Grid>
                  <Grid container mt={2}>
                    {card.features.map((feature, featureIndex) => (
                      <Grid item xs={12} key={featureIndex} mt={2}>
                        <Grid container alignItems="center">
                          <Avatar
                            sx={{
                              mr: 2,
                              backgroundColor: "#171963",
                              height: 30,
                              width: 30,
                            }}
                          >
                            <Image src={Tick} alt="tick" />
                          </Avatar>
                          <Typography variant="body1">
                            {feature}
                          </Typography>
                        </Grid>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default MyCards;
