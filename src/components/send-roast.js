"use client"

import { useState, useEffect } from "react"
import { useRoasts } from "../hooks/use-roasts"

export default function SendRoast() {
  const [friends, setFriends] = useState([])
  const [selectedFriend, setSelectedFriend] = useState("")
  const [roastText, setRoastText] = useState("")
  const [sent, setSent] = useState(false)
  const { getFriends, sendRoast, getCustomRoasts } = useRoasts()

  const DEFAULT_ROASTS = [
    "Hey {name}, NASA called — they found your missing brain cell.",
    "{name}, you bring everyone so much joy... when you leave the room.",
    "I would roast {name}, but I don't want to get ashes all over my keyboard.",
    "{name}, you're the reason they put instructions on shampoo bottles.",
    "If {name} was a vegetable, they'd be a turnip... because nobody wants them.",
  ]

  useEffect(() => {
    const updateFriends = () => {
      setFriends(getFriends())
    }
    updateFriends()
    window.addEventListener("friendsUpdated", updateFriends)
    return () => window.removeEventListener("friendsUpdated", updateFriends)
  }, [getFriends])

  const handleSendRoast = () => {
    if (!selectedFriend) {
      alert("Select a friend first!")
      return
    }
    if (!roastText.trim()) {
      alert("Enter a roast!")
      return
    }

    sendRoast(selectedFriend, roastText)
    setSent(true)
    setRoastText("")
    setTimeout(() => setSent(false), 3000)
  }

  const insertRandomRoast = () => {
    if (!selectedFriend) {
      alert("Select a friend first!")
      return
    }
    const allRoasts = [...DEFAULT_ROASTS, ...getCustomRoasts()]
    const randomRoast = allRoasts[Math.floor(Math.random() * allRoasts.length)]
    const personalized = randomRoast.replace(/{name}/g, selectedFriend)
    setRoastText(personalized)
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>📤 Send Roast</h2>
        <p style={styles.cardSubtitle}>Send a roast directly to your friend</p>
      </div>
      <div style={styles.cardContent}>
        <div style={styles.selectGroup}>
          <label style={styles.label}>Select Friend:</label>
          <select value={selectedFriend} onChange={(e) => setSelectedFriend(e.target.value)} style={styles.select}>
            <option value="">Choose a friend...</option>
            {friends.map((friend) => (
              <option key={friend.id} value={friend.name}>
                {friend.name}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.textGroup}>
          <label style={styles.label}>Your Roast:</label>
          <textarea
            placeholder="Type your roast here..."
            value={roastText}
            onChange={(e) => setRoastText(e.target.value)}
            style={styles.textarea}
            rows="4"
          />
        </div>

        <div style={styles.buttonGroup}>
          <button onClick={insertRandomRoast} style={styles.buttonSecondary}>
            🎲 Random Roast
          </button>
          <button onClick={handleSendRoast} style={styles.button}>
            Send Roast
          </button>
        </div>

        {sent && <p style={styles.successMessage}>✓ Roast sent! Your friend will see it soon.</p>}

        {friends.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>📭</p>
            <p style={styles.emptyText}>Add friends first to send roasts!</p>
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
    gap: "16px",
  },
  selectGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#ffd600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  select: {
    padding: "12px 16px",
    border: "1px solid rgba(255, 23, 68, 0.3)",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    cursor: "pointer",
  },
  textGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
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
  },
  buttonGroup: {
    display: "flex",
    gap: "12px",
  },
  button: {
    flex: 1,
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
  },
  buttonSecondary: {
    flex: 1,
    padding: "12px 24px",
    backgroundColor: "rgba(255, 215, 0, 0.15)",
    color: "#ffd600",
    border: "1px solid rgba(255, 215, 0, 0.4)",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  successMessage: {
    padding: "12px 16px",
    backgroundColor: "rgba(76, 175, 80, 0.2)",
    color: "#4caf50",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    margin: 0,
  },
  emptyState: {
    textAlign: "center",
    padding: "32px 16px",
  },
  emptyIcon: {
    fontSize: "40px",
    margin: "0 0 12px 0",
  },
  emptyText: {
    fontSize: "14px",
    color: "#b0b0b0",
    margin: 0,
  },
}
