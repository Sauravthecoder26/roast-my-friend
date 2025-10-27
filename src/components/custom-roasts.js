"use client"

import { useState, useEffect, useCallback } from "react"
import { useRoasts } from "../hooks/use-roasts"

export default function CustomRoasts() {
  const [newRoast, setNewRoast] = useState("")
  const [customRoasts, setCustomRoasts] = useState([])
  const { addCustomRoast, removeCustomRoast, getCustomRoasts } = useRoasts()

  const fetchCustomRoasts = useCallback(() => {
    setCustomRoasts(getCustomRoasts())
  }, [getCustomRoasts])

  useEffect(() => {
    fetchCustomRoasts()
  }, [fetchCustomRoasts])

  const handleAddRoast = () => {
    if (!newRoast.trim()) {
      alert("Enter a roast!")
      return
    }

    if (!newRoast.includes("{name}")) {
      alert("Include {name} placeholder in your roast!")
      return
    }

    addCustomRoast(newRoast)
    setCustomRoasts(getCustomRoasts())
    setNewRoast("")
  }

  const handleRemoveRoast = (index) => {
    removeCustomRoast(index)
    setCustomRoasts(getCustomRoasts())
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>✨ Create Custom Roasts</h2>
        <p style={styles.cardSubtitle}>Add your own personalized roasts to the arsenal</p>
      </div>
      <div style={styles.cardContent}>
        <div style={styles.inputSection}>
          <textarea
            placeholder="Enter your roast... (include {name} placeholder)"
            value={newRoast}
            onChange={(e) => setNewRoast(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && e.ctrlKey && handleAddRoast()}
            style={styles.textarea}
            rows="3"
          />
          <button onClick={handleAddRoast} style={styles.button}>
            Add Custom Roast
          </button>
        </div>

        {customRoasts.length > 0 ? (
          <div style={styles.roastsList}>
            <h3 style={styles.subtitle}>Your Arsenal ({customRoasts.length})</h3>
            <div style={styles.roastsContainer}>
              {customRoasts.map((roast, index) => (
                <div key={index} style={styles.roastItem}>
                  <div style={styles.roastItemContent}>
                    <span style={styles.roastNumber}>#{index + 1}</span>
                    <p style={styles.roastItemText}>{roast}</p>
                  </div>
                  <button onClick={() => handleRemoveRoast(index)} style={styles.deleteButton}>
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🎯</p>
            <p style={styles.emptyText}>No custom roasts yet. Create your first one!</p>
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
    color: "#00bcd4",
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
  inputSection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  textarea: {
    padding: "12px 16px",
    border: "1px solid rgba(255, 23, 68, 0.3)",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    resize: "vertical",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#00bcd4",
    color: "#0f0f1e",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(0, 188, 212, 0.3)",
  },
  roastsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  subtitle: {
    fontSize: "16px",
    fontWeight: "700",
    margin: 0,
    color: "#ffd600",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  roastsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "500px",
    overflowY: "auto",
  },
  roastItem: {
    padding: "16px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(0, 188, 212, 0.2)",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "12px",
    transition: "all 0.3s ease",
  },
  roastItemContent: {
    display: "flex",
    gap: "12px",
    flex: 1,
  },
  roastNumber: {
    fontSize: "12px",
    fontWeight: "700",
    color: "#ffd600",
    minWidth: "30px",
  },
  roastItemText: {
    fontSize: "14px",
    margin: 0,
    flex: 1,
    color: "#fff",
    lineHeight: "1.5",
  },
  deleteButton: {
    padding: "6px 12px",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "#ef4444",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "700",
    transition: "all 0.3s ease",
    minWidth: "40px",
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
