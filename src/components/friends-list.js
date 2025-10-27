"use client"

import { useState, useEffect } from "react"
import { useRoasts } from "../hooks/use-roasts"

export default function FriendsList() {
  const [friends, setFriends] = useState([])
  const [newFriend, setNewFriend] = useState("")
  const [error, setError] = useState("")
  const { getFriends, addFriend, removeFriend } = useRoasts()

  useEffect(() => {
    const updateFriends = () => {
      setFriends(getFriends())
    }
    updateFriends()
    window.addEventListener("friendsUpdated", updateFriends)
    return () => window.removeEventListener("friendsUpdated", updateFriends)
  }, [getFriends])

  const handleAddFriend = () => {
    if (!newFriend.trim()) {
      setError("Enter a friend's name")
      return
    }
    if (friends.find((f) => f.name.toLowerCase() === newFriend.toLowerCase())) {
      setError("Friend already added")
      return
    }
    addFriend(newFriend)
    setNewFriend("")
    setError("")
  }

  return (
    <div style={styles.card}>
      <div style={styles.cardHeader}>
        <h2 style={styles.cardTitle}>👥 Friends List</h2>
        <p style={styles.cardSubtitle}>Add friends to send them roasts</p>
      </div>
      <div style={styles.cardContent}>
        <div style={styles.inputGroup}>
          <input
            placeholder="Friend's username..."
            value={newFriend}
            onChange={(e) => {
              setNewFriend(e.target.value)
              setError("")
            }}
            onKeyPress={(e) => e.key === "Enter" && handleAddFriend()}
            style={styles.input}
          />
          <button onClick={handleAddFriend} style={styles.button}>
            Add
          </button>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        {friends.length > 0 ? (
          <div style={styles.friendsList}>
            {friends.map((friend) => (
              <div key={friend.id} style={styles.friendItem}>
                <div style={styles.friendInfo}>
                  <span style={styles.friendIcon}>👤</span>
                  <span style={styles.friendName}>{friend.name}</span>
                </div>
                <button onClick={() => removeFriend(friend.name)} style={styles.removeButton} title="Remove friend">
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <p style={styles.emptyIcon}>🤷</p>
            <p style={styles.emptyText}>No friends added yet. Add your first friend!</p>
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
    color: "#ff1744",
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
  inputGroup: {
    display: "flex",
    gap: "12px",
  },
  input: {
    flex: 1,
    padding: "12px 16px",
    border: "1px solid rgba(255, 23, 68, 0.3)",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    transition: "all 0.3s ease",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#ff1744",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    transition: "all 0.3s ease",
  },
  error: {
    color: "#ff1744",
    fontSize: "0.85rem",
  },
  friendsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    maxHeight: "400px",
    overflowY: "auto",
  },
  friendItem: {
    padding: "12px 16px",
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    border: "1px solid rgba(0, 188, 212, 0.2)",
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  friendInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  friendIcon: {
    fontSize: "18px",
  },
  friendName: {
    color: "#fff",
    fontWeight: "600",
  },
  removeButton: {
    padding: "6px 12px",
    backgroundColor: "rgba(239, 68, 68, 0.2)",
    color: "#ef4444",
    border: "1px solid rgba(239, 68, 68, 0.4)",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "700",
    transition: "all 0.3s ease",
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
