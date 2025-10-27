"use client"

import { useState, useEffect } from "react"
import { useRoasts } from "../hooks/use-roasts"

export default function UserSetup({ onUserSet }) {
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [inviteCode, setInviteCode] = useState("")
  const { setCurrentUser, processInviteCode } = useRoasts()

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("invite")
    if (code) {
      setInviteCode(code)
    }
  }, [])

  const handleSetUser = () => {
    if (!username.trim()) {
      setError("Please enter a username")
      return
    }
    if (username.length < 2) {
      setError("Username must be at least 2 characters")
      return
    }
    setCurrentUser(username)

    if (inviteCode) {
      processInviteCode(inviteCode, username)
    }

    onUserSet(username)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome to Roast Arena</h2>
        <p style={styles.subtitle}>Enter your username to get started</p>

        {inviteCode && (
          <div style={styles.inviteNotice}>
            <p style={styles.inviteText}>🎉 You've been invited! Your friend will be added automatically.</p>
          </div>
        )}

        <input
          type="text"
          placeholder="Your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError("")
          }}
          onKeyPress={(e) => e.key === "Enter" && handleSetUser()}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button onClick={handleSetUser} style={styles.button}>
          Enter Arena
        </button>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)",
    padding: "1rem",
  },
  card: {
    background: "rgba(26, 26, 46, 0.8)",
    border: "2px solid rgba(255, 23, 68, 0.3)",
    borderRadius: "12px",
    padding: "3rem 2rem",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
    backdropFilter: "blur(10px)",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "900",
    background: "linear-gradient(135deg, #ff1744 0%, #00bcd4 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#b0b0b0",
    marginBottom: "2rem",
    fontSize: "1rem",
  },
  inviteNotice: {
    padding: "12px 16px",
    backgroundColor: "rgba(0, 188, 212, 0.1)",
    border: "1px solid rgba(0, 188, 212, 0.3)",
    borderRadius: "8px",
    marginBottom: "1.5rem",
  },
  inviteText: {
    color: "#00bcd4",
    fontSize: "0.9rem",
    margin: 0,
    fontWeight: "600",
  },
  input: {
    width: "100%",
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    background: "rgba(255, 255, 255, 0.05)",
    border: "2px solid rgba(255, 23, 68, 0.3)",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.3s ease",
    boxSizing: "border-box",
  },
  error: {
    color: "#ff1744",
    fontSize: "0.85rem",
    marginBottom: "1rem",
  },
  button: {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "linear-gradient(135deg, #ff1744 0%, #d32f2f 100%)",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
}
