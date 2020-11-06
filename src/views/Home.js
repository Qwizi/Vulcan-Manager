import React from "react";
import Container from "../components/Container";
import ScreenshotCard from "../components/home/ScreenshotCard";
import WebsiteCard from "../components/home/WebsiteCard";
import ClientsCard from "../components/home/ClientsCard";

export default function Home() {
    return (
        <Container>
            <ScreenshotCard />
            <WebsiteCard />
            <ClientsCard />
        </Container>
    )
}