"use client"

import { useState, useEffect } from "react"
import { useRoasts } from "../hooks/use-roasts"

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])
  const { getLeaderboard } = useRoasts()

  useEffect(() => {
    const updateLeaderboard = () => {
      const data = getLeaderboard()
      const sorted = Object.entries(data)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
      setLeaderboard(sorted)
    }

    updateLeaderboard()

    const handleRoastUpdated = () => {
      updateLeaderboard()
    }

    window.addEventListener("roastUpdated", handleRoastUpdated)
    return () => window.removeEventListener("roastUpdated", handleRoastUpdated)
  }, [getLeaderboard])

  const getMedal = (index) => {
    const medals = ["🥇", "🥈", "🥉"]
    return medals[index] || "🔥"
  }

  const getRankColor = (index) => {
    const colors = ["#ffd600", "#c0c0c0", "#cd7f32"]
    return colors[index] || "#00bcd4"
  }

  const clearLeaderboard = () => {
    if (window.confirm("Are you sure? This will clear all roast records!")) {
      localStorage.removeItem("roast_leaderboard")
      setLeaderboard([])
    }
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>🏆 Roast Rankings</h2>
        <p style={styles.cardSubtitle}>Who's getting roasted the most?</p>
      </div>
      <div style={styles.cardContent}>
        {leaderboard.length > 0 ? (
          <div style={styles.leaderboardContainer}>
            <div style={styles.leaderboardList}>
              {leaderboard.map((entry, index) => (
                <div key={index} style={{ ...styles.leaderboardItem, borderLeftColor: getRankColor(index) }}>
                  <div style={styles.leaderboardLeft}>
                    <span style={styles.medal}>{getMedal(index)}</span>
                    <div style={styles.rankInfo}>
                      <p style={styles.rank}>#{index + 1}</p>
                      <p style={styles.name}>{entry.name}</p>
                    </div>
                  </div>
                  <div style={styles.leaderboardRight}>
                    <p style={{ ...styles.count, color: getRankColor(index) }}>{entry.count}</p>
                    <p style={styles.countLabel}>roasts</p>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={clearLeaderboard} style={styles.clearButton}>
              🗑 Clear Leaderboard
            </button>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>📊</p>
            <p style={styles.emptyText}>No roasts yet! Start generating to see rankings.</p>
          </div>
        )}
      </div>
    </div>
  )
}

const styles = {
  card: {
    width: "100%",
    border: "1px solid rgba(255, 23, 68, 0.3)",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "rgba(26, 26, 46, 0.8)",
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(255, 23, 68, 0.1)",
  },
  cardHeader: {
    padding: "24px",
    borderBottom: "1px solid rgba(255, 23, 68, 0.2)",
    background: "linear-gradient(135deg, rgba(255, 23, 68, 0.1) 0%, rgba(0, 188, 212, 0.05) 100%)",
  },
  cardTitle: {
    fontSize: "24px",
    fontWeight: "700",
    margin: 0,
    color: "#ffd600",
    letterSpacing: "1px",
  },
  cardSubtitle: {
    fontSize: "14px",
    color: "#b0b0b0",
    margin: "8px 0 0 0",
  },
  cardContent: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  leaderboardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  leaderboardList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  leaderboardItem: {
    padding: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(255, 23, 68, 0.2)",
    borderLeft: "4px solid #00bcd4",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  leaderboardLeft: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    flex: 1,
  },
  medal: {
    fontSize: "28px",
  },
  rankInfo: {
    display: "flex",
    flexDirection: "column",
  },
  rank: {
    fontSize: "12px",
    fontWeight: "700",
    margin: 0,
    color: "#b0b0b0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  name: {
    fontSize: "16px",
    fontWeight: "700",
    margin: "4px 0 0 0",
    color: "#fff",
  },
  leaderboardRight: {
    textAlign: "right",
  },
  count: {
    fontSize: "28px",
    fontWeight: "700",
    margin: 0,
  },
  countLabel: {
    fontSize: "12px",
    color: "#b0b0b0",
    margin: "4px 0 0 0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  clearButton: {
    padding: "12px 24px",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "#ef4444",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    width: "100%",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  emptyState: {
    textAlign: "center",
    padding: "48px 16px",
  },
  emptyIcon: {
    fontSize: "48px",
    margin: "0 0 16px 0",
  },
  emptyText: {
    fontSize: "16px",
    color: "#b0b0b0",
    margin: 0,
  },
}
