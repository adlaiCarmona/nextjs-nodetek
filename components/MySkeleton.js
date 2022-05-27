import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export function TextAndBox() {
    return (
        <Stack spacing={1}>
            <Typography variant="h1">
                {<Skeleton variant="text" animation="wave" width={800} />}
            </Typography>
            <Skeleton
                variant="rectangular"
                animation="wave"
                width={800}
                height={500}
            />
        </Stack>
    );
}

export function UserSkeleton() {
    return (
        <Stack direction="row" spacing={1}>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
    );
}

export function ExampleSkeleton() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rectangular" width={210} height={118} />
        </Stack>
    );
}
