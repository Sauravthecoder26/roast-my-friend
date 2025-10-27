"use client"

import { useState, useEffect } from "react"
import RoastGenerator from "./components/roast-generator"
import CustomRoasts from "./components/custom-roasts"
import Leaderboard from "./components/leaderboard"
import UserSetup from "./components/user-setup"
import FriendsList from "./components/friends-list"
import SendRoast from "./components/send-roast"
import ReceivedRoasts from "./components/received-roasts"
import InviteShare from "./components/invite-share"
import { useRoasts } from "./hooks/use-roasts"
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("roast")
  const [mounted, setMounted] = useState(false)
  const [currentUser, setCurrentUserState] = useState(null)
  const { getCurrentUser, getUnreadCount } = useRoasts()

  useEffect(() => {
    setMounted(true)
    const user = getCurrentUser()
    setCurrentUserState(user)

    const handleUserUpdated = () => {
      setCurrentUserState(getCurrentUser())
    }

    window.addEventListener("userUpdated", handleUserUpdated)
    return () => window.removeEventListener("userUpdated", handleUserUpdated)
  }, [getCurrentUser])

  if (!mounted) return null

  if (!currentUser) {
    return <UserSetup onUserSet={(username) => setCurrentUserState(username)} />
  }

  const unreadCount = getUnreadCount()

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>🔥 ROAST ARENA</h1>
          <p style={styles.userBadge}>Player: {currentUser.username}</p>
        </div>
      </header>

      <nav style={styles.nav}>
        <button
          onClick={() => setActiveTab("roast")}
          style={{
            ...styles.navButton,
            ...(activeTab === "roast" ? styles.navButtonActive : {}),
          }}
        >
          🎯 Generate
        </button>
        <button
          onClick={() => setActiveTab("send")}
          style={{
            ...styles.navButton,
            ...(activeTab === "send" ? styles.navButtonActive : {}),
          }}
        >
          📤 Send
        </button>
        <button
          onClick={() => setActiveTab("received")}
          style={{
            ...styles.navButton,
            ...(activeTab === "received" ? styles.navButtonActive : {}),
            position: "relative",
          }}
        >
          📬 Received
          {unreadCount > 0 && <span style={styles.badge}>{unreadCount}</span>}
        </button>
        <button
          onClick={() => setActiveTab("friends")}
          style={{
            ...styles.navButton,
            ...(activeTab === "friends" ? styles.navButtonActive : {}),
          }}
        >
          👥 Friends
        </button>
        <button
          onClick={() => setActiveTab("invite")}
          style={{
            ...styles.navButton,
            ...(activeTab === "invite" ? styles.navButtonActive : {}),
          }}
        >
          📱 Invite
        </button>
        <button
          onClick={() => setActiveTab("custom")}
          style={{
            ...styles.navButton,
            ...(activeTab === "custom" ? styles.navButtonActive : {}),
          }}
        >
          ✏️ Custom
        </button>
        <button
          onClick={() => setActiveTab("leaderboard")}
          style={{
            ...styles.navButton,
            ...(activeTab === "leaderboard" ? styles.navButtonActive : {}),
          }}
        >
          🏆 Leaderboard
        </button>
      </nav>

      <main style={styles.main}>
        {activeTab === "roast" && <RoastGenerator />}
        {activeTab === "send" && <SendRoast />}
        {activeTab === "received" && <ReceivedRoasts />}
        {activeTab === "friends" && <FriendsList />}
        {activeTab === "invite" && <InviteShare />}
        {activeTab === "custom" && <CustomRoasts />}
        {activeTab === "leaderboard" && <Leaderboard />}
      </main>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    background: "linear-gradient(135deg, rgba(255, 23, 68, 0.15) 0%, rgba(0, 188, 212, 0.1) 100%)",
    borderBottom: "2px solid rgba(255, 23, 68, 0.3)",
    padding: "2rem 1rem",
    textAlign: "center",
  },
  headerContent: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "900",
    margin: 0,
    letterSpacing: "2px",
    background: "linear-gradient(135deg, #ff1744 0%, #00bcd4 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  userBadge: {
    fontSize: "0.9rem",
    color: "#ffd600",
    margin: "0.5rem 0 0 0",
    fontWeight: "600",
  },
  nav: {
    display: "flex",
    gap: "0.5rem",
    padding: "1rem",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  navButton: {
    padding: "0.75rem 1.5rem",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 23, 68, 0.2)",
    color: "#b0b0b0",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  navButtonActive: {
    background: "linear-gradient(135deg, rgba(255, 23, 68, 0.3) 0%, rgba(0, 188, 212, 0.2) 100%)",
    border: "1px solid rgba(255, 23, 68, 0.5)",
    color: "#fff",
    boxShadow: "0 0 20px rgba(255, 23, 68, 0.2)",
  },
  badge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    background: "#ff1744",
    color: "white",
    borderRadius: "50%",
    width: "24px",
    height: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "700",
  },
  main: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
  },
}

export default App
