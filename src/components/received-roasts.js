"use client"

import { useState, useEffect } from "react"
import { useRoasts } from "../hooks/use-roasts"

export default function ReceivedRoasts() {
  const [roasts, setRoasts] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(null)
  const { getReceivedRoasts, markRoastAsRead } = useRoasts()

  useEffect(() => {
    const updateRoasts = () => {
      setRoasts(getReceivedRoasts())
    }
    updateRoasts()

    const handleMessageReceived = () => {
      updateRoasts()
    }

    window.addEventListener("messageReceived", handleMessageReceived)
    window.addEventListener("messageRead", handleMessageReceived)
    return () => {
      window.removeEventListener("messageReceived", handleMessageReceived)
      window.removeEventListener("messageRead", handleMessageReceived)
    }
  }, [getReceivedRoasts])

  const handlePlayRoast = (roast) => {
    if (isSpeaking === roast.id) {
      window.speechSynthesis.cancel()
      setIsSpeaking(null)
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(roast.text)
    utterance.rate = 1
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onend = () => {
      setIsSpeaking(null)
      markRoastAsRead(roast.id)
    }
    utterance.onerror = () => setIsSpeaking(null)

    setIsSpeaking(roast.id)
    window.speechSynthesis.speak(utterance)
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date

    if (diff < 60000) return "just now"
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>📬 Received Roasts</h2>
        <p style={styles.cardSubtitle}>Roasts sent to you by your friends</p>
      </div>
      <div style={styles.cardContent}>
        {roasts.length > 0 ? (
          <div style={styles.roastsList}>
            {roasts.map((roast) => (
              <div key={roast.id} style={{ ...styles.roastItem, opacity: roast.read ? 0.7 : 1 }}>
                <div style={styles.roastHeader}>
                  <div style={styles.roastMeta}>
                    <span style={styles.fromBadge}>From: {roast.from}</span>
                    <span style={styles.timeBadge}>{formatTime(roast.timestamp)}</span>
                  </div>
                  {!roast.read && <span style={styles.unreadBadge}>NEW</span>}
                </div>
                <p style={styles.roastText}>"{roast.text}"</p>
                <button onClick={() => handlePlayRoast(roast)} style={styles.playButton}>
                  {isSpeaking === roast.id ? "⏹ Stop" : "🔊 Play"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>📭</p>
            <p style={styles.emptyText}>No roasts yet. Ask your friends to send you some!</p>
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
    gap: "16px",
  },
  roastsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "600px",
    overflowY: "auto",
  },
  roastItem: {
    padding: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(0, 188, 212, 0.2)",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
  roastHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  roastMeta: {
    display: "flex",
    gap: "12px",
    alignItems: "center",
  },
  fromBadge: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#ff1744",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  timeBadge: {
    fontSize: "12px",
    color: "#b0b0b0",
  },
  unreadBadge: {
    display: "inline-block",
    padding: "4px 12px",
    backgroundColor: "#ff1744",
    color: "white",
    fontSize: "11px",
    fontWeight: "700",
    borderRadius: "4px",
    letterSpacing: "1px",
  },
  roastText: {
    fontSize: "16px",
    fontWeight: "600",
    lineHeight: "1.6",
    margin: "0 0 12px 0",
    color: "#fff",
  },
  playButton: {
    padding: "8px 16px",
    backgroundColor: "rgba(0, 188, 212, 0.15)",
    color: "#00bcd4",
    border: "1px solid rgba(0, 188, 212, 0.4)",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "all 0.3s ease",
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
