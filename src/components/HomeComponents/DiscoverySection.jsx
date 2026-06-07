import React from "react";
import { Card, CardBody, Button, Chip } from "@heroui/react";
import {
  Briefcase,
  Geo,
  CircleDollar,
  ArrowRight,
  Sparkles,
} from "@gravity-ui/icons";

const jobs = Array.from({ length: 6 }).map(() => ({
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  location: "New York, USA",
  type: "Hybrid",
  salary: "$25-40$/hour",
}));

const styles = {
  section: {
    backgroundColor: "#0a0a0a",
    padding: "80px 24px",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
  },
  container: { maxWidth: 1200, margin: "0 auto" },
  header: { textAlign: "center", marginBottom: 56 },
  eyebrow: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 12,
    letterSpacing: 4,
    color: "#a78bfa",
    textTransform: "uppercase",
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: 600,
    lineHeight: 1.15,
    margin: 0,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: 20,
  },
  card: {
    backgroundColor: "#141414",
    border: "1px solid #1f1f1f",
    borderRadius: 16,
    padding: 8,
  },
  cardTitle: { fontSize: 20, fontWeight: 600, marginBottom: 8 },
  cardDesc: { fontSize: 13, color: "#8a8a8a", marginBottom: 20, lineHeight: 1.5 },
  metaRow: { display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 },
  meta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    fontSize: 12,
    color: "#c4c4c4",
    backgroundColor: "#1c1c1c",
    padding: "6px 10px",
    borderRadius: 8,
  },
  footer: { textAlign: "center", marginTop: 48 },
};

export default function DiscoverySection() {
  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div style={styles.eyebrow} className="mt-30">
            <Sparkles width={14} height={14}/>
            Smart Job Discovery
            <Sparkles width={14} height={14} />
          </div>
          <h2 style={styles.title}>
          {"  The roles you'd never"}
            <br />
            find by searching
          </h2>
        </div>

        <div style={styles.grid}>
          {jobs.map((job, i) => (
            <Card key={i} style={styles.card} shadow="none">
              <div className="p-3">
                <h3 style={styles.cardTitle}>{job.title}</h3>
                <p style={styles.cardDesc}>{job.description}</p>

                <div style={styles.metaRow}>
                  <span style={styles.meta}>
                    <Geo width={14} height={14} color="#a78bfa" />
                    {job.location}
                  </span>
                  <span style={styles.meta}>
                    <Briefcase width={14} height={14} color="#a78bfa" />
                    {job.type}
                  </span>
                </div>

                <div style={{ ...styles.metaRow, marginBottom: 20 }}>
                  <span style={styles.meta}>
                    <CircleDollar width={14} height={14} color="#a78bfa" />
                    {job.salary}
                  </span>
                </div>

                <Button
                  radius="lg"
                  style={{
                    backgroundColor: "#000",
                    color: "#fff",
                    border: "1px solid #2a2a2a",
                    width: "fit-content",
                  }}
                  endContent={<ArrowRight width={14} height={14} />}
                >
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div style={styles.footer}>
          <Button
            radius="full"
            style={{
              backgroundColor: "#fff",
              color: "#000",
              fontWeight: 500,
              padding: "0 28px",
            }}
          >
            View all job open
          </Button>
        </div>
      </div>
    </section>
  );
}